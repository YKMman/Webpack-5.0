const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    mode: 'development',
    // ? find errors 
    devtool: 'inline-source-map',
    entry: {
        webpack: './src/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        assetModuleFilename: path.join('images', '[name][ext]'),
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/,
                type: 'asset/resource',
                generator: {
                    filename: path.join('icons', '[name][ext]'),
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    // optimization: {
    //     // ? if pages > 1
    //     runtimeChunk: 'single',
    // },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'YKM',
            template: './src/assets/index.pug',
            filename: 'index.html', // название выходного файла
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css" ,
            chunkFilename: "[id].css" ,
        }),
    ],
    devServer: {
        watchFiles: path.join(__dirname, 'src'),
        compress: true,
        port: 9000,
    },
}