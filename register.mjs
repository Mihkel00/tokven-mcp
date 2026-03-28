/**
 * Loader registration — must be imported via --import before index.js loads.
 * Registers the extensionless import resolver so ../src/ imports work in Node ESM.
 */
import { register } from "node:module";
import { pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
register(pathToFileURL(resolve(__dirname, "..", "loader.mjs")));
