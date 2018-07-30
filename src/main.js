const path = require("path");
import url from "url";        // <= 追加
const {app, BrowserWindow} = require("electron");

import defs from "defs";
// build/webpack.base.config.js で aliasしている。
// defs: path.resolve(__dirname, `../config/defs_${env}.json`)
// {env}:(development|production} / jsonファイルの中身は、nameとdescription

let mainWindow; // for avoiding GH

// 起動時動作
const createWindow = () => {
	mainWindow = new BrowserWindow({width: 800, height: 600});
	if (defs.name === "development") {
		mainWindow.openDevTools();
	}
	mainWindow.loadURL(     // <= 表現を若干変更
			url.format({
				pathname: path.resolve(__dirname, "index.html"),
				protocol: "file:",
				slashes: true
			})
	);
	mainWindow.on('closed', () => { mainWindow = null; });
};

// 起動
app.on('ready', createWindow);
app.on('activate', () => {
	// 画面は閉じられていたが、アプリが生きていた場合の二重起動対策
	if (mainWindow === null) createWindow();
});
// 終了
app.on('window-all-closed', () => {
	// Macの場合、画面を閉じただけではアプリが終了していないので
	if (process.platform !== 'darwin') app.quit();
});
