#!/usr/bin/env node

/**
 * Tokven MCP Server
 *
 * Generate complete design token systems from a hex color.
 * OKLCH-derived, WCAG-validated, multi-format.
 *
 * CRITICAL: Never use console.log() in this file or any file under mcp-server/.
 * stdout is the JSON-RPC transport — console.log() corrupts the protocol.
 * All debug logging must use console.error() only.
 *
 * NOTE: This file is bootstrapped by register.mjs which registers
 * the extensionless import resolver before any ../src/ imports load.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

import { generateTokenSystem } from "../src/utils/generateTokenSystem.js";
import { generateCSS, generateTailwindV4, generateTailwindV3, generateDTCG } from "../src/utils/exportGenerators.js";
import { initTokensFromTemplate } from "../src/utils/tokens.js";
import { generateTemplate, AVAILABLE_MOODS } from "../src/utils/templateGenerator.js";
import { fontWeights } from "../src/data/fontWeights.js";
import {
  useMode, modeOklch, modeRgb, modeLrgb, parseHex, wcagContrast,
} from "culori/fn";

// Register color spaces for contrast checking
useMode(modeOklch);
useMode(modeRgb);
useMode(modeLrgb);

// ——— Helpers ———

function normalizeHex(hex) {
  let h = hex.trim().replace(/^#/, "");
  // Expand 3-digit to 6-digit: fff → ffffff
  if (/^[0-9a-f]{3}$/i.test(h)) {
    h = h.split("").map(c => c + c).join("");
  }
  if (!/^[0-9a-f]{6}$/i.test(h)) return null;
  return "#" + h.toLowerCase();
}

function contrastRatio(hex1, hex2) {
  const ratio = wcagContrast(parseHex(hex1), parseHex(hex2));
  return Math.round(ratio * 100) / 100;
}

const MOOD_DESCRIPTIONS = {
  warm: "Earthy tones, serif typography, editorial feel",
  cool: "Blue-grey palette, clean sans-serif, professional",
  bold: "High contrast, saturated, hard shadows",
  dark: "Muted and precise, monospace-friendly, no shadows",
  soft: "Pastel colors, rounded shapes, gentle shadows",
  minimal: "Near-achromatic, elegant, restrained",
  brutalist: "Monochrome, raw, zero border radius",
  playful: "High chroma, bouncy shapes, colorful",
  vintage: "Desaturated warm tones, classic serif",
  luxury: "Gold and champagne tones, refined serif",
  nature: "Green and earth tones, organic rounded shapes",
  neon: "Dark backgrounds, maximum chroma, cyber aesthetic",
  corporate: "Professional blue palette, trustworthy sans-serif",
  retro: "Warm saturated colors, 70s/80s display fonts",
};

// ——— Format generators ———

const FORMAT_GENERATORS = {
  css: generateCSS,
  "tailwind-v4": generateTailwindV4,
  "tailwind-v3": generateTailwindV3,
  dtcg: generateDTCG,
};

function generateOutput(tokens, format) {
  const generator = FORMAT_GENERATORS[format] || generateCSS;
  return generator(tokens, { includeLight: !!tokens.light, includeDark: true });
}

// ——— Server setup ———

const __mcpFilename = fileURLToPath(import.meta.url);
const __mcpDirname = dirname(__mcpFilename);
const pkg = JSON.parse(readFileSync(resolve(__mcpDirname, "package.json"), "utf8"));

const server = new McpServer({
  name: "tokven-mcp",
  version: pkg.version,
});

// ——— Tool 1: generate_tokens ———

server.registerTool(
  "generate_tokens",
  {
    title: "Generate Design Tokens",
    description: "Generate a complete design token system from a brand hex color. Returns OKLCH-derived colors (light + dark mode), typography pairing, spacing scale, border radius, shadows, and WCAG contrast validation. Output in CSS, Tailwind v4, Tailwind v3, or DTCG JSON.",
    inputSchema: {
      hex: z.string().describe("Brand color as hex, e.g. #7b5fff or 7b5fff"),
      mood: z.string().optional().describe("Visual personality preset. One of: warm, cool, bold, dark, soft, minimal, brutalist, playful, vintage, luxury, nature, neon, corporate, retro. Defaults to cool."),
      heading_font: z.string().max(100).optional().describe("Override heading font family name"),
      body_font: z.string().max(100).optional().describe("Override body font family name"),
      format: z.enum(["css", "tailwind-v4", "tailwind-v3", "dtcg"]).optional().default("css").describe("Output format. Defaults to css."),
      colors: z.enum(["primary", "primary-secondary", "all"]).optional().default("all").describe("Scope of color output. 'primary' = primary only, 'primary-secondary' = primary + secondary, 'all' = full system (default)"),
      secondary_hex: z.string().optional().describe("Custom hex for secondary color. If omitted, secondary is auto-derived from primary. Accepts #rrggbb, #rgb, or without #."),
      tertiary_hex: z.string().optional().describe("Custom hex for tertiary color. If omitted, tertiary is auto-derived from primary. Accepts #rrggbb, #rgb, or without #."),
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
    },
  },
  async ({ hex, mood, heading_font, body_font, format, colors, secondary_hex, tertiary_hex }) => {
    const normalizedHex = normalizeHex(hex);
    if (!normalizedHex) {
      return { content: [{ type: "text", text: JSON.stringify({ error: "Invalid hex color. Expected #rgb or #rrggbb format." }) }] };
    }

    // Validate optional secondary/tertiary hex
    let normSecondary = null;
    let normTertiary = null;
    if (secondary_hex) {
      normSecondary = normalizeHex(secondary_hex);
      if (!normSecondary) {
        return { content: [{ type: "text", text: JSON.stringify({ error: "Invalid secondary_hex: expected #rrggbb or #rgb format." }) }] };
      }
    }
    if (tertiary_hex) {
      normTertiary = normalizeHex(tertiary_hex);
      if (!normTertiary) {
        return { content: [{ type: "text", text: JSON.stringify({ error: "Invalid tertiary_hex: expected #rrggbb or #rgb format." }) }] };
      }
    }

    const result = generateTokenSystem({
      hex: normalizedHex,
      mood: mood || "cool",
      headingFont: heading_font,
      bodyFont: body_font,
      secondaryHex: normSecondary,
      tertiaryHex: normTertiary,
      colors: colors || "all",
    });

    // Re-generate in requested format if not CSS
    let output = result.css;
    if (format && format !== "css") {
      const { template } = generateTemplate(mood || "cool", normalizedHex);
      const tokens = initTokensFromTemplate(template);
      if (heading_font) {
        tokens.typography.headingFont = heading_font;
        tokens.typography.headingWeight = fontWeights[heading_font]?.defaultHeading || 700;
      }
      if (body_font) {
        tokens.typography.bodyFont = body_font;
        tokens.typography.bodyWeight = fontWeights[body_font]?.defaultBody || 400;
      }
      // Apply same color overrides + scope for alt format
      if (normSecondary) { if (tokens.light) tokens.light.secondary = normSecondary; if (tokens.dark) tokens.dark.secondary = normSecondary; }
      if (normTertiary) { if (tokens.light) tokens.light.tertiary = normTertiary; if (tokens.dark) tokens.dark.tertiary = normTertiary; }
      if (colors === "primary") {
        if (tokens.light) { tokens.light.secondary = null; tokens.light.tertiary = null; }
        if (tokens.dark) { tokens.dark.secondary = null; tokens.dark.tertiary = null; }
      } else if (colors === "primary-secondary") {
        if (tokens.light) tokens.light.tertiary = null;
        if (tokens.dark) tokens.dark.tertiary = null;
      }
      output = generateOutput(tokens, format);
    }

    const response = {
      css: output,
      fonts: result.fonts,
      contrast: result.contrast.summary,
      mood: result.mood,
      format: format || "css",
    };

    return { content: [{ type: "text", text: JSON.stringify(response, null, 2) }] };
  }
);

// ——— Tool 2: get_token_preview ———

server.registerTool(
  "get_token_preview",
  {
    title: "Preview Design Tokens",
    description: "Quick preview of a design token system without full CSS output. Returns primary colors, font pairing, radius, shadow style, and WCAG contrast summary. Useful for comparing options before generating full output.",
    inputSchema: {
      hex: z.string().describe("Brand color hex"),
      mood: z.string().optional().describe("Mood preset"),
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
    },
  },
  async ({ hex, mood }) => {
    const normalizedHex = normalizeHex(hex);
    if (!normalizedHex) {
      return { content: [{ type: "text", text: JSON.stringify({ error: "Invalid hex color." }) }] };
    }

    const result = generateTokenSystem({ hex: normalizedHex, mood: mood || "cool" });

    const preview = {
      mood: result.mood,
      colors: {
        primary: result.tokens.light.primary,
        background: result.tokens.light.bg,
        surface: result.tokens.light["bg-surface"],
        text: result.tokens.light.text,
      },
      fonts: {
        heading: result.fonts.heading,
        body: result.fonts.body,
      },
      radius: result.tokens.shape.borderRadius + "px",
      shadow: result.tokens.shape.shadowStyle,
      contrast: result.contrast.summary,
    };

    return { content: [{ type: "text", text: JSON.stringify(preview, null, 2) }] };
  }
);

// ——— Tool 3: validate_contrast ———

server.registerTool(
  "validate_contrast",
  {
    title: "Validate WCAG Contrast",
    description: "Check WCAG 2.1 contrast ratio between two colors. Returns ratio and AA/AAA pass/fail for both normal and large text.",
    inputSchema: {
      foreground: z.string().describe("Foreground hex color"),
      background: z.string().describe("Background hex color"),
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
    },
  },
  async ({ foreground, background }) => {
    const fg = normalizeHex(foreground);
    const bg = normalizeHex(background);
    if (!fg || !bg) {
      return { content: [{ type: "text", text: JSON.stringify({ error: "Invalid hex color(s)." }) }] };
    }

    const ratio = contrastRatio(fg, bg);

    const response = {
      foreground: fg,
      background: bg,
      ratio,
      aa_normal: ratio >= 4.5,
      aa_large: ratio >= 3,
      aaa_normal: ratio >= 7,
      aaa_large: ratio >= 4.5,
    };

    return { content: [{ type: "text", text: JSON.stringify(response, null, 2) }] };
  }
);

// ——— Tool 4: list_moods ———

server.registerTool(
  "list_moods",
  {
    title: "List Available Moods",
    description: "Returns all available mood presets for the generate_tokens tool, with descriptions of the visual personality each produces.",
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
    },
  },
  async () => {
    const moods = AVAILABLE_MOODS.map(m => ({
      id: m,
      description: MOOD_DESCRIPTIONS[m] || "",
    }));

    return { content: [{ type: "text", text: JSON.stringify({ moods }, null, 2) }] };
  }
);

// ——— Start server ———

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("Tokven MCP server running on stdio");
