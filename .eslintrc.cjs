module.exports = {
  root: true,
  ignorePatterns: ["**/dist/**", "**/.next/**"],
  parserOptions: { ecmaVersion: 2022, sourceType: "module" },
  overrides: [
    {
      files: ["**/*.{ts,tsx,js,jsx}"],
      extends: ["eslint:recommended", "plugin:import/recommended", "prettier"],
      plugins: ["import"],
      rules: {
        "import/order": [
          "error",
          {
            alphabetize: { order: "asc", caseInsensitive: true }
          }
        ]
      }
    }
  ]
};
