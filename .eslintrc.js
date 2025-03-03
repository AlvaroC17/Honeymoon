module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "lf" }],
    "import/no-unresolved": [
      "error",
      {
        ignore: ["^https?://"],
      },
    ],
  },
};
