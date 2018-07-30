const path = require("path");
const nodeExternals = require("webpack-node-externals");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

// 共通に使われるwebpack.config
// ただし、env:(production|development)で場合分けはある。
module.exports = env => {
	return {
		mode: (env === "production") ? "production" : "development",
		output: {
			filename: "[name].js",
			path: path.resolve(__dirname, "../app")
		},
		node: {
			__dirname: false,
			__filename: false
		},
		externals: [nodeExternals(
				{whitelist: ['moment']}
		)],
		resolve: {
			alias: {
				defs: path.resolve(__dirname, `../config/defs_${env}.json`)
			}
		},
		devtool: "source-map",
		module: {
			rules: [{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			}, {
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			}]
		},
		plugins: [
			// webpackのconsoleメッセージを理解しやすいものに
			new FriendlyErrorsWebpackPlugin(
					{clearConsole: env === "development"}
			)
		],
	};
};
