const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist/",
    compress: true,
    open: true,
    port: 5500,
    hot: true,
    publicPath: "/",
  }
}); 