module.exports = {
  singleQuote: false,
  trailingComma: "es5",
  arrowParens: "always",
  printWidth: 120,
  tabWidth: 2,
  overrides: [
    {
      files: ["*.json"],
      options: {
        semi: true,
        tabWidth: 2,
      },
    },
  ],
};
