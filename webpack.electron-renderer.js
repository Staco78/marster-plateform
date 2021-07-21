const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/renderer/index.ts",
    target: "electron-renderer",
    experiments: {
        asset: true,
    },
    resolve: {
        alias: {
            ["@"]: path.resolve(__dirname, "src"),
        },
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.(png|ttf)$/,
                include: /src/,
                type: "asset",
            },
            {
                test: /\.ts$/,
                include: /src/,
                use: [{ loader: "ts-loader" }],
            },
        ],
    },
    output: {
        path: __dirname + "/dist",
        filename: "renderer.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/renderer/index.html",
        }),
    ],
};
