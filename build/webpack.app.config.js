const webpack = require('webpack');
const merge = require("webpack-merge");
const LicenseInfoWebpackPlugin = require('license-info-webpack-plugin').default;

// 共通のwebpack.config
const base = require("./webpack.base.config");

module.exports = env => {
	// webpack-mergeを使って、
	// webpack.base.configの設定内容と
	// 以下の設定内容を合体
	return [
		merge(base(env), {
			target: "electron-main",
			entry: {
				main: "./src/main.js",
			}
		}),
		merge(base(env), {
			target: "electron-renderer",
			entry: {
				app: "./src/app.js"
			},
			plugins: [
				// moment.jsのロケールを削除
				new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
				// 使用するモジュールの著作権表示をバンドル
				new LicenseInfoWebpackPlugin({
					glob: '{LICENSE,license,License}*',
					output: 'html',
					outputPath: './licenses-of-others'
				})
			]
		})
	]
};
