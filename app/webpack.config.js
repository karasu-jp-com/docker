// pathモジュールの読み込み
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// @ts-ignore
module.exports = (_env, argv) => {
	const srcname = process.env.npm_package_name
		, cssname = process.env.npm_package_name
		, isProd = argv.mode;

	return Object.assign(
		// 共通設定
		{
			// 入力ファイル設定
			entry: [
				path.resolve(__dirname, `./src/${srcname}.tsx`),
				path.resolve(__dirname, `./src/${srcname}.scss`),
			],
			// モジュール設定
			module: {
				rules: [
					{
						// ts-loaderの設定
						test: /\.(js|ts|tsx)?$/,
						use: "ts-loader",
						exclude: /node_modules/,
					},
					{
						// SASS 及び CSS 用のローダー
						test: /\.(scss|sass|css)$/i, 
						// 使用するローダーの指定（後ろから順番に適用される）
						use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'], 
						exclude: /node_modules/,
					},
				]
			},
			output: {
				// 出力されるファイル名
				filename: `${srcname}.js?v=${(new Date()).getTime()}`,
				// 出力先ディレクトリ
				path: path.resolve(__dirname, "dist"),
				clean: true,
			},
			// モジュール解決
			resolve: {
				extensions: [".ts", ".tsx", ".js", ".json"]
			},
			// externals: {
			// 	"react": "React",
			// 	"react-dom": "ReactDOM",
			// },
			plugins: [
				new HtmlWebpackPlugin({
					// テンプレートに使用するhtmlファイルを指定
					template: `./src/${srcname}.html`,
					filename: `${srcname}.html`,
					templateParameters: {
				// 		scripts: (() => {
				// 			let result = "";
				// 			(isProd
				// 				? ["https://unpkg.com/react@16/umd/react.production.min.js"
				// 				  ,"https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"
				// 				]
				// 				: ["https://unpkg.com/react@16/umd/react.development.js"
				// 				  ,"https://unpkg.com/react-dom@16/umd/react-dom.development.js"
				// 				]
				// 			).forEach(url => {
				// 				result += `${(result == "" ? "" : "\n\t\t")}<script src="${url}" crossorigin></script>`;
				// 			});
				// 			return result;
				// 		})()
					},
				}),
				new MiniCssExtractPlugin({
					// 抽出する CSS のファイル名
					filename: `${cssname}.css?v=${(new Date()).getTime()}`,
				}),
			],
		},
		isProd ?
		// 製品モード時の設定
		{
			mode: "production",
		}:
		// 開発モード時の設定
		{
			mode: "development",
			devtool: "source-map",
			devServer: {
				port: 3000,
				open: [`/${srcname}.html`],
				static: {
					directory: path.resolve(__dirname, 'dist'),
				},
			}
		});
}