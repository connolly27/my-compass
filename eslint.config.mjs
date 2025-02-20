import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Get current file's directory (needed for ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create compatibility layer for ESLint flat config
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// ESLint configuration using Next.js recommended rules
// Includes both core web vitals and TypeScript rules
const eslintConfig = [...compat.extends("next/core-web-vitals", "next/typescript")];

export default eslintConfig;
