const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    devServer: { // найстроки сервера
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, './dist'),
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
    entry: {
        main: path.resolve(__dirname, './src/index.tsx'), //путь входного файла
    },
    output: {
        path: path.resolve(__dirname, './dist'), // путь куда билдиться проект
        filename: '[name].bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate', // название вкладки
            template: path.resolve(__dirname, './src/template.html'), // шаблон
            filename: 'index.html', // название выходного файла
        }),
        new CleanWebpackPlugin(), // плагин для очищения старого билда перед билдом нового
        new webpack.HotModuleReplacementPlugin() // плагин для горччей перезагрузки(во время разработки)
    ],
    module: { // модули для обработки чего либо в единный js
        rules: [
            {
                test: /\.tsx?$/, // typescript
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|css)$/, // styles ( предпроцессоры, styled components)
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, // шрифты
                type: 'asset/inline',
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i, // медиа файлы(картинки)
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'], // принимаеме разрешения
    },
};

