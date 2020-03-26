const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// see https://hackernoon.com/lets-start-with-webpack-4-91a0f1dba02e
module.exports = {
    entry: './src/index.js',
    devtool: 'source-map',
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: '/'
        }
    },
    module: {
        rules: [
            {
                test: [/.js$/],
                exclude: /(node_modules)/,
                include: path.resolve(__dirname, 'src'),
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: [/.css$|.scss$/],
                include: path.resolve(__dirname, 'src/styles'),
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/images'
                        }
                    }
                ]
            },
            {
                test: /\.(mp3)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/sounds'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'WebJS assignment',
            template: './src/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[chunkhash].css'
        }),
        new CopyWebpackPlugin(
            [
                {
                    from: './src/assets', to: 'assets'
                }
            ]
        ),
        new CleanWebpackPlugin.CleanWebpackPlugin()
    ]
};