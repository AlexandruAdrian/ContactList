const path = require("path");
const HtmlWebpackPLugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./web/src/index.js",
  output: {
    path: path.join(__dirname, "web/dist"),
    filename: "index_bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPLugin({
      template: "./web/public/index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
  },
  performance: {
    hints: false,
  },
};
