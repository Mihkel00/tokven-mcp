# tokven-mcp

WCAG-safe color system generation for AI agents and developers. Give it a brand hex, get a contrast-validated token system in CSS, Tailwind, or DTCG JSON. Runs locally, no account needed.

## What it does

Give it a brand color and a mood. It returns a full token system: colors (light + dark mode), typography pairing, spacing scale, border radius, shadows — all WCAG-validated with contrast ratios. Output as CSS custom properties, Tailwind v4, Tailwind v3, or DTCG JSON. Runs locally, no account needed.

## Install

```json
{
  "mcpServers": {
    "tokven": {
      "command": "npx",
      "args": ["-y", "tokven-mcp"]
    }
  }
}
```

**Cursor:** Settings → MCP → Add the config above

**Claude Desktop:** Add to `claude_desktop_config.json`

**Claude Code:**
```
claude mcp add tokven -- npx -y tokven-mcp
```

## Tools

### generate_tokens

Generates a complete token system from a hex color.

| Parameter | Required | Description |
|-----------|----------|-------------|
| `hex` | yes | Brand color, e.g. `#2563eb` |
| `mood` | no | Visual personality. Default: `cool` |
| `format` | no | `css` \| `tailwind-v4` \| `tailwind-v3` \| `dtcg` |
| `heading_font` | no | Override heading font family |
| `body_font` | no | Override body font family |
| `colors` | no | Color scope: `primary` \| `primary-secondary` \| `all` (default) |
| `secondary_hex` | no | Custom secondary hex. Auto-derived if omitted |
| `tertiary_hex` | no | Custom tertiary hex. Auto-derived if omitted |

**Example prompt:**

> Generate a design system for #2563eb with a corporate mood as Tailwind v4

**Returns:** Full CSS/Tailwind/DTCG output, Google Fonts `@import` URL, WCAG contrast results for both light and dark mode.

---

### get_token_preview

Quick summary without full CSS. Useful for comparing moods before committing.

| Parameter | Required | Description |
|-----------|----------|-------------|
| `hex` | yes | Brand color |
| `mood` | no | Mood preset |

**Example prompt:**

> Preview tokens for #e05aad with a soft mood

**Returns:** Primary colors, font pairing, radius, shadow style, contrast pass/fail count.

---

### validate_contrast

WCAG 2.1 contrast check between two colors.

| Parameter | Required | Description |
|-----------|----------|-------------|
| `foreground` | yes | Foreground hex color |
| `background` | yes | Background hex color |

**Example prompt:**

> Does #ffffff on #2563eb pass WCAG AA?

**Returns:** Contrast ratio, AA/AAA pass/fail for normal and large text.

---

### list_moods

Returns all 14 mood presets with descriptions. No parameters.

| Mood | Character |
|------|-----------|
| `warm` | Earthy tones, serif typography, editorial |
| `cool` | Blue-grey, clean sans-serif, professional |
| `bold` | High contrast, saturated, hard shadows |
| `dark` | Muted, precise, monospace-friendly |
| `soft` | Pastel, rounded shapes, gentle |
| `minimal` | Near-achromatic, elegant, restrained |
| `brutalist` | Monochrome, raw, zero radius |
| `playful` | High chroma, bouncy, colorful |
| `vintage` | Desaturated warm, classic serif |
| `luxury` | Gold/champagne, refined serif |
| `nature` | Green/earth tones, organic shapes |
| `neon` | Dark bg, max chroma, cyber |
| `corporate` | Professional blue, trustworthy |
| `retro` | Warm saturated, 70s/80s display |

## Example output

`generate_tokens` with `hex: "#2563eb"`, `mood: "corporate"` returns:

```css
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@600&family=Noto+Sans:wght@400&display=swap");

:root {
  /* Background */
  --color-bg: #f6f7fa;
  --color-bg-surface: #f0f2f6;
  --color-bg-elevated: #eaecf1;
  --color-border-subtle: #e2e4ea;
  --color-border-default: #d8dbe2;
  --color-border-strong: #c7cad2;

  /* Text */
  --color-text: #0e1016;
  --color-text-muted: #454856;
  --color-text-subtle: #6a6e7b;

  /* Primary */
  --color-primary: #2563eb;
  --color-primary-on: #ffffff;
  --color-primary-container: #e8edf8;
  /* ... 45 more color tokens, typography, spacing, radius, shadows */
}
```

Plus WCAG contrast validation:
```json
{ "light": "31/31 pass", "dark": "31/31 pass" }
```

## Examples

### Example 1: Generate tokens for a brand color

**User prompt:** "Generate a design system for my app using brand color #2563eb"

**Expected behavior:**
- Calls `generate_tokens` with hex `#2563eb`, mood `"cool"`
- Returns full CSS custom properties block
- Includes Google Fonts `@import` URL
- Shows WCAG contrast results: 31/31 pass for both light and dark mode

### Example 2: Preview and compare moods

**User prompt:** "Show me a preview of #e05aad with a soft mood before I commit"

**Expected behavior:**
- Calls `get_token_preview`
- Returns compact summary: primary colors, font pairing, radius, shadow style, contrast pass count
- No full CSS — quick comparison view

### Example 3: Check if colors are accessible

**User prompt:** "Does white text on #2563eb pass WCAG AA?"

**Expected behavior:**
- Calls `validate_contrast` with `#ffffff` and `#2563eb`
- Returns ratio (4.52:1), AA pass for large text, AA fail for normal text, AAA fail
- Clear pass/fail for each WCAG criterion

## Privacy

tokven-mcp runs entirely on your local machine. No data is collected, no network requests are made during token generation, no account required. The MCP server collects no usage data.

Full policy: https://tokven.dev/#/privacy

## Requirements

Node.js >= 18

## License

MIT
