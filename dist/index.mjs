#!/usr/bin/env node

// mcp-server/index.js
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// src/utils/generateTokenSystem.js
import { fileURLToPath } from "url";

// src/utils/templateGenerator.js
import {
  useMode as useMode3,
  converter as converter3,
  formatHex as formatHex3,
  clampChroma as clampChroma3,
  displayable as displayable3,
  modeOklch as modeOklch3,
  modeRgb as modeRgb3,
  modeLrgb as modeLrgb3,
  parseHex as parseHex3,
  wcagContrast as wcagContrast2
} from "culori/fn";

// src/data/fontWeights.js
var fontWeights = {
  // ——— Heading fonts (serif & display) ———
  "Playfair Display": {
    available: [400, 500, 600, 700, 800, 900],
    load: [400, 500, 700, 900],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.15,
    lineHeightBody: 1.6,
    trackingHeading: "0em",
    trackingBody: "0em",
    stroke: "serif",
    xHeight: 0.73,
    strokeContrast: 0.85,
    width: 0.5,
    openness: 0.55
  },
  "Syne": {
    available: [400, 500, 600, 700, 800],
    load: [400, 600, 700, 800],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.2,
    lineHeightBody: 1.55,
    trackingHeading: "-0.03em",
    trackingBody: "0em",
    stroke: "sans",
    xHeight: 0.72,
    strokeContrast: 0.08,
    width: 0.58,
    openness: 0.55
  },
  "Cormorant Garamond": {
    available: [300, 400, 500, 600, 700],
    load: [300, 400, 600, 700],
    defaultHeading: 600,
    defaultBody: 400,
    lineHeightHeading: 1.1,
    lineHeightBody: 1.6,
    trackingHeading: "0.01em",
    trackingBody: "0.01em",
    stroke: "serif",
    xHeight: 0.64,
    strokeContrast: 0.8,
    width: 0.42,
    openness: 0.55
  },
  "DM Serif Display": {
    available: [400],
    load: [400],
    defaultHeading: 400,
    defaultBody: 400,
    lineHeightHeading: 1.05,
    lineHeightBody: 1.55,
    trackingHeading: "0em",
    trackingBody: "0em",
    stroke: "serif",
    xHeight: 0.7,
    strokeContrast: 0.72,
    width: 0.5,
    openness: 0.55
  },
  "Fraunces": {
    available: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    load: [300, 400, 600, 700, 900],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.1,
    lineHeightBody: 1.6,
    trackingHeading: "0em",
    trackingBody: "0em",
    stroke: "serif",
    xHeight: 0.68,
    strokeContrast: 0.8,
    width: 0.52,
    openness: 0.55
  },
  "Lora": {
    available: [400, 500, 600, 700],
    load: [400, 500, 600, 700],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.15,
    lineHeightBody: 1.55,
    trackingHeading: "0em",
    trackingBody: "0em",
    stroke: "serif",
    xHeight: 0.7,
    strokeContrast: 0.5,
    width: 0.48,
    openness: 0.65
  },
  "Merriweather": {
    available: [300, 400, 700, 900],
    load: [300, 400, 700, 900],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.2,
    lineHeightBody: 1.6,
    trackingHeading: "0em",
    trackingBody: "0.01em",
    stroke: "serif",
    xHeight: 0.75,
    strokeContrast: 0.4,
    width: 0.52,
    openness: 0.62
  },
  "Libre Baskerville": {
    available: [400, 700],
    load: [400, 700],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.15,
    lineHeightBody: 1.55,
    trackingHeading: "0em",
    trackingBody: "0em",
    stroke: "serif",
    xHeight: 0.7,
    strokeContrast: 0.55,
    width: 0.5,
    openness: 0.6
  },
  "Roboto Slab": {
    available: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    load: [300, 400, 500, 700],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.15,
    lineHeightBody: 1.55,
    trackingHeading: "0em",
    trackingBody: "0em",
    stroke: "slab",
    xHeight: 0.74,
    strokeContrast: 0.18,
    width: 0.5,
    openness: 0.68
  },
  // ——— Heading fonts (sans & display) ———
  "Montserrat": {
    available: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    load: [400, 500, 600, 700],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.15,
    lineHeightBody: 1.6,
    trackingHeading: "-0.01em",
    trackingBody: "0em",
    stroke: "sans",
    xHeight: 0.73,
    strokeContrast: 0.08,
    width: 0.5,
    openness: 0.72
  },
  "Poppins": {
    available: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    load: [400, 500, 600, 700],
    defaultHeading: 600,
    defaultBody: 400,
    lineHeightHeading: 1.2,
    lineHeightBody: 1.6,
    trackingHeading: "-0.01em",
    trackingBody: "0em",
    stroke: "sans",
    xHeight: 0.72,
    strokeContrast: 0.05,
    width: 0.5,
    openness: 0.75
  },
  "Raleway": {
    available: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    load: [300, 400, 600, 700],
    defaultHeading: 600,
    defaultBody: 400,
    lineHeightHeading: 1.15,
    lineHeightBody: 1.6,
    trackingHeading: "0.01em",
    trackingBody: "0.01em",
    stroke: "sans",
    xHeight: 0.68,
    strokeContrast: 0.12,
    width: 0.5,
    openness: 0.78
  },
  "Oswald": {
    available: [200, 300, 400, 500, 600, 700],
    load: [300, 400, 500, 700],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.1,
    lineHeightBody: 1.5,
    trackingHeading: "0em",
    trackingBody: "0.01em",
    stroke: "sans",
    xHeight: 0.72,
    strokeContrast: 0.05,
    width: 0.38,
    openness: 0.58
  },
  "Work Sans": {
    available: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    load: [400, 500, 600, 700],
    defaultHeading: 600,
    defaultBody: 400,
    lineHeightHeading: 1.15,
    lineHeightBody: 1.55,
    trackingHeading: "-0.01em",
    trackingBody: "0em",
    stroke: "sans",
    xHeight: 0.73,
    strokeContrast: 0.1,
    width: 0.5,
    openness: 0.7
  },
  "Josefin Sans": {
    available: [100, 200, 300, 400, 500, 600, 700],
    load: [300, 400, 600, 700],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.1,
    lineHeightBody: 1.55,
    trackingHeading: "0.02em",
    trackingBody: "0.01em",
    stroke: "sans",
    xHeight: 0.65,
    strokeContrast: 0.05,
    width: 0.48,
    openness: 0.8
  },
  "Space Grotesk": {
    available: [300, 400, 500, 600, 700],
    load: [300, 400, 500, 700],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.1,
    lineHeightBody: 1.55,
    trackingHeading: "-0.02em",
    trackingBody: "0em",
    stroke: "sans",
    xHeight: 0.73,
    strokeContrast: 0.08,
    width: 0.48,
    openness: 0.65
  },
  "Archivo": {
    available: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    load: [400, 500, 600, 700],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.1,
    lineHeightBody: 1.55,
    trackingHeading: "-0.01em",
    trackingBody: "0em",
    stroke: "sans",
    xHeight: 0.74,
    strokeContrast: 0.1,
    width: 0.5,
    openness: 0.68
  },
  // ——— Body fonts ———
  "DM Sans": {
    available: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    load: [300, 400, 500, 700],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.2,
    lineHeightBody: 1.5,
    trackingHeading: "-0.02em",
    trackingBody: "0em",
    stroke: "sans",
    xHeight: 0.73,
    strokeContrast: 0.1,
    width: 0.48,
    openness: 0.7
  },
  "Plus Jakarta Sans": {
    available: [200, 300, 400, 500, 600, 700, 800],
    load: [300, 400, 500, 700],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.2,
    lineHeightBody: 1.5,
    trackingHeading: "-0.02em",
    trackingBody: "0em",
    stroke: "sans",
    xHeight: 0.73,
    strokeContrast: 0.12,
    width: 0.5,
    openness: 0.72
  },
  "Nunito": {
    available: [200, 300, 400, 500, 600, 700, 800, 900],
    load: [300, 400, 600, 700],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.25,
    lineHeightBody: 1.55,
    trackingHeading: "-0.01em",
    trackingBody: "0em",
    stroke: "sans",
    xHeight: 0.71,
    strokeContrast: 0.05,
    width: 0.52,
    openness: 0.72
  },
  "Outfit": {
    available: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    load: [300, 400, 500, 700],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.2,
    lineHeightBody: 1.5,
    trackingHeading: "-0.02em",
    trackingBody: "0em",
    stroke: "sans",
    xHeight: 0.73,
    strokeContrast: 0.08,
    width: 0.52,
    openness: 0.62
  },
  "Inter": {
    available: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    load: [300, 400, 500, 700],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.2,
    lineHeightBody: 1.5,
    trackingHeading: "-0.02em",
    trackingBody: "0.01em",
    stroke: "sans",
    xHeight: 0.75,
    strokeContrast: 0.07,
    width: 0.5,
    openness: 0.8
  },
  "Roboto": {
    available: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    load: [300, 400, 500, 700],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.2,
    lineHeightBody: 1.5,
    trackingHeading: "-0.02em",
    trackingBody: "0em",
    stroke: "sans",
    xHeight: 0.74,
    strokeContrast: 0.1,
    width: 0.48,
    openness: 0.68
  },
  "Open Sans": {
    available: [300, 400, 500, 600, 700, 800],
    load: [300, 400, 500, 700],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.2,
    lineHeightBody: 1.5,
    trackingHeading: "-0.02em",
    trackingBody: "0em",
    stroke: "sans",
    xHeight: 0.74,
    strokeContrast: 0.12,
    width: 0.52,
    openness: 0.78
  },
  "Lato": {
    available: [100, 300, 400, 700, 900],
    load: [300, 400, 700],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.2,
    lineHeightBody: 1.5,
    trackingHeading: "-0.02em",
    trackingBody: "0em",
    stroke: "sans",
    xHeight: 0.72,
    strokeContrast: 0.15,
    width: 0.5,
    openness: 0.65
  },
  "Source Sans 3": {
    available: [200, 300, 400, 500, 600, 700, 800, 900],
    load: [300, 400, 500, 700],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.2,
    lineHeightBody: 1.5,
    trackingHeading: "-0.02em",
    trackingBody: "0em",
    stroke: "sans",
    xHeight: 0.74,
    strokeContrast: 0.15,
    width: 0.48,
    openness: 0.75
  },
  "Noto Sans": {
    available: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    load: [300, 400, 500, 700],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.2,
    lineHeightBody: 1.5,
    trackingHeading: "-0.02em",
    trackingBody: "0em",
    stroke: "sans",
    xHeight: 0.74,
    strokeContrast: 0.1,
    width: 0.5,
    openness: 0.72
  },
  "Manrope": {
    available: [200, 300, 400, 500, 600, 700, 800],
    load: [300, 400, 500, 700],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.2,
    lineHeightBody: 1.5,
    trackingHeading: "-0.02em",
    trackingBody: "0em",
    stroke: "sans",
    xHeight: 0.73,
    strokeContrast: 0.06,
    width: 0.5,
    openness: 0.65
  },
  "IBM Plex Sans": {
    available: [100, 200, 300, 400, 500, 600, 700],
    load: [300, 400, 500, 700],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.2,
    lineHeightBody: 1.5,
    trackingHeading: "-0.02em",
    trackingBody: "0em",
    stroke: "sans",
    xHeight: 0.72,
    strokeContrast: 0.12,
    width: 0.5,
    openness: 0.7
  },
  "Rubik": {
    available: [300, 400, 500, 600, 700, 800, 900],
    load: [300, 400, 500, 700],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.2,
    lineHeightBody: 1.5,
    trackingHeading: "-0.02em",
    trackingBody: "0em",
    stroke: "sans",
    xHeight: 0.74,
    strokeContrast: 0.05,
    width: 0.52,
    openness: 0.62
  },
  "Figtree": {
    available: [300, 400, 500, 600, 700, 800, 900],
    load: [300, 400, 500, 700],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.2,
    lineHeightBody: 1.5,
    trackingHeading: "-0.02em",
    trackingBody: "0em",
    stroke: "sans",
    xHeight: 0.73,
    strokeContrast: 0.08,
    width: 0.5,
    openness: 0.72
  },
  "Mulish": {
    available: [200, 300, 400, 500, 600, 700, 800, 900],
    load: [300, 400, 500, 700],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.2,
    lineHeightBody: 1.5,
    trackingHeading: "-0.02em",
    trackingBody: "0em",
    stroke: "sans",
    xHeight: 0.72,
    strokeContrast: 0.05,
    width: 0.5,
    openness: 0.68
  },
  // ——— Monospace fonts ———
  "DM Mono": {
    available: [300, 400, 500],
    load: [300, 400, 500],
    defaultHeading: 400,
    defaultBody: 400,
    lineHeightHeading: 1.3,
    lineHeightBody: 1.55,
    trackingHeading: "0em",
    trackingBody: "0em",
    stroke: "mono",
    xHeight: 0.73,
    strokeContrast: 0.1,
    width: 0.6,
    openness: 0.6
  },
  "Space Mono": {
    available: [400, 700],
    load: [400, 700],
    defaultHeading: 400,
    defaultBody: 400,
    lineHeightHeading: 1.3,
    lineHeightBody: 1.55,
    trackingHeading: "0em",
    trackingBody: "0em",
    stroke: "mono",
    xHeight: 0.73,
    strokeContrast: 0.15,
    width: 0.6,
    openness: 0.55
  },
  "JetBrains Mono": {
    available: [100, 200, 300, 400, 500, 600, 700, 800],
    load: [300, 400, 500, 700],
    defaultHeading: 400,
    defaultBody: 400,
    lineHeightHeading: 1.3,
    lineHeightBody: 1.55,
    trackingHeading: "0em",
    trackingBody: "0em",
    stroke: "mono",
    xHeight: 0.76,
    strokeContrast: 0.05,
    width: 0.58,
    openness: 0.72
  },
  "Fira Code": {
    available: [300, 400, 500, 600, 700],
    load: [300, 400, 500, 700],
    defaultHeading: 400,
    defaultBody: 400,
    lineHeightHeading: 1.3,
    lineHeightBody: 1.55,
    trackingHeading: "0em",
    trackingBody: "0em",
    stroke: "mono",
    xHeight: 0.74,
    strokeContrast: 0.06,
    width: 0.6,
    openness: 0.68
  },
  "IBM Plex Mono": {
    available: [100, 200, 300, 400, 500, 600, 700],
    load: [300, 400, 500, 700],
    defaultHeading: 400,
    defaultBody: 400,
    lineHeightHeading: 1.3,
    lineHeightBody: 1.55,
    trackingHeading: "0em",
    trackingBody: "0em",
    stroke: "mono",
    xHeight: 0.73,
    strokeContrast: 0.08,
    width: 0.58,
    openness: 0.65
  },
  "Barlow": {
    available: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    load: [300, 400, 500, 700],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.2,
    lineHeightBody: 1.55,
    trackingHeading: "-0.01em",
    trackingBody: "0em",
    stroke: "sans",
    xHeight: 0.72,
    strokeContrast: 0.1,
    width: 0.48,
    openness: 0.7
  },
  "Quicksand": {
    available: [300, 400, 500, 600, 700],
    load: [300, 400, 500, 700],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.25,
    lineHeightBody: 1.55,
    trackingHeading: "-0.01em",
    trackingBody: "0.01em",
    stroke: "sans",
    xHeight: 0.76,
    strokeContrast: 0.02,
    width: 0.52,
    openness: 0.85
  },
  "Nunito Sans": {
    available: [200, 300, 400, 500, 600, 700, 800, 900],
    load: [300, 400, 500, 700],
    defaultHeading: 700,
    defaultBody: 400,
    lineHeightHeading: 1.25,
    lineHeightBody: 1.55,
    trackingHeading: "-0.01em",
    trackingBody: "0.01em",
    stroke: "sans",
    xHeight: 0.74,
    strokeContrast: 0.04,
    width: 0.5,
    openness: 0.8
  }
};

// src/data/fontPairing.js
function pairingScore(fontA, fontB) {
  const a = fontWeights[fontA];
  const b = fontWeights[fontB];
  if (!a || !b) return 0;
  const xHeightSim = 1 - Math.abs(a.xHeight - b.xHeight) / 0.2;
  const widthSim = 1 - Math.abs(a.width - b.width) / 0.25;
  const opennessSim = 1 - Math.abs(a.openness - b.openness) / 0.3;
  const strokeContrastDiff = Math.abs(a.strokeContrast - b.strokeContrast) / 0.9;
  const strokeTypeDiff = a.stroke !== b.stroke ? 1 : 0;
  const score = 0.3 * Math.max(0, xHeightSim) + 0.15 * Math.max(0, widthSim) + 0.1 * Math.max(0, opennessSim) + 0.25 * strokeContrastDiff + 0.2 * strokeTypeDiff;
  return Math.max(0, Math.min(1, score));
}

// src/data/scalePresets.js
var scalePresets = {
  compact: { label: "Compact", sizes: "6 sizes", multipliers: [0.75, 0.875, 1, 1.25, 1.75, 2.5], character: "Tight, UI-dense" },
  standard: { label: "Standard", sizes: "7 sizes", multipliers: [0.75, 0.875, 1, 1.25, 1.75, 2.5, 3.5], character: "Balanced, general purpose" },
  editorial: { label: "Editorial", sizes: "9 sizes", multipliers: [0.75, 0.875, 1, 1.25, 1.75, 2.5, 3.5, 5, 7], character: "Expressive, content-forward" }
};

// src/utils/color.js
import {
  useMode,
  converter,
  modeRgb,
  modeOklch,
  modeLrgb,
  parseHex,
  formatHex,
  clampChroma,
  displayable
} from "culori/fn";
useMode(modeRgb);
useMode(modeOklch);
useMode(modeLrgb);
var toRgb = converter("rgb");
var toOklch = converter("oklch");
function hexToRgb(hex) {
  const c = toRgb(parseHex(hex));
  return {
    r: Math.round((c.r || 0) * 255),
    g: Math.round((c.g || 0) * 255),
    b: Math.round((c.b || 0) * 255)
  };
}

// src/utils/deriveTokens.js
import {
  useMode as useMode2,
  converter as converter2,
  formatHex as formatHex2,
  clampChroma as clampChroma2,
  displayable as displayable2,
  modeOklch as modeOklch2,
  modeRgb as modeRgb2,
  modeLrgb as modeLrgb2,
  parseHex as parseHex2,
  wcagLuminance,
  wcagContrast
} from "culori/fn";
useMode2(modeOklch2);
useMode2(modeRgb2);
useMode2(modeLrgb2);
var toOklch2 = converter2("oklch");
function hexToOklch(hex) {
  const c = toOklch2(parseHex2(hex));
  return { L: c.l, C: c.c || 0, H: c.h || 0 };
}
function oklchToHex({ L, C, H }) {
  const color = { mode: "oklch", l: Math.max(0, Math.min(1, L)), c: C, h: H };
  if (!displayable2(color)) {
    const clamped = clampChroma2(color, "oklch");
    return formatHex2(clamped);
  }
  return formatHex2(color);
}
function adjustLightness(hex, delta) {
  const lch = hexToOklch(hex);
  lch.L = Math.max(0, Math.min(1, lch.L + delta));
  return oklchToHex(lch);
}
function luminance(hex) {
  return wcagLuminance(parseHex2(hex));
}
function contrastRatio(hex1, hex2) {
  const ratio = wcagContrast(parseHex2(hex1), parseHex2(hex2));
  return { ratio: Math.round(ratio * 100) / 100, aa: ratio >= 4.5, aaa: ratio >= 7 };
}
function isDark(hex) {
  return luminance(hex) < 0.179;
}
function lerpHue(h1, h2, t) {
  let diff = h2 - h1;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  let result = h1 + diff * t;
  if (result < 0) result += 360;
  if (result >= 360) result -= 360;
  return result;
}
function dampSurfaceChroma(surfChroma, bgChroma) {
  const BG_CHROMA_THRESHOLD = 0.025;
  if (bgChroma >= BG_CHROMA_THRESHOLD || surfChroma <= 0) return surfChroma;
  const factor = bgChroma / BG_CHROMA_THRESHOLD;
  return Math.max(surfChroma * factor, 2e-3);
}
function computeAdaptiveSurfaceChroma(primaryHex) {
  const p = hexToOklch(primaryHex);
  const h = p.H;
  let tempFactor;
  if (h >= 0 && h < 90 || h >= 330) {
    tempFactor = 1.2;
  } else if (h >= 90 && h < 160) {
    tempFactor = 0.85;
  } else {
    tempFactor = 1;
  }
  const surfaceC = Math.max(4e-3, Math.min(0.025, p.C * 0.08 * tempFactor));
  return { surfaceC, surfaceH: p.H };
}
function deriveCounterpartBg(hex) {
  const lch = hexToOklch(hex);
  const dark = isDark(hex);
  const invertedL = 1 - lch.L;
  const targetL = dark ? Math.min(1, invertedL * 1.15) : Math.max(0.15, invertedL * 0.85);
  return oklchToHex({ L: targetL, C: lch.C * 0.7, H: lch.H });
}
function adjustToContrast(color, bg, targetRatio) {
  const lch = hexToOklch(color);
  const bgLum = luminance(bg);
  const bgIsLight = bgLum > 0.179;
  let lo = bgIsLight ? 0 : lch.L;
  let hi = bgIsLight ? lch.L : 1;
  const currentRatio = contrastRatio(color, bg).ratio;
  if (currentRatio >= targetRatio) return color;
  if (bgIsLight) {
    lo = 0;
    hi = lch.L;
  } else {
    lo = lch.L;
    hi = 1;
  }
  let best = color;
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2;
    const candidate = oklchToHex({ L: mid, C: lch.C, H: lch.H });
    const ratio = contrastRatio(candidate, bg).ratio;
    if (ratio >= targetRatio) {
      best = candidate;
      if (bgIsLight) lo = mid;
      else hi = mid;
    } else {
      if (bgIsLight) hi = mid;
      else lo = mid;
    }
  }
  if (contrastRatio(best, bg).ratio < targetRatio) {
    const monoLch = { ...lch, C: 0 };
    if (bgIsLight) {
      monoLch.L = 0;
    } else {
      monoLch.L = 1;
    }
    best = oklchToHex(monoLch);
  }
  return best;
}
function deriveBgScale(bg, primaryHex) {
  const dark = isDark(bg);
  const lch = hexToOklch(bg);
  let surfChroma = 0;
  let surfHue = lch.H;
  if (primaryHex) {
    const a = computeAdaptiveSurfaceChroma(primaryHex);
    surfChroma = a.surfaceC;
    surfHue = a.surfaceH;
  }
  surfChroma = dampSurfaceChroma(surfChroma, lch.C);
  const BG_CHROMA_THRESHOLD = 0.025;
  const boostStrength = dark ? 1 : 0.5;
  const neutralBoost = lch.C < BG_CHROMA_THRESHOLD ? 1 + boostStrength * (1 - lch.C / BG_CHROMA_THRESHOLD) : 1;
  const effH = surfChroma > lch.C ? lch.C > 5e-3 ? lerpHue(lch.H, surfHue, surfChroma / (lch.C + surfChroma)) : surfHue : lch.H;
  const toHex = (L, chromaMult = 1) => {
    let sc = surfChroma * chromaMult;
    if (dark) sc *= 1 + 0.3 * Math.max(0, Math.min(1, L));
    const c = Math.max(lch.C, sc);
    return oklchToHex({
      L: Math.max(0, Math.min(1, L)),
      C: c,
      H: c > lch.C ? effH : lch.H
    });
  };
  if (dark) {
    const surfStep = 0.04 * neutralBoost;
    const elevStep = 0.04 * neutralBoost;
    const surfaceL = Math.max(lch.L + surfStep, 0.08 * neutralBoost);
    const elevatedL = Math.max(surfaceL + elevStep, 0.12 * neutralBoost);
    const borderSubtleL = Math.max(elevatedL + 0.06, lch.L + 0.12, 0.2);
    const borderDefaultL = Math.max(borderSubtleL + 0.05, 0.26);
    const borderStrongL = Math.max(borderDefaultL + 0.06, 0.34);
    return {
      bg,
      "bg-surface": toHex(surfaceL, 1),
      "bg-elevated": toHex(elevatedL, 0.85),
      "border-subtle": toHex(borderSubtleL, 0.65),
      "border-default": toHex(borderDefaultL, 0.6),
      "border-strong": toHex(borderStrongL, 0.5)
    };
  }
  const surfDL = -0.015 * neutralBoost;
  const elevDL = -0.03 * neutralBoost;
  const step = (dL, chromaMult = 1) => toHex(lch.L + dL, chromaMult);
  return {
    bg,
    "bg-surface": step(surfDL, 1),
    "bg-elevated": step(elevDL, 0.85),
    "border-subtle": step(-0.05, 0.65),
    "border-default": step(-0.08, 0.6),
    "border-strong": step(-0.13, 0.5)
  };
}
function deriveTextScale(bg, primaryHex) {
  const dark = isDark(bg);
  const lch = hexToOklch(bg);
  let surfChroma = 0;
  let surfHue = lch.H;
  if (primaryHex) {
    const a = computeAdaptiveSurfaceChroma(primaryHex);
    surfChroma = a.surfaceC;
    surfHue = a.surfaceH;
  }
  surfChroma = dampSurfaceChroma(surfChroma, lch.C);
  const effH = surfChroma > lch.C ? lch.C > 5e-3 ? lerpHue(lch.H, surfHue, surfChroma / (lch.C + surfChroma)) : surfHue : lch.H;
  const textC = Math.max(lch.C * 0.05, surfChroma * 0.45);
  const mutedC = Math.max(lch.C * 0.08, surfChroma * 0.7);
  const subtleC = Math.max(lch.C * 0.06, surfChroma * 0.45);
  const textH = textC > lch.C * 0.05 ? effH : lch.H;
  const mutedH = mutedC > lch.C * 0.08 ? effH : lch.H;
  const subtleH = subtleC > lch.C * 0.06 ? effH : lch.H;
  const bgSurface = deriveBgScale(bg, primaryHex)["bg-surface"];
  const subtleCandidate = oklchToHex({ L: dark ? 0.5 : 0.58, C: subtleC, H: subtleH });
  return {
    text: oklchToHex({ L: dark ? 0.93 : 0.15, C: textC, H: textH }),
    "text-muted": oklchToHex({ L: dark ? 0.65 : 0.45, C: mutedC, H: mutedH }),
    "text-subtle": adjustToContrast(subtleCandidate, bgSurface, 4.5)
  };
}
function deriveContainer(baseLch, bgHex, dark) {
  const bgLch = hexToOklch(bgHex);
  const vivid = bgLch.C > 0.08;
  if (!vivid) {
    const containerL2 = dark ? Math.max(bgLch.L + 0.06, 0.15) : Math.min(bgLch.L - 0.04, 0.95);
    const containerC2 = Math.min(baseLch.C * 0.35, dark ? 0.04 : 0.035);
    return oklchToHex({ L: containerL2, C: containerC2, H: baseLch.H });
  }
  const targetL = dark ? 0.25 : 0.92;
  const containerL = dark ? Math.max(targetL * 0.6 + (bgLch.L + 0.08) * 0.4, 0.18) : Math.min(targetL * 0.6 + (bgLch.L - 0.06) * 0.4, 0.95);
  const containerC = Math.min(
    Math.max(baseLch.C * 0.45, 0.06),
    dark ? 0.08 : 0.07
  );
  return oklchToHex({ L: containerL, C: containerC, H: baseLch.H });
}
function deriveBrandScale(color, bg, primaryHex) {
  const dark = isDark(bg);
  let base = adjustToContrast(color, bg, 3);
  const lch = hexToOklch(base);
  const container = deriveContainer(lch, bg, dark);
  base = adjustToContrast(base, container, 3);
  const baseLch = hexToOklch(base);
  const onBase = dark ? "#ffffff" : contrastRatio("#ffffff", base).ratio >= contrastRatio("#000000", base).ratio ? "#ffffff" : "#000000";
  const onColor = adjustToContrast(onBase, base, 4.5);
  const onContainer = adjustToContrast(base, container, 4.5);
  const hover = adjustLightness(base, dark ? 0.04 : -0.04);
  const active = adjustLightness(base, dark ? 0.07 : -0.07);
  const borderL = dark ? Math.min(baseLch.L + 0.15, 0.7) : Math.max(baseLch.L - 0.15, 0.3);
  const borderC = baseLch.C * 0.6;
  const border = oklchToHex({ L: borderL, C: borderC, H: baseLch.H });
  const bgScale = deriveBgScale(bg, primaryHex);
  const text = adjustToContrast(base, bgScale["bg-surface"], 4.5);
  return {
    base,
    on: onColor,
    container,
    "on-container": onContainer,
    hover,
    active,
    border,
    text
  };
}
function deriveStatusScale(color, bg) {
  const dark = isDark(bg);
  const base = adjustToContrast(color, bg, 3);
  const lch = hexToOklch(base);
  const whiteContrast = contrastRatio("#ffffff", base).ratio;
  const blackContrast = contrastRatio("#000000", base).ratio;
  const onCandidate = whiteContrast >= blackContrast ? "#ffffff" : "#000000";
  const on = adjustToContrast(onCandidate, base, 4.5);
  const container = deriveContainer(lch, bg, dark);
  const onContainer = adjustToContrast(base, container, 4.5);
  const text = adjustToContrast(base, bg, 4.5);
  return {
    base,
    on,
    container,
    "on-container": onContainer,
    text
  };
}
function deriveTypeScale(baseSize, preset, headingFont, bodyFont) {
  const presetDef = scalePresets[preset] || scalePresets.standard;
  const mults = presetDef.multipliers;
  const belowNames = ["caption", "label"];
  const aboveNames = ["h3", "h2", "h1", "display", "display-lg", "display-xl"];
  const baseIndex = 2;
  const sizes = {};
  sizes.body = baseSize;
  for (let i = 0; i < baseIndex; i++) {
    sizes[belowNames[i]] = Math.max(8, Math.round(baseSize * mults[i]));
  }
  for (let i = baseIndex + 1; i < mults.length; i++) {
    sizes[aboveNames[i - baseIndex - 1]] = Math.min(96, Math.round(baseSize * mults[i]));
  }
  sizes.small = sizes.label;
  const hfw = fontWeights[headingFont] || {};
  const bfw = fontWeights[bodyFont] || {};
  const result = {};
  const headingLevels = ["display-xl", "display-lg", "display", "h1", "h2", "h3"].filter((l) => l in sizes);
  const bodyLevels = ["body", "small"];
  const monoLevels = ["label", "caption"];
  for (const level of headingLevels) {
    result[level] = {
      size: sizes[level],
      lineHeight: hfw.lineHeightHeading || 1.2,
      tracking: hfw.trackingHeading || "-0.02em"
    };
  }
  for (const level of bodyLevels) {
    result[level] = {
      size: sizes[level],
      lineHeight: bfw.lineHeightBody || 1.5,
      tracking: bfw.trackingBody || "0em"
    };
  }
  for (const level of monoLevels) {
    result[level] = {
      size: sizes[level],
      lineHeight: 1.4,
      tracking: "0.08em"
    };
  }
  const allSizes = [...new Set(Object.values(sizes))].sort((a, b) => a - b);
  return { levels: result, allSizes, sizes };
}
function deriveShapeScale(radius, spacingUnit) {
  const isPill = radius >= 99;
  return {
    "radius-xs": isPill ? 4 : Math.max(1, Math.round(radius * 0.25)),
    "radius-sm": isPill ? 8 : Math.max(2, Math.round(radius * 0.5)),
    "radius-md": isPill ? 16 : radius,
    "radius-lg": isPill ? 24 : Math.round(radius * 1.5),
    "radius-full": 9999,
    spacing: {
      1: Math.round(spacingUnit * 0.25),
      2: Math.round(spacingUnit * 0.5),
      3: Math.round(spacingUnit * 0.75),
      4: spacingUnit,
      6: Math.round(spacingUnit * 1.5),
      8: spacingUnit * 2,
      12: spacingUnit * 3,
      16: spacingUnit * 4,
      24: spacingUnit * 6,
      32: spacingUnit * 8
    }
  };
}
function deriveShadowScale(bgHex, style = "soft", primaryHex = null) {
  if (style === "none") {
    return {
      "shadow-color": "transparent",
      "shadow-sm": "none",
      "shadow-md": "none",
      "shadow-lg": "none"
    };
  }
  const bgLch = hexToOklch(bgHex);
  const isDark2 = bgLch.L < 0.5;
  if (style === "glow" && primaryHex) {
    const { r: r2, g: g2, b: b2 } = hexToRgb(primaryHex);
    const rgb2 = `${r2},${g2},${b2}`;
    const o = isDark2 ? 0.5 : 0.35;
    return {
      "shadow-color": primaryHex,
      "shadow-sm": `0 0 8px rgba(${rgb2}, ${(o * 0.7).toFixed(2)}), 0 0 2px rgba(${rgb2}, ${(o * 0.4).toFixed(2)})`,
      "shadow-md": `0 0 16px rgba(${rgb2}, ${o.toFixed(2)}), 0 0 4px rgba(${rgb2}, ${(o * 0.5).toFixed(2)})`,
      "shadow-lg": `0 0 32px rgba(${rgb2}, ${o.toFixed(2)}), 0 0 8px rgba(${rgb2}, ${(o * 0.6).toFixed(2)})`
    };
  }
  const shadowHex = oklchToHex({
    L: bgLch.L * 0.15,
    C: bgLch.C * 0.3,
    H: bgLch.H
  });
  const { r, g, b } = hexToRgb(shadowHex);
  const rgb = `${r},${g},${b}`;
  const m = isDark2 ? 2.5 : 1;
  if (style === "hard") {
    return {
      "shadow-color": shadowHex,
      "shadow-sm": `2px 2px 0 rgba(${rgb}, ${(0.25 * m).toFixed(2)})`,
      "shadow-md": `4px 4px 0 rgba(${rgb}, ${(0.3 * m).toFixed(2)})`,
      "shadow-lg": `8px 8px 0 rgba(${rgb}, ${(0.35 * m).toFixed(2)})`
    };
  }
  return {
    "shadow-color": shadowHex,
    "shadow-sm": `0 1px 3px rgba(${rgb}, ${(0.08 * m).toFixed(2)}), 0 1px 2px -1px rgba(${rgb}, ${(0.05 * m).toFixed(2)})`,
    "shadow-md": `0 4px 6px -1px rgba(${rgb}, ${(0.1 * m).toFixed(2)}), 0 2px 4px -2px rgba(${rgb}, ${(0.06 * m).toFixed(2)})`,
    "shadow-lg": `0 10px 25px -3px rgba(${rgb}, ${(0.14 * m).toFixed(2)}), 0 4px 10px -4px rgba(${rgb}, ${(0.08 * m).toFixed(2)})`
  };
}
function validateContrast(colors) {
  const checks = [];
  const add = (fg, bgColor, label, context, required) => {
    if (!fg || !bgColor) return;
    const fgClean = fg.length > 7 ? fg.slice(0, 7) : fg;
    const bgClean = bgColor.length > 7 ? bgColor.slice(0, 7) : bgColor;
    const result = contrastRatio(fgClean, bgClean);
    checks.push({
      label,
      context,
      fgHex: fgClean,
      bgHex: bgClean,
      ratio: result.ratio,
      required,
      pass: result.ratio >= required
    });
  };
  add(colors.text, colors.bg, "Body text \u2192 Page background", "AA text", 4.5);
  add(colors.text, colors["bg-surface"], "Body text \u2192 Card surface", "AA text", 4.5);
  add(colors.text, colors["bg-elevated"], "Body text \u2192 Elevated surface", "AA text", 4.5);
  add(colors["text-muted"], colors.bg, "Muted text \u2192 Page background", "AA large / UI", 3);
  add(colors["text-muted"], colors["bg-surface"], "Muted text \u2192 Card surface", "AA large / UI", 3);
  add(colors["text-muted"], colors["bg-elevated"], "Muted text \u2192 Elevated surface", "AA large / UI", 3);
  add(colors["text-subtle"], colors.bg, "Subtle text \u2192 Page background", "AA text", 4.5);
  add(colors["text-subtle"], colors["bg-surface"], "Subtle text \u2192 Card surface", "AA text", 4.5);
  add(colors.primary, colors.bg, "Primary color \u2192 Page background", "AA UI", 3);
  add(colors.primary, colors["bg-surface"], "Primary color \u2192 Card surface", "AA UI", 3);
  add(colors["primary-on"], colors.primary, "Button label \u2192 Primary button", "AA text", 4.5);
  add(colors["primary-on-container"], colors["primary-container"], "Text \u2192 Primary tinted surface", "AA text", 4.5);
  add(colors.primary, colors["primary-container"], "Primary accent \u2192 Primary tinted surface", "AA UI", 3);
  add(colors.text, colors["primary-container"], "Body text \u2192 Primary surface", "AA text", 4.5);
  if (colors.secondary) {
    add(colors.secondary, colors.bg, "Secondary color \u2192 Page background", "AA UI", 3);
    add(colors["secondary-on"], colors.secondary, "Label \u2192 Secondary button", "AA text", 4.5);
    add(colors["secondary-on-container"], colors["secondary-container"], "Text \u2192 Secondary tinted surface", "AA text", 4.5);
    add(colors.secondary, colors["secondary-container"], "Secondary accent \u2192 Secondary tinted surface", "AA UI", 3);
  }
  if (colors.tertiary) {
    add(colors.tertiary, colors.bg, "Tertiary color \u2192 Page background", "AA UI", 3);
    add(colors["tertiary-on"], colors.tertiary, "Label \u2192 Tertiary button", "AA text", 4.5);
    add(colors["tertiary-on-container"], colors["tertiary-container"], "Text \u2192 Tertiary tinted surface", "AA text", 4.5);
    add(colors.tertiary, colors["tertiary-container"], "Tertiary accent \u2192 Tertiary tinted surface", "AA UI", 3);
  }
  add(colors["success-on"], colors.success, "Label \u2192 Success badge", "AA text", 4.5);
  add(colors["success-on-container"], colors["success-container"], "Text \u2192 Success tinted surface", "AA text", 4.5);
  add(colors.success, colors.bg, "Success color \u2192 Page background", "AA UI", 3);
  add(colors["warning-on"], colors.warning, "Label \u2192 Warning badge", "AA text", 4.5);
  add(colors["warning-on-container"], colors["warning-container"], "Text \u2192 Warning tinted surface", "AA text", 4.5);
  add(colors.warning, colors.bg, "Warning color \u2192 Page background", "AA UI", 3);
  add(colors["error-on"], colors.error, "Label \u2192 Error badge", "AA text", 4.5);
  add(colors["error-on-container"], colors["error-container"], "Text \u2192 Error tinted surface", "AA text", 4.5);
  add(colors.error, colors.bg, "Error color \u2192 Page background", "AA UI", 3);
  return checks;
}
function deriveAllTokens(inputs) {
  const { bg, primary, secondary, tertiary, success, warning, error } = inputs;
  const tintPrimary = inputs.tintSurfaces !== false ? primary : null;
  const bgScale = deriveBgScale(bg, tintPrimary);
  const textScale = deriveTextScale(bg, tintPrimary);
  const primaryScale = deriveBrandScale(primary, bg, tintPrimary);
  const secondaryScale = secondary ? deriveBrandScale(secondary, bg, tintPrimary) : null;
  const tertiaryScale = tertiary ? deriveBrandScale(tertiary, bg, tintPrimary) : null;
  const successScale = deriveStatusScale(success, bg);
  const warningScale = deriveStatusScale(warning, bg);
  const errorScale = deriveStatusScale(error, bg);
  const colors = {
    // Backgrounds
    bg: bgScale.bg,
    "bg-surface": bgScale["bg-surface"],
    "bg-elevated": bgScale["bg-elevated"],
    "border-subtle": bgScale["border-subtle"],
    "border-default": bgScale["border-default"],
    "border-strong": bgScale["border-strong"],
    // Text
    text: textScale.text,
    "text-muted": textScale["text-muted"],
    "text-subtle": textScale["text-subtle"],
    // Primary (4-token + states)
    primary: primaryScale.base,
    "primary-hover": primaryScale.hover,
    "primary-active": primaryScale.active,
    "primary-container": primaryScale.container,
    "primary-border": primaryScale.border,
    "primary-on-container": primaryScale["on-container"],
    "primary-on": primaryScale.on,
    "primary-text": primaryScale.text,
    "primary-shadow": primaryScale.base + "40",
    // 25% alpha for box-shadow
    // Status (4-token each)
    success: successScale.base,
    "success-container": successScale.container,
    "success-on": successScale.on,
    "success-on-container": successScale["on-container"],
    "success-text": successScale.text,
    warning: warningScale.base,
    "warning-container": warningScale.container,
    "warning-on": warningScale.on,
    "warning-on-container": warningScale["on-container"],
    "warning-text": warningScale.text,
    error: errorScale.base,
    "error-container": errorScale.container,
    "error-on": errorScale.on,
    "error-on-container": errorScale["on-container"],
    "error-text": errorScale.text
  };
  if (secondaryScale) {
    colors.secondary = secondaryScale.base;
    colors["secondary-hover"] = secondaryScale.hover;
    colors["secondary-active"] = secondaryScale.active;
    colors["secondary-container"] = secondaryScale.container;
    colors["secondary-border"] = secondaryScale.border;
    colors["secondary-on-container"] = secondaryScale["on-container"];
    colors["secondary-on"] = secondaryScale.on;
    colors["secondary-text"] = secondaryScale.text;
  }
  if (tertiaryScale) {
    colors.tertiary = tertiaryScale.base;
    colors["tertiary-hover"] = tertiaryScale.hover;
    colors["tertiary-active"] = tertiaryScale.active;
    colors["tertiary-container"] = tertiaryScale.container;
    colors["tertiary-border"] = tertiaryScale.border;
    colors["tertiary-on-container"] = tertiaryScale["on-container"];
    colors["tertiary-on"] = tertiaryScale.on;
    colors["tertiary-text"] = tertiaryScale.text;
  }
  colors["primary-subtle"] = colors["primary-container"];
  colors["text-on-primary"] = colors["primary-on"];
  colors["success-subtle"] = colors["success-container"];
  colors["warning-subtle"] = colors["warning-container"];
  colors["error-subtle"] = colors["error-container"];
  if (secondaryScale) {
    colors["secondary-subtle"] = colors["secondary-container"];
    colors["text-on-secondary"] = colors["secondary-on"];
  }
  if (tertiaryScale) {
    colors["tertiary-subtle"] = colors["tertiary-container"];
    colors["text-on-tertiary"] = colors["tertiary-on"];
  }
  const contrastChecks = validateContrast(colors);
  return { colors, contrastChecks };
}

// src/utils/templateNameSuggest.js
import { uniqueNamesGenerator } from "unique-names-generator";

// src/data/templateWords.js
var moods = [
  // Appearance (imsky/wordlists/adjectives/appearance.txt)
  "bright",
  "brilliant",
  "clean",
  "dark",
  "flat",
  "glossy",
  "glowing",
  "matte",
  "muted",
  "pale",
  "radiant",
  "sleek",
  "vibrant",
  "vivid",
  // Temperature (imsky/wordlists/adjectives/temperature.txt)
  "cool",
  "frosty",
  "icy",
  "warm",
  // Shape (imsky/wordlists/adjectives/shape.txt)
  "blocky",
  "compact",
  "rounded",
  "slim",
  "solid",
  // Sound (imsky/wordlists/adjectives/sound.txt)
  "bold",
  "gentle",
  "hushed",
  "quiet",
  "soft",
  // Speed (imsky/wordlists/adjectives/speed.txt)
  "agile",
  "nimble",
  "swift",
  // Age (imsky/wordlists/adjectives/age.txt)
  "ancient",
  "contemporary",
  "fresh",
  "modern",
  "raw",
  "vintage",
  // Design styles (UX Planet taxonomy, existing templates)
  "minimal",
  "brutalist",
  "editorial",
  "playful",
  "refined",
  "lush",
  "crisp",
  "airy",
  "dense",
  "organic",
  "geometric",
  "modular",
  "austere",
  "opulent",
  "stark",
  "ethereal",
  "rugged",
  "polished",
  "handcrafted",
  "industrial",
  "retro",
  "neo",
  "Nordic",
  // Color-inspired moods (meodai/color-names vocabulary)
  "midnight",
  "amber",
  "coral",
  "ivory",
  "obsidian",
  "ember",
  "azure",
  "sage",
  "blush",
  "slate",
  "copper",
  "pearl",
  "charcoal",
  "dusk",
  "dawn"
];
var domains = [
  // Design nouns (imsky/wordlists/nouns/design.txt)
  "palette",
  "gradient",
  "texture",
  "vector",
  "layout",
  "grid",
  "space",
  "depth",
  "contrast",
  "style",
  // Typography nouns (imsky/wordlists/nouns/typography.txt)
  "serif",
  "slab",
  "gothic",
  "humanist",
  "headline",
  // Architecture nouns (imsky/wordlists/nouns/architecture.txt)
  "arcade",
  "pavilion",
  "facade",
  "terrace",
  "spire",
  "colonnade",
  // Industry/use-case domains (existing templates + common SaaS categories)
  "agency",
  "studio",
  "atelier",
  "forge",
  "lab",
  "press",
  "bureau",
  "collective",
  "foundry",
  "workshop",
  // Product categories
  "saas",
  "fintech",
  "editorial",
  "consumer",
  "indie",
  "commerce",
  "dashboard",
  "portal",
  "docs",
  // Aesthetic schools
  "bauhaus",
  "deco",
  "nouveau",
  "swiss",
  "brutalism",
  "futurism",
  // Abstract nouns that evoke design quality
  "canvas",
  "signal",
  "pulse",
  "craft",
  "edge",
  "core",
  "form",
  "flow",
  "mode",
  "shift",
  "drift",
  "bloom",
  "prism",
  "lens",
  "axis",
  "arc",
  "grain",
  "tone",
  "ink"
];

// src/utils/templateNameSuggest.js
function hexToRgb2(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return [n >> 16 & 255, n >> 8 & 255, n & 255];
}
function perceivedLightness([r, g, b]) {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}
function warmth([r, , b]) {
  return r - b;
}
function biasedMoods(tokens) {
  const bg = tokens?.bg || tokens?.light?.bg;
  const primary = tokens?.primary || tokens?.light?.primary;
  if (!bg || !primary) return moods;
  const bgRgb = hexToRgb2(bg);
  const L = perceivedLightness(bgRgb);
  const W = warmth(hexToRgb2(primary));
  const biased = [];
  if (L < 0.3) biased.push("dark", "midnight", "obsidian", "charcoal", "deep", "dense", "slate");
  else if (L > 0.7) biased.push("bright", "clean", "airy", "crisp", "ivory", "pearl", "pale");
  else biased.push("muted", "matte", "dusk", "hushed", "soft");
  if (W > 40) biased.push("warm", "ember", "coral", "amber", "copper", "lush");
  else if (W < -40) biased.push("cool", "frosty", "icy", "azure", "slate", "Nordic");
  else biased.push("balanced", "gentle", "sage", "blush");
  biased.push("bold", "minimal", "modern", "raw", "refined", "playful", "sleek", "vintage");
  return [...new Set(biased)];
}
function suggestNames(count = 5, tokens) {
  const moodList = tokens ? biasedMoods(tokens) : moods;
  const names = /* @__PURE__ */ new Set();
  const maxAttempts = count * 4;
  let attempts = 0;
  while (names.size < count && attempts < maxAttempts) {
    const name = uniqueNamesGenerator({
      dictionaries: [moodList, domains],
      separator: "-",
      length: 2,
      style: "lowerCase"
    });
    names.add(name);
    attempts++;
  }
  return [...names];
}

// src/utils/templateGenerator.js
useMode3(modeOklch3);
useMode3(modeRgb3);
useMode3(modeLrgb3);
var toOklch3 = converter3("oklch");
function hexToOklch2(hex) {
  const c = toOklch3(parseHex3(hex));
  return { L: c.l, C: c.c || 0, H: c.h || 0 };
}
function oklchToHex2({ L, C, H }) {
  const color = { mode: "oklch", l: Math.max(0, Math.min(1, L)), c: C, h: H };
  if (!displayable3(color)) return formatHex3(clampChroma3(color, "oklch"));
  return formatHex3(color);
}
function contrast(a, b) {
  return wcagContrast2(parseHex3(a), parseHex3(b));
}
function rotateHue(H, deg) {
  return ((H + deg) % 360 + 360) % 360;
}
function complementary(seed) {
  const lch = hexToOklch2(seed);
  return oklchToHex2({ ...lch, H: rotateHue(lch.H, 180) });
}
function analogous(seed) {
  const lch = hexToOklch2(seed);
  return [
    oklchToHex2({ ...lch, H: rotateHue(lch.H, -30) }),
    oklchToHex2({ ...lch, H: rotateHue(lch.H, 30) })
  ];
}
function triadic(seed) {
  const lch = hexToOklch2(seed);
  return [
    oklchToHex2({ ...lch, H: rotateHue(lch.H, 120) }),
    oklchToHex2({ ...lch, H: rotateHue(lch.H, 240) })
  ];
}
function splitComplementary(seed) {
  const lch = hexToOklch2(seed);
  return [
    oklchToHex2({ ...lch, H: rotateHue(lch.H, 150) }),
    oklchToHex2({ ...lch, H: rotateHue(lch.H, 210) })
  ];
}
function tetradic(seed) {
  const lch = hexToOklch2(seed);
  return [
    oklchToHex2({ ...lch, H: rotateHue(lch.H, 90) }),
    oklchToHex2({ ...lch, H: rotateHue(lch.H, 180) })
  ];
}
function deriveDarkAccent(hex, darkBg) {
  const lch = hexToOklch2(hex);
  const darkL = Math.max(0.65, Math.min(0.85, 1 - lch.L + 0.15));
  const darkC = Math.min(lch.C * 1.15, 0.35);
  let candidate = oklchToHex2({ L: darkL, C: darkC, H: lch.H });
  if (contrast(candidate, darkBg) < 3) {
    const adj = hexToOklch2(candidate);
    adj.L = Math.min(0.95, adj.L + 0.12);
    candidate = oklchToHex2(adj);
  }
  return candidate;
}
function ensureContrast(hex, bg, minRatio) {
  let ratio = contrast(hex, bg);
  if (ratio >= minRatio) return hex;
  const lch = hexToOklch2(hex);
  const bgLch = hexToOklch2(bg);
  const bgIsLight = bgLch.L > 0.5;
  let lo = bgIsLight ? 0 : lch.L;
  let hi = bgIsLight ? lch.L : 1;
  let best = hex;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    const candidate = oklchToHex2({ L: mid, C: lch.C, H: lch.H });
    ratio = contrast(candidate, bg);
    if (ratio >= minRatio) {
      best = candidate;
      if (bgIsLight) lo = mid;
      else hi = mid;
    } else {
      if (bgIsLight) hi = mid;
      else lo = mid;
    }
  }
  if (contrast(best, bg) < minRatio) {
    best = oklchToHex2({ L: bgIsLight ? 0.25 : 0.85, C: 0, H: lch.H });
  }
  return best;
}
function validatePalette(lightPalette, darkPalette) {
  const report = { light: {}, dark: {} };
  const lBg = lightPalette.bg;
  lightPalette.primary = ensureContrast(lightPalette.primary, lBg, 4.5);
  lightPalette.secondary = ensureContrast(lightPalette.secondary, lBg, 3);
  lightPalette.tertiary = ensureContrast(lightPalette.tertiary, lBg, 3);
  report.light.primary = Math.round(contrast(lightPalette.primary, lBg) * 10) / 10;
  report.light.secondary = Math.round(contrast(lightPalette.secondary, lBg) * 10) / 10;
  report.light.tertiary = Math.round(contrast(lightPalette.tertiary, lBg) * 10) / 10;
  const dBg = darkPalette.bg;
  darkPalette.primary = ensureContrast(darkPalette.primary, dBg, 4.5);
  darkPalette.secondary = ensureContrast(darkPalette.secondary, dBg, 3);
  darkPalette.tertiary = ensureContrast(darkPalette.tertiary, dBg, 3);
  report.dark.primary = Math.round(contrast(darkPalette.primary, dBg) * 10) / 10;
  report.dark.secondary = Math.round(contrast(darkPalette.secondary, dBg) * 10) / 10;
  report.dark.tertiary = Math.round(contrast(darkPalette.tertiary, dBg) * 10) / 10;
  return { light: lightPalette, dark: darkPalette, contrastReport: report };
}
var MOOD_PRESETS = {
  // Warm & editorial — earthy tones, serif heading
  warm: {
    hueRange: [15, 45],
    chromaRange: [0.1, 0.16],
    primaryL: [0.45, 0.58],
    lightBgL: [0.92, 0.96],
    lightBgC: [0.01, 0.025],
    harmony: "analogous",
    radiusRange: [2, 8],
    shadow: "soft",
    fontMood: ["serif"]
  },
  // Cool & minimal — blue-grey, clean sans
  cool: {
    hueRange: [200, 260],
    chromaRange: [0.06, 0.14],
    primaryL: [0.42, 0.58],
    lightBgL: [0.96, 0.99],
    lightBgC: [0, 8e-3],
    harmony: "analogous",
    radiusRange: [4, 12],
    shadow: "soft",
    fontMood: ["sans"]
  },
  // Bold & agency — saturated, high contrast
  bold: {
    hueRange: [0, 360],
    chromaRange: [0.18, 0.3],
    primaryL: [0.4, 0.55],
    lightBgL: [0.85, 0.98],
    lightBgC: [0, 0.04],
    harmony: "splitComplementary",
    radiusRange: [0, 4],
    shadow: "hard",
    fontMood: ["sans", "display"]
  },
  // Dark & fintech — muted, precise
  dark: {
    hueRange: [100, 180],
    chromaRange: [0.12, 0.22],
    primaryL: [0.48, 0.6],
    lightBgL: [0.96, 0.98],
    lightBgC: [0, 5e-3],
    harmony: "complementary",
    radiusRange: [2, 6],
    shadow: "none",
    fontMood: ["mono", "sans"]
  },
  // Soft & consumer — pastel, rounded
  soft: {
    hueRange: [260, 340],
    chromaRange: [0.08, 0.16],
    primaryL: [0.45, 0.6],
    lightBgL: [0.93, 0.97],
    lightBgC: [0.01, 0.03],
    harmony: "triadic",
    radiusRange: [12, 20],
    shadow: "soft",
    fontMood: ["sans", "rounded"]
  },
  // Minimal & nordic — near-achromatic, elegant
  minimal: {
    hueRange: [60, 120],
    chromaRange: [0.01, 0.04],
    primaryL: [0.3, 0.45],
    lightBgL: [0.97, 0.995],
    lightBgC: [0, 5e-3],
    harmony: "analogous",
    radiusRange: [0, 4],
    shadow: "soft",
    fontMood: ["serif", "sans"]
  },
  // Brutalist — monochrome, raw
  brutalist: {
    hueRange: [0, 360],
    chromaRange: [0, 0.02],
    primaryL: [0.12, 0.2],
    lightBgL: [0.93, 0.97],
    lightBgC: [0, 3e-3],
    harmony: "complementary",
    radiusRange: [0, 0],
    shadow: "hard",
    fontMood: ["mono"],
    forceAccent: true
  },
  // Playful — high chroma, bouncy
  playful: {
    hueRange: [0, 360],
    chromaRange: [0.16, 0.26],
    primaryL: [0.5, 0.62],
    lightBgL: [0.92, 0.96],
    lightBgC: [0.01, 0.04],
    harmony: "triadic",
    radiusRange: [14, 20],
    shadow: "soft",
    fontMood: ["rounded", "sans"]
  },
  // Vintage — desaturated, earthy
  vintage: {
    hueRange: [20, 80],
    chromaRange: [0.06, 0.12],
    primaryL: [0.4, 0.52],
    lightBgL: [0.9, 0.95],
    lightBgC: [0.015, 0.03],
    harmony: "analogous",
    radiusRange: [4, 8],
    shadow: "soft",
    fontMood: ["serif"]
  },
  // ——— New presets ———
  // Luxury — gold/champagne tones, elegant serif, refined
  luxury: {
    hueRange: [30, 60],
    chromaRange: [0.08, 0.14],
    primaryL: [0.42, 0.55],
    lightBgL: [0.94, 0.97],
    lightBgC: [5e-3, 0.015],
    harmony: "complementary",
    radiusRange: [2, 6],
    shadow: "soft",
    fontMood: ["serif"]
  },
  // Nature — green/earth tones, organic feel
  nature: {
    hueRange: [90, 160],
    chromaRange: [0.08, 0.18],
    primaryL: [0.4, 0.55],
    lightBgL: [0.93, 0.97],
    lightBgC: [8e-3, 0.02],
    harmony: "analogous",
    radiusRange: [8, 14],
    shadow: "soft",
    fontMood: ["serif", "sans"]
  },
  // Neon — dark-first, maximum chroma, cyber aesthetic
  neon: {
    hueRange: [0, 360],
    chromaRange: [0.24, 0.37],
    primaryL: [0.6, 0.75],
    lightBgL: [0.12, 0.18],
    // dark bg! darkFirst flips it
    lightBgC: [5e-3, 0.02],
    harmony: "triadic",
    radiusRange: [4, 8],
    shadow: "hard",
    fontMood: ["mono", "display"],
    darkFirst: true
  },
  // Corporate — professional blue, clean, trustworthy
  corporate: {
    hueRange: [200, 240],
    chromaRange: [0.06, 0.12],
    primaryL: [0.38, 0.5],
    lightBgL: [0.96, 0.99],
    lightBgC: [0, 5e-3],
    harmony: "analogous",
    radiusRange: [6, 10],
    shadow: "soft",
    fontMood: ["sans"]
  },
  // Retro — warm saturated, 70s/80s vibe, bold shapes
  retro: {
    hueRange: [340, 400],
    // red-orange, wraps past 360
    chromaRange: [0.14, 0.24],
    primaryL: [0.48, 0.58],
    lightBgL: [0.9, 0.94],
    lightBgC: [0.02, 0.04],
    harmony: "splitComplementary",
    radiusRange: [0, 4],
    shadow: "hard",
    fontMood: ["display", "serif"]
  }
};
var FONT_CATEGORIES = {
  serif: ["Playfair Display", "Cormorant Garamond", "DM Serif Display", "Fraunces", "Lora", "Merriweather", "Libre Baskerville"],
  sans: ["Space Grotesk", "Montserrat", "Poppins", "Raleway", "Work Sans", "Archivo", "Plus Jakarta Sans", "Barlow"],
  display: ["Syne", "Oswald", "Josefin Sans"],
  rounded: ["Nunito", "Quicksand", "Outfit"],
  mono: ["Space Mono", "JetBrains Mono", "DM Mono", "Fira Code", "IBM Plex Mono"]
};
var BODY_FONTS = [
  "Inter",
  "DM Sans",
  "Source Sans 3",
  "Roboto",
  "Open Sans",
  "Lato",
  "Noto Sans",
  "Manrope",
  "IBM Plex Sans",
  "Figtree",
  "Mulish",
  "Rubik",
  "Nunito Sans"
];
function pickFont(moodCategories) {
  const candidates = [];
  for (const cat of moodCategories) {
    if (FONT_CATEGORIES[cat]) candidates.push(...FONT_CATEGORIES[cat]);
  }
  if (candidates.length === 0) candidates.push(...FONT_CATEGORIES.sans);
  return candidates[Math.floor(Math.random() * candidates.length)];
}
function pickBodyFont(headingFont) {
  const scored = BODY_FONTS.filter((f) => f !== headingFont).map((f) => ({ font: f, score: pairingScore(headingFont, f) })).sort((a, b) => b.score - a.score);
  const top = scored.slice(0, 3);
  return top[Math.floor(Math.random() * top.length)]?.font || "Inter";
}
function rand(min, max) {
  return min + Math.random() * (max - min);
}
function randInt(min, max) {
  return Math.round(rand(min, max));
}
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function generateTemplate(mood, seedColor) {
  const moods2 = Object.keys(MOOD_PRESETS);
  const selectedMood = mood && MOOD_PRESETS[mood] ? mood : pick(moods2);
  const preset = MOOD_PRESETS[selectedMood];
  let primaryLch;
  if (seedColor) {
    primaryLch = hexToOklch2(seedColor);
  } else {
    let hue = rand(preset.hueRange[0], preset.hueRange[1]);
    if (hue >= 360) hue -= 360;
    const chroma = rand(preset.chromaRange[0], preset.chromaRange[1]);
    const lTarget = preset.primaryL ? rand(preset.primaryL[0], preset.primaryL[1]) : 0.55;
    primaryLch = { L: lTarget, C: chroma, H: hue };
  }
  primaryLch.L = Math.max(0.3, Math.min(0.72, primaryLch.L));
  const primaryHex = oklchToHex2(primaryLch);
  let secondaryHex, tertiaryHex;
  const harmo = preset.harmony;
  if (harmo === "analogous") {
    const [a, b] = analogous(primaryHex);
    secondaryHex = a;
    tertiaryHex = b;
  } else if (harmo === "triadic") {
    const [a, b] = triadic(primaryHex);
    secondaryHex = a;
    tertiaryHex = b;
  } else if (harmo === "splitComplementary") {
    const [a, b] = splitComplementary(primaryHex);
    secondaryHex = a;
    tertiaryHex = b;
  } else if (harmo === "tetradic") {
    const [a, b] = tetradic(primaryHex);
    secondaryHex = a;
    tertiaryHex = b;
  } else {
    secondaryHex = complementary(primaryHex);
    const tertLch2 = hexToOklch2(primaryHex);
    tertLch2.C *= 0.3;
    tertiaryHex = oklchToHex2(tertLch2);
  }
  const secLch = hexToOklch2(secondaryHex);
  secLch.L += rand(-0.12, 0.12);
  secLch.L = Math.max(0.3, Math.min(0.7, secLch.L));
  secLch.C *= rand(0.8, 1.2);
  secondaryHex = oklchToHex2(secLch);
  const tertLch = hexToOklch2(tertiaryHex);
  tertLch.C *= rand(0.35, 0.65);
  tertLch.L = rand(0.35, 0.55);
  tertiaryHex = oklchToHex2(tertLch);
  if (preset.forceAccent) {
    const accentLch = { ...primaryLch, C: rand(0.2, 0.3), L: rand(0.5, 0.65) };
    secondaryHex = oklchToHex2(accentLch);
    const greyLch = { L: 0.35, C: 5e-3, H: primaryLch.H };
    tertiaryHex = oklchToHex2(greyLch);
    primaryLch.L = 0.15;
    primaryLch.C = 5e-3;
  }
  let lightBg, darkBg;
  if (preset.darkFirst) {
    const bgL = rand(preset.lightBgL[0], preset.lightBgL[1]);
    const bgC = rand(preset.lightBgC[0], preset.lightBgC[1]);
    darkBg = oklchToHex2({ L: bgL, C: bgC, H: primaryLch.H });
    lightBg = deriveCounterpartBg(darkBg);
  } else {
    const bgL = rand(preset.lightBgL[0], preset.lightBgL[1]);
    const bgC = rand(preset.lightBgC[0], preset.lightBgC[1]);
    lightBg = oklchToHex2({ L: bgL, C: bgC, H: primaryLch.H });
    darkBg = deriveCounterpartBg(lightBg);
  }
  let finalPrimary = preset.forceAccent ? oklchToHex2({ ...primaryLch }) : primaryHex;
  const lightPalette = {
    bg: lightBg,
    primary: finalPrimary,
    secondary: secondaryHex,
    tertiary: tertiaryHex
  };
  const darkPalette = {
    bg: darkBg,
    primary: preset.forceAccent ? deriveDarkAccent(secondaryHex, darkBg) : deriveDarkAccent(finalPrimary, darkBg),
    secondary: deriveDarkAccent(secondaryHex, darkBg),
    tertiary: deriveDarkAccent(tertiaryHex, darkBg)
  };
  if (preset.forceAccent) {
    darkPalette.primary = oklchToHex2({ L: 0.9, C: 5e-3, H: primaryLch.H });
  }
  const { light, dark, contrastReport } = validatePalette(lightPalette, darkPalette);
  if (seedColor && !preset.forceAccent) {
    light.primary = seedColor;
  }
  const headingFont = pickFont(preset.fontMood);
  const bodyFont = pickBodyFont(headingFont);
  const radius = randInt(preset.radiusRange[0], preset.radiusRange[1]);
  const nameTokens = { bg: light.bg, primary: light.primary };
  const [name] = suggestNames(1, nameTokens);
  const displayName = name.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const template = {
    id: name,
    name: displayName,
    desc: `Generated ${selectedMood} template`,
    font: headingFont,
    bodyFont,
    radius: `${radius}px`,
    card: { word: displayName.split(" ")[0] },
    light,
    dark,
    status: { success: "#16a34a", warning: "#d97706", error: "#dc2626" },
    shadowStyle: preset.shadow,
    preview: [light.primary, light.secondary, light.tertiary, light.bg]
  };
  return { template, mood: selectedMood, contrastReport };
}
var AVAILABLE_MOODS = Object.keys(MOOD_PRESETS);

// src/utils/tokens.js
function initTokensFromTemplate(template) {
  const light = template.light ? { ...template.light } : null;
  const dark = { ...template.dark };
  const headingFont = template.font;
  const bodyFont = template.bodyFont || "DM Sans";
  return {
    baseTemplate: template.id,
    tintSurfaces: template.tintSurfaces,
    light,
    dark,
    status: { ...template.status },
    typography: {
      headingFont,
      bodyFont,
      scalePreset: "standard",
      baseSize: 16,
      headingWeight: fontWeights[headingFont]?.defaultHeading || 700,
      bodyWeight: fontWeights[bodyFont]?.defaultBody || 400,
      lineHeightHeading: fontWeights[headingFont]?.lineHeightHeading || 1.2,
      lineHeightBody: fontWeights[bodyFont]?.lineHeightBody || 1.5,
      trackingHeading: fontWeights[headingFont]?.trackingHeading || "-0.02em",
      trackingBody: fontWeights[bodyFont]?.trackingBody || "0em"
    },
    shape: {
      borderRadius: parseInt(template.radius),
      spacingUnit: 8,
      shadowStyle: template.shadowStyle || "soft",
      glowColor: template.glowColor || null
    }
  };
}

// src/data/templates.js
var templates = [
  {
    id: "warm-editorial",
    name: "Warm Editorial",
    desc: "Refined, editorial, expressive",
    font: "Playfair Display",
    bodyFont: "Source Sans 3",
    radius: "4px",
    card: { word: "Warm", italic: true },
    light: {
      bg: "#F5EFE0",
      primary: "#C4622D",
      secondary: "#d4853a",
      tertiary: "#6b5c4d"
    },
    dark: {
      bg: "#1a1510",
      primary: "#e06040",
      secondary: "#e09850",
      tertiary: "#8a7a6a"
    },
    status: { success: "#16a34a", warning: "#d97706", error: "#dc2626" },
    shadowStyle: "soft",
    preview: ["#C4622D", "#d4853a", "#6b5c4d", "#F5EFE0"]
  },
  {
    id: "crypto-web3",
    name: "Crypto Web3",
    desc: "Bold, decentralized, trustless",
    font: "Space Grotesk",
    bodyFont: "Space Grotesk",
    radius: "4px",
    previewDark: true,
    card: { word: "Crypto", topLeft: "\u25CF LIVE", topRight: "WEB3", topRightBadge: true },
    light: {
      bg: "#FFF8F0",
      primary: "#E8820A",
      secondary: "#627EEA",
      tertiary: "#8247E5"
    },
    dark: {
      bg: "#0A0F1E",
      primary: "#F7931A",
      secondary: "#627EEA",
      tertiary: "#8247E5"
    },
    status: { success: "#16a34a", warning: "#d97706", error: "#dc2626" },
    shadowStyle: "hard",
    preview: ["#F7931A", "#627EEA", "#8247E5", "#0A0F1E"]
  },
  {
    id: "soft-consumer",
    name: "Soft Consumer",
    desc: "Gentle, approachable, friendly",
    font: "Nunito",
    bodyFont: "Nunito",
    radius: "16px",
    card: { word: "Soft", centered: true },
    light: {
      bg: "#F0EAFF",
      primary: "#7C5CBF",
      secondary: "#e05aad",
      tertiary: "#5b8ad0"
    },
    dark: {
      bg: "#10081e",
      primary: "#9678d3",
      secondary: "#e870be",
      tertiary: "#6e9ae0"
    },
    status: { success: "#16a34a", warning: "#d97706", error: "#dc2626" },
    shadowStyle: "soft",
    preview: ["#7C5CBF", "#e05aad", "#5b8ad0", "#F0EAFF"]
  },
  {
    id: "nordic-minimal",
    name: "Nordic Minimal",
    desc: "Pure, spacious, timeless",
    font: "Cormorant Garamond",
    bodyFont: "Inter",
    radius: "2px",
    card: { word: "Nordic", overflow: true },
    light: {
      bg: "#FAFAF8",
      primary: "#1A1A18",
      secondary: "#6b7280",
      tertiary: "#4b5563"
    },
    dark: {
      bg: "#0e0e0d",
      primary: "#e8e8e6",
      secondary: "#9ca3af",
      tertiary: "#9ca3af"
    },
    status: { success: "#16a34a", warning: "#d97706", error: "#dc2626" },
    shadowStyle: "soft",
    preview: ["#1A1A18", "#6b7280", "#4b5563", "#FAFAF8"]
  },
  {
    id: "bold-agency",
    name: "Bold Agency",
    desc: "Striking, confident, creative",
    font: "Syne",
    bodyFont: "DM Sans",
    radius: "0px",
    tintSurfaces: false,
    card: { word: "BOLD", overflow: true, border: true },
    light: {
      bg: "#F5FF00",
      primary: "#000000",
      secondary: "#e00050",
      tertiary: "#0050e0"
    },
    dark: {
      bg: "#0a0a0a",
      primary: "#f5f500",
      secondary: "#ff3070",
      tertiary: "#3080ff"
    },
    status: { success: "#22c55e", warning: "#eab308", error: "#ef4444" },
    shadowStyle: "hard",
    preview: ["#000000", "#e00050", "#0050e0", "#F5FF00"]
  },
  {
    id: "startup-playful",
    name: "Startup Playful",
    desc: "Energetic, vibrant, SaaS-native",
    font: "Space Grotesk",
    bodyFont: "Figtree",
    radius: "14px",
    card: { word: "Startup", topLeft: "\u25CF", topRight: "NEW" },
    light: {
      bg: "#EEF0FF",
      primary: "#4F5CE8",
      secondary: "#00B894",
      tertiary: "#FD79A8"
    },
    dark: {
      bg: "#0c0a1a",
      primary: "#A29BFE",
      secondary: "#55EFC4",
      tertiary: "#FD79A8"
    },
    status: { success: "#00B894", warning: "#FDCB6E", error: "#D63031" },
    shadowStyle: "soft",
    preview: ["#4F5CE8", "#00B894", "#FD79A8", "#EEF0FF"]
  },
  {
    id: "midnight-saas",
    name: "Midnight SaaS",
    desc: "Dark, refined, precise",
    font: "Raleway",
    bodyFont: "Inter",
    radius: "8px",
    previewDark: true,
    card: { word: "Midnight", topLeft: "\u25A1 Midnight" },
    light: {
      bg: "#F5F6FA",
      primary: "#4A58B8",
      secondary: "#38BDF8",
      tertiary: "#A78BFA"
    },
    dark: {
      bg: "#0D0F14",
      primary: "#5B6AD0",
      secondary: "#38BDF8",
      tertiary: "#A78BFA"
    },
    status: { success: "#16a34a", warning: "#d97706", error: "#dc2626" },
    shadowStyle: "soft",
    preview: ["#5B6AD0", "#38BDF8", "#A78BFA", "#0D0F14"]
  },
  {
    id: "fintech-dark",
    name: "Sharp Fintech",
    desc: "Dark, precise, data-driven",
    font: "DM Mono",
    bodyFont: "DM Sans",
    radius: "4px",
    previewDark: true,
    card: { word: "Sharp", topLeft: "V2.4.1" },
    light: {
      bg: "#f5f5f3",
      primary: "#00C96B",
      secondary: "#0a5c30",
      tertiary: "#1a3a28"
    },
    dark: {
      bg: "#080E0B",
      primary: "#00C96B",
      secondary: "#0a5c30",
      tertiary: "#1a3a28"
    },
    status: { success: "#16a34a", warning: "#d97706", error: "#dc2626" },
    shadowStyle: "none",
    preview: ["#00C96B", "#0a5c30", "#1a3a28", "#080E0B"]
  },
  {
    id: "clean-saas",
    name: "Clean SaaS",
    desc: "Neutral, professional, scalable",
    font: "Plus Jakarta Sans",
    bodyFont: "Inter",
    radius: "8px",
    card: { word: "Clean", topBars: true },
    light: {
      bg: "#FFFFFF",
      primary: "#2563EB",
      secondary: "#3b82f6",
      tertiary: "#818cf8"
    },
    dark: {
      bg: "#0a0e1a",
      primary: "#3b82f6",
      secondary: "#fbbf24",
      tertiary: "#818cf8"
    },
    status: { success: "#16a34a", warning: "#d97706", error: "#dc2626" },
    shadowStyle: "soft",
    preview: ["#2563EB", "#3b82f6", "#818cf8", "#FFFFFF"]
  },
  {
    id: "obsidian-amber",
    name: "Obsidian Amber",
    desc: "Luxurious, editorial, premium-dark",
    font: "DM Serif Display",
    bodyFont: "Manrope",
    radius: "6px",
    previewDark: true,
    card: { word: "Obsidian", italic: true },
    light: {
      bg: "#FDF8F0",
      primary: "#A0720A",
      secondary: "#C4922A",
      tertiary: "#6B4E1A"
    },
    dark: {
      bg: "#090705",
      primary: "#C8922A",
      secondary: "#E8B050",
      tertiary: "#7A5A18"
    },
    status: { success: "#16a34a", warning: "#d97706", error: "#dc2626" },
    shadowStyle: "soft",
    preview: ["#C8922A", "#E8B050", "#7A5A18", "#090705"]
  },
  {
    id: "bloom",
    name: "Bloom",
    desc: "Warm, inviting, lifestyle-ready",
    font: "Nunito",
    bodyFont: "Figtree",
    radius: "20px",
    card: { word: "Bloom", centered: true },
    light: {
      bg: "#FFF7F5",
      primary: "#E8445A",
      secondary: "#FF8C69",
      tertiary: "#B5446E"
    },
    dark: {
      bg: "#18090D",
      primary: "#FF6B7A",
      secondary: "#FF9B7A",
      tertiary: "#C4557A"
    },
    status: { success: "#16a34a", warning: "#d97706", error: "#dc2626" },
    shadowStyle: "soft",
    preview: ["#E8445A", "#FF8C69", "#B5446E", "#FFF7F5"]
  },
  {
    id: "brutalist-indie",
    name: "Brutalist Indie",
    desc: "Raw, unpolished, anti-design",
    font: "Space Mono",
    bodyFont: "Space Mono",
    radius: "0px",
    card: { word: "BRUT_", topLeft: "FILE_001.SYS", border: true, rule: true },
    light: {
      bg: "#F0F0EE",
      primary: "#000000",
      secondary: "#FF0000",
      tertiary: "#333333"
    },
    dark: {
      bg: "#000000",
      primary: "#ffffff",
      secondary: "#FF0000",
      tertiary: "#aaaaaa"
    },
    status: { success: "#00FF00", warning: "#FFFF00", error: "#FF0000" },
    shadowStyle: "hard",
    preview: ["#000000", "#FF0000", "#333333", "#F0F0EE"]
  }
];

// src/utils/exportGenerators.js
var SKIP_KEYS = /* @__PURE__ */ new Set([
  "primary-subtle",
  "text-on-primary",
  "secondary-subtle",
  "text-on-secondary",
  "tertiary-subtle",
  "text-on-tertiary",
  "success-subtle",
  "warning-subtle",
  "error-subtle"
]);
var SHADCN_MAP = {
  "bg": "background",
  "bg-surface": "card",
  "bg-elevated": "popover",
  "text": "foreground",
  "text-muted": "muted-foreground",
  "primary": "primary",
  "primary-on": "primary-foreground",
  "secondary-on": "secondary-foreground",
  "error": "destructive",
  "error-on": "destructive-foreground",
  "border-default": "border"
};
var SHADCN_EXTRAS = [
  ["card-foreground", "text"],
  ["popover-foreground", "text"],
  ["muted", "bg-surface"],
  ["accent", "bg-surface"],
  ["accent-foreground", "text"],
  ["input", "border-default"],
  ["ring", "primary"]
];
function transformVarName(key, convention, customPrefix) {
  if (convention === "shadcn") {
    const mapped = SHADCN_MAP[key];
    return `--${mapped || key}`;
  }
  if (convention === "custom") return `--${customPrefix}-${key}`;
  return `--color-${key}`;
}
var SYSTEM_FONTS = /* @__PURE__ */ new Set([
  "Inter",
  "System UI",
  "Arial",
  "Helvetica",
  "Helvetica Neue",
  "Segoe UI",
  "Roboto",
  "SF Pro",
  "SF Pro Display"
]);
function getTemplateName(tokens) {
  const t = templates.find((t2) => t2.id === tokens.baseTemplate);
  return t ? t.name : "Custom";
}
function buildFontImports(tokens) {
  const h = tokens.typography.headingFont;
  const b = tokens.typography.bodyFont;
  const hw = tokens.typography.headingWeight || 700;
  const bw = tokens.typography.bodyWeight || 400;
  const families = /* @__PURE__ */ new Map();
  if (!SYSTEM_FONTS.has(h)) {
    families.set(h, /* @__PURE__ */ new Set([hw]));
  }
  if (!SYSTEM_FONTS.has(b)) {
    if (families.has(b)) {
      families.get(b).add(bw);
    } else {
      families.set(b, /* @__PURE__ */ new Set([bw]));
    }
  }
  if (families.size === 0) return [];
  const params = [...families.entries()].map(([font, weights]) => `family=${font.replace(/ /g, "+")}:wght@${[...weights].sort().join(";")}`).join("&");
  return [`@import url("https://fonts.googleapis.com/css2?${params}&display=swap");`];
}
function buildHeader(tokens, format) {
  const name = getTemplateName(tokens);
  return [
    `/* ${name} \u2014 ${format}`,
    ` * Generated by tokven.dev`,
    ` */`
  ].join("\n");
}
function deriveColors(tokens, dark) {
  const palette = dark ? tokens.dark : tokens.light || tokens.dark;
  const { colors } = deriveAllTokens({
    bg: palette.bg,
    primary: palette.primary,
    secondary: palette.secondary || null,
    tertiary: palette.tertiary || null,
    ...tokens.status
  });
  return colors;
}
function colorEntries(colors) {
  const order = [
    // Background
    "bg",
    "bg-surface",
    "bg-elevated",
    "border-subtle",
    "border-default",
    "border-strong",
    // Text
    "text",
    "text-muted",
    "text-subtle",
    // Primary
    "primary",
    "primary-on",
    "primary-container",
    "primary-on-container",
    "primary-hover",
    "primary-active",
    "primary-border",
    "primary-text",
    "primary-shadow",
    // Secondary
    "secondary",
    "secondary-on",
    "secondary-container",
    "secondary-on-container",
    "secondary-hover",
    "secondary-active",
    "secondary-border",
    "secondary-text",
    // Tertiary
    "tertiary",
    "tertiary-on",
    "tertiary-container",
    "tertiary-on-container",
    "tertiary-hover",
    "tertiary-active",
    "tertiary-border",
    "tertiary-text",
    // Status
    "success",
    "success-on",
    "success-container",
    "success-on-container",
    "success-text",
    "warning",
    "warning-on",
    "warning-container",
    "warning-on-container",
    "warning-text",
    "error",
    "error-on",
    "error-container",
    "error-on-container",
    "error-text"
  ];
  return order.filter((k) => k in colors && !SKIP_KEYS.has(k)).map((k) => [k, colors[k]]);
}
function groupedColorLines(entries, indent, convention = "default", customPrefix = "") {
  const groups = {
    bg: "Background",
    text: "Text",
    primary: "Primary",
    secondary: "Secondary",
    tertiary: "Tertiary",
    success: "Success",
    warning: "Warning",
    error: "Error"
  };
  const lines = [];
  let lastGroup = null;
  for (const [key, value] of entries) {
    const group = key.split("-")[0];
    const resolvedGroup = group === "border" && (key.startsWith("border-subtle") || key.startsWith("border-default") || key.startsWith("border-strong")) ? "bg" : group;
    if (resolvedGroup !== lastGroup && groups[resolvedGroup]) {
      if (lines.length > 0) lines.push("");
      lines.push(`${indent}/* ${groups[resolvedGroup]} */`);
      lastGroup = resolvedGroup;
    }
    const varName = transformVarName(key, convention, customPrefix);
    lines.push(`${indent}${varName}: ${value};`);
  }
  return lines;
}
function shadcnExtraLines(colors, indent) {
  const lines = [];
  lines.push("");
  lines.push(`${indent}/* shadcn/ui compatibility */`);
  for (const [name, sourceKey] of SHADCN_EXTRAS) {
    if (colors[sourceKey]) {
      lines.push(`${indent}--${name}: ${colors[sourceKey]};`);
    }
  }
  return lines;
}
function deriveTypeEntries(tokens) {
  const t = tokens.typography;
  const scale = deriveTypeScale(t.baseSize, t.scalePreset, t.headingFont, t.bodyFont);
  return scale.levels;
}
function deriveShapeEntries(tokens) {
  return deriveShapeScale(tokens.shape.borderRadius, tokens.shape.spacingUnit);
}
function deriveShadowEntries(tokens, dark) {
  const palette = dark ? tokens.dark : tokens.light || tokens.dark;
  const style = tokens.shape.shadowStyle || "soft";
  const glowColor = style === "glow" ? tokens.shape.glowColor || palette.primary : null;
  return deriveShadowScale(palette.bg, style, glowColor);
}
function shadowLines(shadows, indent) {
  const keys = ["shadow-color", "shadow-sm", "shadow-md", "shadow-lg"];
  const lines = [];
  lines.push("");
  lines.push(`${indent}/* Shadows */`);
  for (const k of keys) {
    if (k in shadows) {
      lines.push(`${indent}--${k}: ${shadows[k]};`);
    }
  }
  return lines;
}
function fontFallback(font) {
  const lower = font.toLowerCase();
  if (lower.includes("mono")) return "monospace";
  if (lower.includes("serif") && !lower.includes("sans")) return "serif";
  return "sans-serif";
}
function varRef(key, convention, customPrefix) {
  return `var(${transformVarName(key, convention, customPrefix)})`;
}
function generateCSS(tokens, { includeLight, includeDark, namingConvention = "default", customPrefix = "", darkModeStrategy = "class" }) {
  const fontImports = buildFontImports(tokens);
  const lines = [...fontImports, "", buildHeader(tokens, "CSS Custom Properties"), ""];
  const t = tokens.typography;
  const levels = deriveTypeEntries(tokens);
  const shape = deriveShapeEntries(tokens);
  const nc = namingConvention;
  const cp = customPrefix;
  const writeBlock = (selector, colors, isDark2) => {
    const entries = colorEntries(colors);
    lines.push(`${selector} {`);
    lines.push(...groupedColorLines(entries, "  ", nc, cp));
    if (nc === "shadcn") lines.push(...shadcnExtraLines(colors, "  "));
    lines.push("");
    lines.push("  /* Typography */");
    lines.push(`  --font-heading: "${t.headingFont}", ${fontFallback(t.headingFont)};`);
    lines.push(`  --font-body: "${t.bodyFont}", ${fontFallback(t.bodyFont)};`);
    lines.push(`  --font-weight-heading: ${t.headingWeight};`);
    lines.push(`  --font-weight-body: ${t.bodyWeight};`);
    lines.push("");
    lines.push("  /* Type Scale */");
    for (const [name, def] of Object.entries(levels)) {
      lines.push(`  --text-${name}: ${def.size}px;`);
      lines.push(`  --text-${name}-line-height: ${def.lineHeight};`);
      lines.push(`  --text-${name}-letter-spacing: ${def.tracking};`);
    }
    lines.push("");
    lines.push("  /* Border Radius */");
    if (nc === "shadcn") lines.push(`  --radius: ${shape["radius-md"]}px;`);
    lines.push(`  --radius-xs: ${shape["radius-xs"]}px;`);
    lines.push(`  --radius-sm: ${shape["radius-sm"]}px;`);
    lines.push(`  --radius-md: ${shape["radius-md"]}px;`);
    lines.push(`  --radius-lg: ${shape["radius-lg"]}px;`);
    lines.push(`  --radius-full: ${shape["radius-full"]}px;`);
    lines.push("");
    lines.push("  /* Spacing */");
    for (const [step, value] of Object.entries(shape.spacing)) {
      lines.push(`  --spacing-${step}: ${value}px;`);
    }
    const shadows = deriveShadowEntries(tokens, isDark2);
    lines.push(...shadowLines(shadows, "  "));
    lines.push("}");
  };
  if (darkModeStrategy === "separate") {
    const lightLines = [...fontImports, "", buildHeader(tokens, "CSS Custom Properties \u2014 Light"), ""];
    const darkLines = [...fontImports, "", buildHeader(tokens, "CSS Custom Properties \u2014 Dark"), ""];
    if (tokens.light) {
      const lightColors = deriveColors(tokens, false);
      const lightEntries = colorEntries(lightColors);
      lightLines.push(":root {");
      lightLines.push(...groupedColorLines(lightEntries, "  ", nc, cp));
      if (nc === "shadcn") lightLines.push(...shadcnExtraLines(lightColors, "  "));
      lightLines.push("");
      lightLines.push("  /* Typography */");
      lightLines.push(`  --font-heading: "${t.headingFont}", ${fontFallback(t.headingFont)};`);
      lightLines.push(`  --font-body: "${t.bodyFont}", ${fontFallback(t.bodyFont)};`);
      lightLines.push(`  --font-weight-heading: ${t.headingWeight};`);
      lightLines.push(`  --font-weight-body: ${t.bodyWeight};`);
      lightLines.push("");
      lightLines.push("  /* Type Scale */");
      for (const [name, def] of Object.entries(levels)) {
        lightLines.push(`  --text-${name}: ${def.size}px;`);
        lightLines.push(`  --text-${name}-line-height: ${def.lineHeight};`);
        lightLines.push(`  --text-${name}-letter-spacing: ${def.tracking};`);
      }
      lightLines.push("");
      lightLines.push("  /* Border Radius */");
      if (nc === "shadcn") lightLines.push(`  --radius: ${shape["radius-md"]}px;`);
      lightLines.push(`  --radius-xs: ${shape["radius-xs"]}px;`);
      lightLines.push(`  --radius-sm: ${shape["radius-sm"]}px;`);
      lightLines.push(`  --radius-md: ${shape["radius-md"]}px;`);
      lightLines.push(`  --radius-lg: ${shape["radius-lg"]}px;`);
      lightLines.push(`  --radius-full: ${shape["radius-full"]}px;`);
      lightLines.push("");
      lightLines.push("  /* Spacing */");
      for (const [step, value] of Object.entries(shape.spacing)) {
        lightLines.push(`  --spacing-${step}: ${value}px;`);
      }
      const lightShadows = deriveShadowEntries(tokens, false);
      lightLines.push(...shadowLines(lightShadows, "  "));
      lightLines.push("}");
    }
    const darkColors = deriveColors(tokens, true);
    const darkEntries = colorEntries(darkColors);
    darkLines.push(":root {");
    darkLines.push(...groupedColorLines(darkEntries, "  ", nc, cp));
    if (nc === "shadcn") darkLines.push(...shadcnExtraLines(darkColors, "  "));
    darkLines.push("");
    darkLines.push("  /* Typography */");
    darkLines.push(`  --font-heading: "${t.headingFont}", ${fontFallback(t.headingFont)};`);
    darkLines.push(`  --font-body: "${t.bodyFont}", ${fontFallback(t.bodyFont)};`);
    darkLines.push(`  --font-weight-heading: ${t.headingWeight};`);
    darkLines.push(`  --font-weight-body: ${t.bodyWeight};`);
    darkLines.push("");
    darkLines.push("  /* Type Scale */");
    for (const [name, def] of Object.entries(levels)) {
      darkLines.push(`  --text-${name}: ${def.size}px;`);
      darkLines.push(`  --text-${name}-line-height: ${def.lineHeight};`);
      darkLines.push(`  --text-${name}-letter-spacing: ${def.tracking};`);
    }
    darkLines.push("");
    darkLines.push("  /* Border Radius */");
    if (nc === "shadcn") darkLines.push(`  --radius: ${shape["radius-md"]}px;`);
    darkLines.push(`  --radius-xs: ${shape["radius-xs"]}px;`);
    darkLines.push(`  --radius-sm: ${shape["radius-sm"]}px;`);
    darkLines.push(`  --radius-md: ${shape["radius-md"]}px;`);
    darkLines.push(`  --radius-lg: ${shape["radius-lg"]}px;`);
    darkLines.push(`  --radius-full: ${shape["radius-full"]}px;`);
    darkLines.push("");
    darkLines.push("  /* Spacing */");
    for (const [step, value] of Object.entries(shape.spacing)) {
      darkLines.push(`  --spacing-${step}: ${value}px;`);
    }
    const darkShadowsSep = deriveShadowEntries(tokens, true);
    darkLines.push(...shadowLines(darkShadowsSep, "  "));
    darkLines.push("}");
    lightLines.push("");
    darkLines.push("");
    return { light: lightLines.join("\n"), dark: darkLines.join("\n") };
  }
  if (darkModeStrategy === "dark-only") {
    const darkColors = deriveColors(tokens, true);
    writeBlock(":root", darkColors, true);
    lines.push("");
    return lines.join("\n");
  }
  if (includeLight && tokens.light) {
    const lightColors = deriveColors(tokens, false);
    writeBlock(":root", lightColors, false);
  }
  if (includeDark) {
    const darkColors = deriveColors(tokens, true);
    if (includeLight && tokens.light) {
      const darkShadows = deriveShadowEntries(tokens, true);
      lines.push("");
      lines.push(".dark {");
      const entries = colorEntries(darkColors);
      lines.push(...groupedColorLines(entries, "  ", nc, cp));
      if (nc === "shadcn") lines.push(...shadcnExtraLines(darkColors, "  "));
      lines.push(...shadowLines(darkShadows, "  "));
      lines.push("}");
    } else {
      writeBlock(":root", darkColors, true);
    }
  }
  lines.push("");
  return lines.join("\n");
}
function generateTailwindV4(tokens, { includeLight, includeDark, namingConvention = "default", customPrefix = "", darkModeStrategy = "class" }) {
  const fontImports = buildFontImports(tokens);
  const t = tokens.typography;
  const levels = deriveTypeEntries(tokens);
  const shape = deriveShapeEntries(tokens);
  const nc = namingConvention;
  const cp = customPrefix;
  const buildThemeBlock = (colors, isDark2) => {
    const block = [];
    block.push("@theme {");
    if (nc === "default") {
      block.push("  /* Clear default colors */");
      block.push("  --color-*: initial;");
      block.push("");
    }
    const entries = colorEntries(colors);
    block.push(...groupedColorLines(entries, "  ", nc, cp));
    if (nc === "shadcn") block.push(...shadcnExtraLines(colors, "  "));
    block.push("");
    block.push("  /* Font Families */");
    block.push(`  --font-heading: "${t.headingFont}", ${fontFallback(t.headingFont)};`);
    block.push(`  --font-body: "${t.bodyFont}", ${fontFallback(t.bodyFont)};`);
    block.push("");
    block.push("  /* Type Scale */");
    for (const [name, def] of Object.entries(levels)) {
      block.push(`  --text-${name}: ${def.size}px;`);
      block.push(`  --text-${name}-line-height: ${def.lineHeight};`);
      block.push(`  --text-${name}-letter-spacing: ${def.tracking};`);
    }
    block.push("");
    block.push("  /* Border Radius */");
    if (nc === "shadcn") block.push(`  --radius: ${shape["radius-md"]}px;`);
    block.push(`  --radius-xs: ${shape["radius-xs"]}px;`);
    block.push(`  --radius-sm: ${shape["radius-sm"]}px;`);
    block.push(`  --radius-md: ${shape["radius-md"]}px;`);
    block.push(`  --radius-lg: ${shape["radius-lg"]}px;`);
    block.push(`  --radius-full: ${shape["radius-full"]}px;`);
    block.push("");
    block.push("  /* Spacing */");
    for (const [step, value] of Object.entries(shape.spacing)) {
      block.push(`  --spacing-${step}: ${value}px;`);
    }
    const shadows = deriveShadowEntries(tokens, isDark2);
    block.push(...shadowLines(shadows, "  "));
    block.push("}");
    return block;
  };
  if (darkModeStrategy === "separate") {
    const lightHeader = buildHeader(tokens, "Tailwind v4 @theme \u2014 Light");
    const darkHeader = buildHeader(tokens, "Tailwind v4 @theme \u2014 Dark");
    const lightLines = ['@import "tailwindcss";', "", ...fontImports, "", lightHeader, ""];
    const darkLines = ['@import "tailwindcss";', "", ...fontImports, "", darkHeader, ""];
    if (tokens.light) {
      const lightColors = deriveColors(tokens, false);
      lightLines.push(...buildThemeBlock(lightColors, false));
    }
    const darkColors = deriveColors(tokens, true);
    darkLines.push(...buildThemeBlock(darkColors, true));
    lightLines.push("");
    darkLines.push("");
    return { light: lightLines.join("\n"), dark: darkLines.join("\n") };
  }
  const header = buildHeader(tokens, "Tailwind v4 @theme");
  const lines = ['@import "tailwindcss";', "", ...fontImports, "", header, ""];
  if (darkModeStrategy === "dark-only") {
    const darkColors = deriveColors(tokens, true);
    lines.push(...buildThemeBlock(darkColors, true));
    lines.push("");
    return lines.join("\n");
  }
  const isPrimaryDark = !(includeLight && tokens.light);
  const primaryColors = isPrimaryDark ? deriveColors(tokens, true) : deriveColors(tokens, false);
  lines.push(...buildThemeBlock(primaryColors, isPrimaryDark));
  if (includeLight && tokens.light && includeDark) {
    const darkColors = deriveColors(tokens, true);
    const darkEntries = colorEntries(darkColors);
    const darkShadows = deriveShadowEntries(tokens, true);
    lines.push("");
    lines.push("@layer base {");
    lines.push("  .dark {");
    lines.push(...groupedColorLines(darkEntries, "    ", nc, cp));
    if (nc === "shadcn") lines.push(...shadcnExtraLines(darkColors, "    "));
    lines.push(...shadowLines(darkShadows, "    "));
    lines.push("  }");
    lines.push("}");
  }
  lines.push("");
  return lines.join("\n");
}
function generateTailwindV3(tokens, { includeLight, includeDark, namingConvention = "default", customPrefix = "", darkModeStrategy = "class" }) {
  const t = tokens.typography;
  const levels = deriveTypeEntries(tokens);
  const shape = deriveShapeEntries(tokens);
  const nc = namingConvention;
  const cp = customPrefix;
  const sampleColors = deriveColors(tokens, tokens.light ? false : true);
  const colorGroups = {};
  colorGroups.bg = {
    DEFAULT: varRef("bg", nc, cp),
    surface: varRef("bg-surface", nc, cp),
    elevated: varRef("bg-elevated", nc, cp)
  };
  colorGroups.border = {
    subtle: varRef("border-subtle", nc, cp),
    DEFAULT: varRef("border-default", nc, cp),
    strong: varRef("border-strong", nc, cp)
  };
  colorGroups.text = {
    DEFAULT: varRef("text", nc, cp),
    muted: varRef("text-muted", nc, cp),
    subtle: varRef("text-subtle", nc, cp)
  };
  const brandPattern = (prefix) => {
    const obj = {
      DEFAULT: varRef(prefix, nc, cp),
      on: varRef(`${prefix}-on`, nc, cp),
      container: varRef(`${prefix}-container`, nc, cp),
      "on-container": varRef(`${prefix}-on-container`, nc, cp),
      hover: varRef(`${prefix}-hover`, nc, cp),
      active: varRef(`${prefix}-active`, nc, cp),
      border: varRef(`${prefix}-border`, nc, cp),
      text: varRef(`${prefix}-text`, nc, cp)
    };
    if (prefix === "primary") obj.shadow = varRef(`${prefix}-shadow`, nc, cp);
    return obj;
  };
  colorGroups.primary = brandPattern("primary");
  if (sampleColors.secondary) colorGroups.secondary = brandPattern("secondary");
  if (sampleColors.tertiary) colorGroups.tertiary = brandPattern("tertiary");
  const statusPattern = (prefix) => ({
    DEFAULT: varRef(prefix, nc, cp),
    on: varRef(`${prefix}-on`, nc, cp),
    container: varRef(`${prefix}-container`, nc, cp),
    "on-container": varRef(`${prefix}-on-container`, nc, cp),
    text: varRef(`${prefix}-text`, nc, cp)
  });
  colorGroups.success = statusPattern("success");
  colorGroups.warning = statusPattern("warning");
  colorGroups.error = statusPattern("error");
  if (nc === "shadcn") {
    colorGroups.card = { DEFAULT: "var(--card)", foreground: "var(--card-foreground)" };
    colorGroups.popover = { DEFAULT: "var(--popover)", foreground: "var(--popover-foreground)" };
    colorGroups.muted = { DEFAULT: "var(--muted)", foreground: "var(--muted-foreground)" };
    colorGroups.accent = { DEFAULT: "var(--accent)", foreground: "var(--accent-foreground)" };
    colorGroups.input = { DEFAULT: "var(--input)" };
    colorGroups.ring = { DEFAULT: "var(--ring)" };
  }
  const fontSizes = {};
  for (const [name, def] of Object.entries(levels)) {
    fontSizes[name] = [`${def.size}px`, { lineHeight: String(def.lineHeight), letterSpacing: def.tracking }];
  }
  const json = (obj, depth = 0) => {
    const ind = "  ".repeat(depth + 4);
    const entries = Object.entries(obj);
    const parts = [];
    for (const [k, v] of entries) {
      const key = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : `"${k}"`;
      if (typeof v === "string") {
        parts.push(`${ind}${key}: "${v}",`);
      } else if (Array.isArray(v)) {
        const [size, opts] = v;
        parts.push(`${ind}${key}: ["${size}", { lineHeight: "${opts.lineHeight}", letterSpacing: "${opts.letterSpacing}" }],`);
      } else {
        parts.push(`${ind}${key}: {
${json(v, depth + 1)}
${ind}},`);
      }
    }
    return parts.join("\n");
  };
  const configLines = [];
  const header = buildHeader(tokens, "Tailwind v3 Config");
  configLines.push(header);
  configLines.push("");
  configLines.push("/** @type {import('tailwindcss').Config} */");
  configLines.push("export default {");
  configLines.push('  darkMode: ["class"],');
  configLines.push("  theme: {");
  configLines.push("    extend: {");
  configLines.push("      colors: {");
  configLines.push(json(colorGroups, 0));
  configLines.push("      },");
  configLines.push("      fontFamily: {");
  configLines.push(`        heading: ['"${t.headingFont}"', "${fontFallback(t.headingFont)}"],`);
  configLines.push(`        body: ['"${t.bodyFont}"', "${fontFallback(t.bodyFont)}"],`);
  configLines.push("      },");
  configLines.push("      fontSize: {");
  for (const [name, tuple] of Object.entries(fontSizes)) {
    const [size, opts] = tuple;
    configLines.push(`        ${name}: ["${size}", { lineHeight: "${opts.lineHeight}", letterSpacing: "${opts.letterSpacing}" }],`);
  }
  configLines.push("      },");
  configLines.push("      fontWeight: {");
  configLines.push(`        heading: "${t.headingWeight}",`);
  configLines.push(`        body: "${t.bodyWeight}",`);
  configLines.push("      },");
  configLines.push("      borderRadius: {");
  configLines.push(`        xs: "${shape["radius-xs"]}px",`);
  configLines.push(`        sm: "${shape["radius-sm"]}px",`);
  configLines.push(`        md: "${shape["radius-md"]}px",`);
  configLines.push(`        lg: "${shape["radius-lg"]}px",`);
  configLines.push(`        full: "${shape["radius-full"]}px",`);
  configLines.push("      },");
  configLines.push("      spacing: {");
  for (const [step, value] of Object.entries(shape.spacing)) {
    configLines.push(`        ${step}: "${value}px",`);
  }
  configLines.push("      },");
  configLines.push("      boxShadow: {");
  configLines.push('        sm: "var(--shadow-sm)",');
  configLines.push('        md: "var(--shadow-md)",');
  configLines.push('        lg: "var(--shadow-lg)",');
  configLines.push("      },");
  configLines.push("    },");
  configLines.push("  },");
  configLines.push("};");
  configLines.push("");
  const config = configLines.join("\n");
  const cssResult = generateCSS(tokens, { includeLight, includeDark, namingConvention, customPrefix, darkModeStrategy });
  const css = typeof cssResult === "string" ? cssResult : [cssResult.light, cssResult.dark].filter(Boolean).join("\n\n");
  return { config, css };
}
function generateDTCG(tokens, { includeLight, includeDark, darkModeStrategy = "class" }) {
  const t = tokens.typography;
  const levels = deriveTypeEntries(tokens);
  const shape = deriveShapeEntries(tokens);
  const name = getTemplateName(tokens);
  function buildTokenSet(colors, isDark2) {
    const obj = {
      $description: `${name} \u2014 W3C Design Tokens (DTCG)
Generated by tokven.dev`
    };
    obj.color = {};
    for (const [key, value] of colorEntries(colors)) {
      obj.color[key] = { $type: "color", $value: value };
    }
    obj.font = {
      heading: {
        $type: "fontFamily",
        $value: [t.headingFont, fontFallback(t.headingFont)]
      },
      body: {
        $type: "fontFamily",
        $value: [t.bodyFont, fontFallback(t.bodyFont)]
      },
      weight: {
        heading: { $type: "fontWeight", $value: Number(t.headingWeight) },
        body: { $type: "fontWeight", $value: Number(t.bodyWeight) }
      }
    };
    obj.text = {};
    for (const [level, def] of Object.entries(levels)) {
      const isHeading = level.startsWith("h") || level.startsWith("display");
      obj.text[level] = {
        $type: "typography",
        $value: {
          fontFamily: isHeading ? [t.headingFont, fontFallback(t.headingFont)] : [t.bodyFont, fontFallback(t.bodyFont)],
          fontSize: `${def.size}px`,
          fontWeight: isHeading ? Number(t.headingWeight) : Number(t.bodyWeight),
          lineHeight: def.lineHeight,
          letterSpacing: def.tracking
        }
      };
    }
    obj.radius = {
      xs: { $type: "dimension", $value: `${shape["radius-xs"]}px` },
      sm: { $type: "dimension", $value: `${shape["radius-sm"]}px` },
      md: { $type: "dimension", $value: `${shape["radius-md"]}px` },
      lg: { $type: "dimension", $value: `${shape["radius-lg"]}px` },
      full: { $type: "dimension", $value: `${shape["radius-full"]}px` }
    };
    obj.spacing = {};
    for (const [step, value] of Object.entries(shape.spacing)) {
      obj.spacing[step] = { $type: "dimension", $value: `${value}px` };
    }
    const shadows = deriveShadowEntries(tokens, isDark2);
    obj.shadow = {
      color: { $type: "color", $value: shadows["shadow-color"] },
      sm: { $type: "shadow", $value: shadows["shadow-sm"] },
      md: { $type: "shadow", $value: shadows["shadow-md"] },
      lg: { $type: "shadow", $value: shadows["shadow-lg"] }
    };
    return JSON.stringify(obj, null, 2);
  }
  if (darkModeStrategy === "separate") {
    const lightJson = tokens.light ? buildTokenSet(deriveColors(tokens, false), false) : null;
    const darkJson = buildTokenSet(deriveColors(tokens, true), true);
    return { light: lightJson, dark: darkJson };
  }
  if (darkModeStrategy === "dark-only" || !includeLight || !tokens.light) {
    return buildTokenSet(deriveColors(tokens, true), true);
  }
  const lightColors = deriveColors(tokens, false);
  const darkColors = deriveColors(tokens, true);
  const base = JSON.parse(buildTokenSet(lightColors, false));
  const darkColorObj = {};
  for (const [key, value] of colorEntries(darkColors)) {
    darkColorObj[key] = { $value: value };
  }
  const darkShadows = deriveShadowEntries(tokens, true);
  base.$extensions = {
    "dev.tokven.modes": {
      dark: {
        color: darkColorObj,
        shadow: {
          color: { $value: darkShadows["shadow-color"] },
          sm: { $value: darkShadows["shadow-sm"] },
          md: { $value: darkShadows["shadow-md"] },
          lg: { $value: darkShadows["shadow-lg"] }
        }
      }
    }
  };
  return JSON.stringify(base, null, 2);
}

// src/utils/generateTokenSystem.js
var SYSTEM_FONTS2 = /* @__PURE__ */ new Set([
  "Inter",
  "System UI",
  "Arial",
  "Helvetica",
  "Helvetica Neue",
  "Segoe UI",
  "Roboto",
  "SF Pro",
  "SF Pro Display"
]);
function buildFontImportUrl(headingFont, bodyFont, headingWeight, bodyWeight) {
  const families = /* @__PURE__ */ new Map();
  if (!SYSTEM_FONTS2.has(headingFont)) {
    families.set(headingFont, /* @__PURE__ */ new Set([headingWeight]));
  }
  if (!SYSTEM_FONTS2.has(bodyFont)) {
    if (families.has(bodyFont)) {
      families.get(bodyFont).add(bodyWeight);
    } else {
      families.set(bodyFont, /* @__PURE__ */ new Set([bodyWeight]));
    }
  }
  if (families.size === 0) return "";
  const params = [...families.entries()].map(([font, weights]) => `family=${font.replace(/ /g, "+")}:wght@${[...weights].sort().join(";")}`).join("&");
  return `https://fonts.googleapis.com/css2?${params}&display=swap`;
}
function generateTokenSystem({ hex, mood = "cool", headingFont, bodyFont, secondaryHex, tertiaryHex, colors = "all", namingConvention = "default" }) {
  mood = mood?.toLowerCase() ?? "cool";
  const { template, mood: resolvedMood } = generateTemplate(mood, hex);
  const tokens = initTokensFromTemplate(template);
  if (headingFont) {
    tokens.typography.headingFont = headingFont;
    tokens.typography.headingWeight = fontWeights[headingFont]?.defaultHeading || 700;
    tokens.typography.lineHeightHeading = fontWeights[headingFont]?.lineHeightHeading || 1.2;
    tokens.typography.trackingHeading = fontWeights[headingFont]?.trackingHeading || "-0.02em";
  }
  if (bodyFont) {
    tokens.typography.bodyFont = bodyFont;
    tokens.typography.bodyWeight = fontWeights[bodyFont]?.defaultBody || 400;
    tokens.typography.lineHeightBody = fontWeights[bodyFont]?.lineHeightBody || 1.5;
    tokens.typography.trackingBody = fontWeights[bodyFont]?.trackingBody || "0em";
  }
  if (secondaryHex) {
    if (tokens.light) tokens.light.secondary = secondaryHex;
    if (tokens.dark) tokens.dark.secondary = secondaryHex;
  }
  if (tertiaryHex) {
    if (tokens.light) tokens.light.tertiary = tertiaryHex;
    if (tokens.dark) tokens.dark.tertiary = tertiaryHex;
  }
  if (colors === "primary") {
    if (tokens.light) {
      tokens.light.secondary = null;
      tokens.light.tertiary = null;
    }
    if (tokens.dark) {
      tokens.dark.secondary = null;
      tokens.dark.tertiary = null;
    }
  } else if (colors === "primary-secondary") {
    if (tokens.light) tokens.light.tertiary = null;
    if (tokens.dark) tokens.dark.tertiary = null;
  }
  const lightPalette = tokens.light || tokens.dark;
  const darkPalette = tokens.dark;
  const lightColors = deriveAllTokens({
    bg: lightPalette.bg,
    primary: lightPalette.primary,
    secondary: lightPalette.secondary || null,
    tertiary: lightPalette.tertiary || null,
    tintSurfaces: tokens.tintSurfaces,
    ...tokens.status
  });
  const darkColors = deriveAllTokens({
    bg: darkPalette.bg,
    primary: darkPalette.primary,
    secondary: darkPalette.secondary || null,
    tertiary: darkPalette.tertiary || null,
    tintSurfaces: tokens.tintSurfaces,
    ...tokens.status
  });
  const css = generateCSS(tokens, {
    includeLight: !!tokens.light,
    includeDark: true,
    namingConvention
  });
  const h = tokens.typography.headingFont;
  const b = tokens.typography.bodyFont;
  const hw = tokens.typography.headingWeight;
  const bw = tokens.typography.bodyWeight;
  const importUrl = buildFontImportUrl(h, b, hw, bw);
  const lightContrast = validateContrast(lightColors.colors);
  const darkContrast = validateContrast(darkColors.colors);
  return {
    tokens: {
      light: lightColors.colors,
      dark: darkColors.colors,
      typography: tokens.typography,
      shape: tokens.shape
    },
    css,
    fonts: {
      heading: h,
      body: b,
      importUrl
    },
    contrast: {
      light: lightContrast,
      dark: darkContrast,
      summary: {
        light: `${lightContrast.filter((c) => c.pass).length}/${lightContrast.length} pass`,
        dark: `${darkContrast.filter((c) => c.pass).length}/${darkContrast.length} pass`
      }
    },
    mood: resolvedMood
  };
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = generateTokenSystem({ hex: "#7b5fff", mood: "dark" });
  const keys = ["tokens", "css", "fonts", "contrast", "mood"];
  const missing = keys.filter((k) => !(k in result));
  if (missing.length) {
    console.error("FAIL \u2014 missing keys:", missing);
    process.exit(1);
  }
  console.log(JSON.stringify({
    mood: result.mood,
    fonts: result.fonts,
    contrast: result.contrast.summary,
    cssLength: result.css.length,
    tokenKeys: {
      light: Object.keys(result.tokens.light).length,
      dark: Object.keys(result.tokens.dark).length,
      typography: Object.keys(result.tokens.typography),
      shape: Object.keys(result.tokens.shape)
    }
  }, null, 2));
  console.log("\nSMOKE TEST PASSED");
}

// mcp-server/index.js
import {
  useMode as useMode4,
  modeOklch as modeOklch4,
  modeRgb as modeRgb4,
  modeLrgb as modeLrgb4,
  parseHex as parseHex4,
  wcagContrast as wcagContrast3
} from "culori/fn";
import { sRGBtoY, APCAcontrast } from "apca-w3";
useMode4(modeOklch4);
useMode4(modeRgb4);
useMode4(modeLrgb4);
function normalizeHex(hex) {
  let h = hex.trim().replace(/^#/, "");
  if (/^[0-9a-f]{3}$/i.test(h)) {
    h = h.split("").map((c) => c + c).join("");
  }
  if (!/^[0-9a-f]{6}$/i.test(h)) return null;
  return "#" + h.toLowerCase();
}
function contrastRatio2(hex1, hex2) {
  const ratio = wcagContrast3(parseHex4(hex1), parseHex4(hex2));
  return Math.round(ratio * 100) / 100;
}
function hexToRgbArray(hex) {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function apcaContrast(fgHex, bgHex) {
  const txtY = sRGBtoY(hexToRgbArray(fgHex));
  const bgY = sRGBtoY(hexToRgbArray(bgHex));
  const Lc = APCAcontrast(txtY, bgY);
  return Math.round(Math.abs(Lc) * 100) / 100;
}
var MOOD_DESCRIPTIONS = {
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
  retro: "Warm saturated colors, 70s/80s display fonts"
};
var FORMAT_GENERATORS = {
  css: generateCSS,
  "tailwind-v4": generateTailwindV4,
  "tailwind-v3": generateTailwindV3,
  dtcg: generateDTCG
};
function generateOutput(tokens, format, namingConvention = "default") {
  const generator = FORMAT_GENERATORS[format] || generateCSS;
  return generator(tokens, { includeLight: !!tokens.light, includeDark: true, namingConvention });
}
function extractContrastDetail(checks, count = 5) {
  return checks.map((c) => ({
    label: c.label,
    fg: c.fgHex,
    bg: c.bgHex,
    ratio: c.ratio,
    required: c.required,
    margin: Math.round((c.ratio - c.required) * 100) / 100,
    pass: c.pass
  })).sort((a, b) => a.margin - b.margin).slice(0, count);
}
function fontPersonalityTags(fontName) {
  const m = fontWeights[fontName];
  if (!m) return [];
  const tags = [];
  if (m.stroke === "serif") tags.push("serif");
  else if (m.stroke === "mono") tags.push("monospace");
  else if (m.stroke === "display") tags.push("display");
  else tags.push("sans-serif");
  if (m.strokeContrast > 0.6) tags.push("refined");
  if (m.xHeight > 0.74) tags.push("readable");
  if (m.openness > 0.7) tags.push("friendly");
  if (m.width < 0.45) tags.push("compact");
  if (m.width > 0.55) tags.push("spacious");
  return tags;
}
function generateBrief(mood, result) {
  const m = mood || "cool";
  const moodDesc = MOOD_DESCRIPTIONS[m] || "";
  const primaryHex = result.tokens.light.primary;
  const bgHex = result.tokens.light.bg;
  const primaryRatio = contrastRatio2(primaryHex, bgHex);
  let colorBrief = `Primary ${primaryHex} against ${bgHex} has ${primaryRatio}:1 contrast. `;
  const hasSecondary = !!result.tokens.light.secondary;
  const hasTertiary = !!result.tokens.light.tertiary;
  if (hasSecondary && hasTertiary) {
    colorBrief += `Use primary for CTAs and key actions. Secondary (${result.tokens.light.secondary}) for supporting UI \u2014 tags, secondary buttons, category indicators. Tertiary (${result.tokens.light.tertiary}) for decorative accents and data visualization only.`;
  } else if (hasSecondary) {
    colorBrief += `Use primary for CTAs and key actions. Secondary (${result.tokens.light.secondary}) for supporting elements \u2014 secondary buttons, active states, category tags.`;
  } else {
    colorBrief += `Single-color system \u2014 use primary for all interactive elements. Use the derived primary-container for subtle backgrounds and primary-text for text links.`;
  }
  const darkMoods = /* @__PURE__ */ new Set(["dark", "neon", "brutalist"]);
  if (darkMoods.has(m)) {
    colorBrief += " The low-saturation backgrounds let the primary color command attention without competing.";
  }
  const h = result.fonts.heading;
  const b = result.fonts.body;
  const hMeta = fontWeights[h];
  const bMeta = fontWeights[b];
  const hTags = fontPersonalityTags(h);
  const bTags = fontPersonalityTags(b);
  const hWeight = result.tokens.typography?.headingWeight || hMeta?.defaultHeading || 700;
  const bWeight = result.tokens.typography?.bodyWeight || bMeta?.defaultBody || 400;
  let typoBrief = `${h} (${hTags.join(", ")}, weight ${hWeight}) for headings`;
  if (hMeta?.trackingHeading && hMeta.trackingHeading !== "0em") {
    typoBrief += ` with ${hMeta.trackingHeading} tracking`;
  }
  typoBrief += `. ${b} (${bTags.join(", ")}, weight ${bWeight}) for body text`;
  if (bMeta?.xHeight > 0.74) {
    typoBrief += ` \u2014 high x-height ensures readability at small sizes`;
  }
  typoBrief += ".";
  if (hMeta?.stroke === "display" || hMeta?.stroke === "serif") {
    typoBrief += ` Use ${h} for headlines only, not body text.`;
  }
  const radius = result.tokens.shape?.borderRadius ?? 8;
  const shadow = result.tokens.shape?.shadowStyle || "soft";
  let surfBrief = `${radius}px border radius with ${shadow} shadows \u2014 ${moodDesc.toLowerCase()}.`;
  if (shadow === "none" || shadow === "hard") {
    surfBrief += " Avoid soft drop shadows \u2014 they contradict the visual personality.";
  } else if (shadow === "glow") {
    surfBrief += " Use colored glow shadows derived from primary color for depth and brand reinforcement.";
  }
  if (radius >= 99) {
    surfBrief += " Pill radius on interactive elements (buttons, badges, inputs).";
  } else if (radius <= 2) {
    surfBrief += " Sharp corners are intentional \u2014 don't round to pill.";
  }
  return { colors: colorBrief, typography: typoBrief, surfaces: surfBrief };
}
function validateOptionalHex(hex, paramName) {
  if (!hex) return { norm: null, error: null };
  const norm = normalizeHex(hex);
  if (!norm) return { norm: null, error: `Invalid ${paramName}: expected #rrggbb or #rgb format.` };
  return { norm, error: null };
}
var server = new McpServer({
  name: "tokven-mcp",
  version: true ? "1.0.11" : "0.0.0-dev"
});
server.registerTool(
  "generate_tokens",
  {
    title: "Generate Design Tokens",
    description: "Generate a complete design token system from a brand hex color. Returns OKLCH-derived colors (light + dark mode), typography pairing, spacing scale, border radius, shadows, WCAG contrast validation, APCA scoring, design intent brief, and a visual preview URL on tokven.dev. Output in CSS, Tailwind v4, Tailwind v3, or DTCG JSON. Tip: call get_token_preview first to let the user approve the palette visually.",
    inputSchema: {
      hex: z.string().describe("Brand color as hex, e.g. #7b5fff or 7b5fff"),
      mood: z.string().optional().describe("Visual personality preset. One of: warm, cool, bold, dark, soft, minimal, brutalist, playful, vintage, luxury, nature, neon, corporate, retro. Defaults to cool."),
      heading_font: z.string().max(100).optional().describe("Override heading font family name"),
      body_font: z.string().max(100).optional().describe("Override body font family name"),
      format: z.enum(["css", "tailwind-v4", "tailwind-v3", "dtcg"]).optional().default("css").describe("Output format. Defaults to css."),
      colors: z.enum(["primary", "primary-secondary", "all"]).optional().default("all").describe("Scope of color output. 'primary' = primary only, 'primary-secondary' = primary + secondary, 'all' = full system (default)"),
      secondary_hex: z.string().optional().describe("Custom hex for secondary color. If omitted, secondary is auto-derived from primary. Accepts #rrggbb, #rgb, or without #."),
      tertiary_hex: z.string().optional().describe("Custom hex for tertiary color. If omitted, tertiary is auto-derived from primary. Accepts #rrggbb, #rgb, or without #."),
      naming: z.enum(["default", "shadcn"]).optional().default("default").describe("Token naming convention. 'shadcn' maps names to shadcn/ui conventions (bg\u2192background, text\u2192foreground, primary-on\u2192primary-foreground, etc.). Defaults to 'default'.")
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true
    }
  },
  async ({ hex, mood, heading_font, body_font, format, colors, secondary_hex, tertiary_hex, naming }) => {
    const normalizedHex = normalizeHex(hex);
    if (!normalizedHex) {
      return { content: [{ type: "text", text: JSON.stringify({ error: "Invalid hex color. Expected #rgb or #rrggbb format." }) }] };
    }
    const sec = validateOptionalHex(secondary_hex, "secondary_hex");
    if (sec.error) return { content: [{ type: "text", text: JSON.stringify({ error: sec.error }) }] };
    const ter = validateOptionalHex(tertiary_hex, "tertiary_hex");
    if (ter.error) return { content: [{ type: "text", text: JSON.stringify({ error: ter.error }) }] };
    const namingConvention = naming || "default";
    const result = generateTokenSystem({
      hex: normalizedHex,
      mood: mood || "cool",
      headingFont: heading_font,
      bodyFont: body_font,
      secondaryHex: sec.norm,
      tertiaryHex: ter.norm,
      colors: colors || "all",
      namingConvention
    });
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
      if (sec.norm) {
        if (tokens.light) tokens.light.secondary = sec.norm;
        if (tokens.dark) tokens.dark.secondary = sec.norm;
      }
      if (ter.norm) {
        if (tokens.light) tokens.light.tertiary = ter.norm;
        if (tokens.dark) tokens.dark.tertiary = ter.norm;
      }
      if (colors === "primary") {
        if (tokens.light) {
          tokens.light.secondary = null;
          tokens.light.tertiary = null;
        }
        if (tokens.dark) {
          tokens.dark.secondary = null;
          tokens.dark.tertiary = null;
        }
      } else if (colors === "primary-secondary") {
        if (tokens.light) tokens.light.tertiary = null;
        if (tokens.dark) tokens.dark.tertiary = null;
      }
      output = generateOutput(tokens, format, namingConvention);
    }
    const response = {
      css: output,
      fonts: result.fonts,
      contrast: result.contrast.summary,
      contrast_detail: {
        light: extractContrastDetail(result.contrast.light),
        dark: extractContrastDetail(result.contrast.dark)
      },
      brief: generateBrief(mood || "cool", result),
      mood: result.mood,
      format: format || "css",
      naming: namingConvention,
      url: `https://tokven.dev/?hex=${normalizedHex.replace("#", "")}&mood=${mood || "cool"}`
    };
    return { content: [{ type: "text", text: JSON.stringify(response, null, 2) }] };
  }
);
server.registerTool(
  "get_token_preview",
  {
    title: "Preview Design Tokens",
    description: "Quick preview of a design token system without full CSS output. Returns colors for light and/or dark mode, font pairing, radius, shadow style, WCAG contrast summary with near-failing pairs, design intent brief, and a visual preview URL on tokven.dev. Recommended first step: call this before generate_tokens so the user can approve the palette visually.",
    inputSchema: {
      hex: z.string().describe("Brand color hex"),
      mood: z.string().optional().describe("Mood preset"),
      heading_font: z.string().max(100).optional().describe("Override heading font family name"),
      body_font: z.string().max(100).optional().describe("Override body font family name"),
      secondary_hex: z.string().optional().describe("Custom hex for secondary color. Auto-derived if omitted."),
      tertiary_hex: z.string().optional().describe("Custom hex for tertiary color. Auto-derived if omitted."),
      colors: z.enum(["primary", "primary-secondary", "all"]).optional().default("all").describe("Color scope. Defaults to 'all'."),
      mode: z.enum(["light", "dark", "both"]).optional().default("both").describe("Which palette to preview. Defaults to 'both'.")
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true
    }
  },
  async ({ hex, mood, heading_font, body_font, secondary_hex, tertiary_hex, colors, mode }) => {
    const normalizedHex = normalizeHex(hex);
    if (!normalizedHex) {
      return { content: [{ type: "text", text: JSON.stringify({ error: "Invalid hex color." }) }] };
    }
    const sec = validateOptionalHex(secondary_hex, "secondary_hex");
    if (sec.error) return { content: [{ type: "text", text: JSON.stringify({ error: sec.error }) }] };
    const ter = validateOptionalHex(tertiary_hex, "tertiary_hex");
    if (ter.error) return { content: [{ type: "text", text: JSON.stringify({ error: ter.error }) }] };
    const result = generateTokenSystem({
      hex: normalizedHex,
      mood: mood || "cool",
      headingFont: heading_font,
      bodyFont: body_font,
      secondaryHex: sec.norm,
      tertiaryHex: ter.norm,
      colors: colors || "all"
    });
    const lightColors = {
      primary: result.tokens.light.primary,
      background: result.tokens.light.bg,
      surface: result.tokens.light["bg-surface"],
      text: result.tokens.light.text
    };
    if (result.tokens.light.secondary) lightColors.secondary = result.tokens.light.secondary;
    if (result.tokens.light.tertiary) lightColors.tertiary = result.tokens.light.tertiary;
    const darkColors = {
      primary: result.tokens.dark.primary,
      background: result.tokens.dark.bg,
      surface: result.tokens.dark["bg-surface"],
      text: result.tokens.dark.text
    };
    if (result.tokens.dark.secondary) darkColors.secondary = result.tokens.dark.secondary;
    if (result.tokens.dark.tertiary) darkColors.tertiary = result.tokens.dark.tertiary;
    const selectedMode = mode || "both";
    let previewColors;
    if (selectedMode === "light") previewColors = lightColors;
    else if (selectedMode === "dark") previewColors = darkColors;
    else previewColors = { light: lightColors, dark: darkColors };
    const preview = {
      mood: result.mood,
      colors: previewColors,
      fonts: {
        heading: result.fonts.heading,
        body: result.fonts.body
      },
      radius: result.tokens.shape.borderRadius + "px",
      shadow: result.tokens.shape.shadowStyle,
      contrast: result.contrast.summary,
      contrast_detail: {
        light: extractContrastDetail(result.contrast.light),
        dark: extractContrastDetail(result.contrast.dark)
      },
      brief: generateBrief(mood || "cool", result),
      url: `https://tokven.dev/?hex=${normalizedHex.replace("#", "")}&mood=${mood || "cool"}`
    };
    return { content: [{ type: "text", text: JSON.stringify(preview, null, 2) }] };
  }
);
server.registerTool(
  "validate_contrast",
  {
    title: "Validate WCAG Contrast",
    description: "Check WCAG 2.1 contrast ratio and APCA (WCAG 3 candidate) contrast between two colors. Returns ratio, AA/AAA pass/fail for normal and large text, and APCA Lc value.",
    inputSchema: {
      foreground: z.string().describe("Foreground hex color"),
      background: z.string().describe("Background hex color")
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true
    }
  },
  async ({ foreground, background }) => {
    const fg = normalizeHex(foreground);
    const bg = normalizeHex(background);
    if (!fg || !bg) {
      return { content: [{ type: "text", text: JSON.stringify({ error: "Invalid hex color(s)." }) }] };
    }
    const ratio = contrastRatio2(fg, bg);
    const Lc = apcaContrast(fg, bg);
    const response = {
      foreground: fg,
      background: bg,
      wcag: {
        ratio,
        aa_normal: ratio >= 4.5,
        aa_large: ratio >= 3,
        aaa_normal: ratio >= 7,
        aaa_large: ratio >= 4.5
      },
      apca: {
        Lc,
        passes_body_text: Lc >= 75,
        passes_large_text: Lc >= 60,
        passes_non_text: Lc >= 45
      }
    };
    return { content: [{ type: "text", text: JSON.stringify(response, null, 2) }] };
  }
);
server.registerTool(
  "list_moods",
  {
    title: "List Available Moods",
    description: "Returns all available mood presets for the generate_tokens tool, with descriptions of the visual personality each produces.",
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true
    }
  },
  async () => {
    const moods2 = AVAILABLE_MOODS.map((m) => ({
      id: m,
      description: MOOD_DESCRIPTIONS[m] || ""
    }));
    return { content: [{ type: "text", text: JSON.stringify({ moods: moods2 }, null, 2) }] };
  }
);
server.registerTool(
  "derive_color",
  {
    title: "Derive Color Scale",
    description: "Lightweight single-purpose color derivation. Derive accessible background scales, text colors, brand color 4-token sets, status color variants, or light\u2194dark counterpart backgrounds. Returns raw tokens as JSON \u2014 no CSS wrapping. Use this when you need a quick answer like 'give me accessible grays for this background' or 'what text colors work on #0d0d0d?'",
    inputSchema: {
      operation: z.enum(["bg_scale", "text_scale", "brand_scale", "status_scale", "counterpart_bg", "adjust_contrast"]).describe("Derivation type. bg_scale: surface/border grays for a background. text_scale: accessible text colors for a background. brand_scale: full 4-token brand set (base, on, container, on-container, hover, active, border, text). status_scale: accessible status color variants. counterpart_bg: light\u2194dark equivalent. adjust_contrast: find nearest accessible variant of a color."),
      hex: z.string().describe("The color to derive from"),
      background: z.string().optional().describe("Background hex. Required for text_scale, brand_scale, status_scale, adjust_contrast."),
      primary_hex: z.string().optional().describe("Primary brand hex for surface tinting. Used by bg_scale, text_scale, brand_scale."),
      target_ratio: z.number().optional().default(4.5).describe("Target WCAG contrast ratio for adjust_contrast. Defaults to 4.5 (AA normal text).")
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true
    }
  },
  async ({ operation, hex, background, primary_hex, target_ratio }) => {
    const normHex = normalizeHex(hex);
    if (!normHex) {
      return { content: [{ type: "text", text: JSON.stringify({ error: "Invalid hex color." }) }] };
    }
    const normBg = background ? normalizeHex(background) : null;
    const normPrimary = primary_hex ? normalizeHex(primary_hex) : null;
    if (["text_scale", "brand_scale", "status_scale", "adjust_contrast"].includes(operation) && !normBg) {
      return { content: [{ type: "text", text: JSON.stringify({ error: `'background' is required for ${operation}.` }) }] };
    }
    let scale;
    let contrastInfo = [];
    switch (operation) {
      case "bg_scale": {
        scale = deriveBgScale(normHex, normPrimary);
        break;
      }
      case "text_scale": {
        scale = deriveTextScale(normBg, normPrimary || normHex);
        for (const [key, val] of Object.entries(scale)) {
          contrastInfo.push({
            token: key,
            color: val,
            vs_background: contrastRatio2(val, normBg),
            apca_Lc: apcaContrast(val, normBg)
          });
        }
        break;
      }
      case "brand_scale": {
        scale = deriveBrandScale(normHex, normBg, normPrimary || normHex);
        contrastInfo.push(
          { pair: "on \u2192 base", ratio: contrastRatio2(scale.on, scale.base) },
          { pair: "on-container \u2192 container", ratio: contrastRatio2(scale["on-container"], scale.container) },
          { pair: "base \u2192 background", ratio: contrastRatio2(scale.base, normBg) },
          { pair: "text \u2192 background", ratio: contrastRatio2(scale.text, normBg) }
        );
        break;
      }
      case "status_scale": {
        scale = deriveStatusScale(normHex, normBg);
        contrastInfo.push(
          { pair: "on \u2192 base", ratio: contrastRatio2(scale.on, scale.base) },
          { pair: "on-container \u2192 container", ratio: contrastRatio2(scale["on-container"], scale.container) },
          { pair: "text \u2192 background", ratio: contrastRatio2(scale.text, normBg) }
        );
        break;
      }
      case "counterpart_bg": {
        const counterpart = deriveCounterpartBg(normHex);
        scale = { input: normHex, counterpart };
        break;
      }
      case "adjust_contrast": {
        const adjusted = adjustToContrast(normHex, normBg, target_ratio || 4.5);
        const ratio = contrastRatio2(adjusted, normBg);
        scale = {
          input: normHex,
          adjusted,
          background: normBg,
          target_ratio: target_ratio || 4.5,
          achieved_ratio: ratio,
          pass: ratio >= (target_ratio || 4.5)
        };
        break;
      }
    }
    const response = { operation, scale };
    if (contrastInfo.length > 0) response.contrast = contrastInfo;
    return { content: [{ type: "text", text: JSON.stringify(response, null, 2) }] };
  }
);
var transport = new StdioServerTransport();
await server.connect(transport);
console.error("Tokven MCP server running on stdio");
