/**
 * @type {import("eslint").Linter.Config}
 */
const config = {
  ignorePatterns: [
    "!.*",
    "/.vercel/**",
    "/coverage/**",
    "/node_modules/**",
    "/public/**"
  ],
  env: {
    es2022: true
  },
  extends: ["union"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2022,
    project: "tsconfig.json",
    sourceType: "module"
  },
  rules: {
    "@cspell/spellchecker": [
      "warn",
      {
        cspell: {
          words:
            // @sorted
            ["cjsx", "mjsx", "packagejson"]
        }
      }
    ],
    "import/no-internal-modules": [
      "warn",
      {
        allow:
          // @sorted
          ["jest-extended/all"]
      }
    ]
  }
};

module.exports = config;
