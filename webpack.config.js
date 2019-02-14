const path = require("path");

module.exports = {
  entry: "./lib/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "dist/main.js"
  },
  devtool: "sourcemap"
};
