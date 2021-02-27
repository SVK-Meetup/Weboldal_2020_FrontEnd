/* eslint-disable */
module.exports = {
 	productionSourceMap: false,
	css: {
		sourceMap: true
	},
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:8080/',
				changeOrigin: true
			},
			'/gallery': {
				target: 'http://localhost:8080/',
				changeOrigin: true
			},
			'/auth': {
				target: 'http://localhost:8080/',
				changeOrigin: true
			}
		}
	},
	pwa: {
		themeColor: "#000000",
		msTileColor: "#FFFFFF",
		manifestOptions: {
			background_color: "#FFFFFF"
		},
		name: "SVK Meetup"
	},
/* 	pluginOptions: {} */
};
