import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import pluginNext from "@next/eslint-plugin-next";
import configPrettier from "eslint-config-prettier";
import pluginImport from "eslint-plugin-import";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginUnicorn from "eslint-plugin-unicorn";
import globals from "globals";
import { configs as tsConfigs } from "typescript-eslint";

const compat = new FlatCompat();

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ ignores: [".next/**", "out/**", "next-env.d.ts"] },
	{
		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
	js.configs.recommended,
	...tsConfigs.recommended,
	{
		rules: {
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					ignoreRestSiblings: true,
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
				},
			],
			"@typescript-eslint/no-empty-object-type": "off",
		},
	},
	configPrettier,
	pluginImport.flatConfigs.recommended,
	...compat.extends("plugin:import/typescript"),
	{
		settings: {
			"import/resolver": {
				typescript: true,
				node: true,
				alias: {
					map: [["@", "./src"]],
					extensions: [".js", ".jsx"],
				},
			},
		},
	},
	pluginUnicorn.configs["flat/recommended"],
	{
		rules: {
			"unicorn/prevent-abbreviations": "off",
			"unicorn/no-null": "off",
			"unicorn/no-nested-ternary": "off",
			"unicorn/no-array-reduce": "off",
		},
	},
	pluginReact.configs.flat.recommended,
	{
		settings: {
			react: {
				version: "detect",
			},
		},
		rules: {
			"react/prop-types": "off",
		},
	},
	// Preserve the existing Hooks rules; compiler rules require a separate app refactor.
	{
		plugins: { "react-hooks": pluginReactHooks },
		rules: {
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",
		},
	},
	pluginNext.configs.recommended,
];
