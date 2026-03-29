---
name: generate-tokens
description: Generate WCAG-safe design token systems from a brand hex color using the tokven-mcp server.
---

# Generate Design Tokens with Tokven

Use the tokven MCP server to generate complete design token systems from a single brand color.

## When to use

- User asks for a design system, color palette, or design tokens
- User provides a brand hex color and wants CSS variables, Tailwind config, or DTCG JSON
- User wants to check WCAG contrast between colors
- User needs typography pairing suggestions for a brand

## Available tools

### generate_tokens

Primary tool. Give it a hex color, get a full token system.

**Parameters:**
- `hex` (required): Brand color, e.g. `#2563eb`
- `mood` (optional): Visual personality — `warm`, `cool`, `bold`, `dark`, `soft`, `minimal`, `brutalist`, `playful`, `vintage`, `luxury`, `nature`, `neon`, `corporate`, `retro`. Default: `cool`
- `format` (optional): `css` | `tailwind-v4` | `tailwind-v3` | `dtcg`. Default: `css`
- `heading_font` (optional): Override heading font family
- `body_font` (optional): Override body font family
- `colors` (optional): `primary` | `primary-secondary` | `all`. Default: `all`
- `secondary_hex` (optional): Custom secondary color hex
- `tertiary_hex` (optional): Custom tertiary color hex

**Example:** "Generate a design system for #2563eb with a corporate mood as Tailwind v4"

**Returns:** Full formatted output, Google Fonts import URL, WCAG contrast results (light + dark).

### get_token_preview

Quick preview without full CSS. Use to compare moods before committing.

**Parameters:**
- `hex` (required): Brand color
- `mood` (optional): Mood preset

**Example:** "Preview tokens for #e05aad with a soft mood"

### validate_contrast

Check WCAG 2.1 contrast ratio between two colors.

**Parameters:**
- `foreground` (required): Foreground hex color
- `background` (required): Background hex color

**Returns:** Ratio, AA/AAA pass/fail for normal and large text.

### list_moods

Returns all 14 mood presets with descriptions. No parameters needed.

## Workflow

1. Use `get_token_preview` to quickly compare 2-3 moods if the user is unsure
2. Call `generate_tokens` with the chosen mood and format (default to `cool` if no mood specified)
3. If the user wants to verify specific color combinations, use `validate_contrast`

## Notes

- The server runs locally via `npx tokven-mcp` — no API key or account needed
- All token generation is offline, no network calls during generation
- Output includes both light and dark mode tokens
- WCAG contrast is validated automatically (31 pairs checked)
