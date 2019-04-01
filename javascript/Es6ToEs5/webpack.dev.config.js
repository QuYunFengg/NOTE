const path = require('path'); // 加载node中的path模块
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 加载插件html-webpack-plugin

module.exports = {
    mode: 'development', // 开发模式
    entry: './src/index.js', // 入口文件
    output: { // 出口文件
        path: __dirname,
        filename: './js/index.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, "./src"),
            exclude: path.resolve(__dirname, "./node_modules"),
            loader: 'babel-loader'
        }]
    },
    plugins: [ 
        new HtmlWebpackPlugin({ // HTML加载插件
            template: './dist/index.html'
        })
    ],
    devServer: { // 开发服务
        contentBase: path.join(__dirname, './dist'), // 根目录
        open: true, // 自动打开浏览器
        port: 8080, // 端口
        host: 'localhost'
        //host: "192.168.1.107" // WiFi IPV4地址，打开可共享到手机
    }
}