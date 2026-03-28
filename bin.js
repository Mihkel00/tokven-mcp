#!/usr/bin/env node

/**
 * Tokven MCP Server — bin entry point.
 * Registers the extensionless import loader then starts the server.
 */

import { register } from "node:module";
import { pathToFileURL, fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
register(pathToFileURL(resolve(__dirname, "..", "loader.mjs")));

// Dynamic import so the loader is active before ../src/ modules resolve
await import("./index.js");