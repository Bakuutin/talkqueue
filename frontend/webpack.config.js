// const CommonConfigWebpackPlugin = require('common-config-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDevelopment = process.env.NODE_ENV === 'development'

const config = {
    entry: {
        index: './src/index.jsx',
        style: './src/style.scss',
        fontawesome: '@fortawesome/fontawesome-free/js/all.js',
    },
    plugins: [
        // new CommonConfigWebpackPlugin(),
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'index.html',
            template: 'index.html',
            base: '/static/',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
    ],
    resolve: {
        extensions: ['*', '.js', '.jsx', '.scss'],
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                loaders: ['babel-loader'],
            },
            {
                test: /\.scss$/i,
                loader: [
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require("node-sass"),
                            sourceMap: isDevelopment,
                            sassOptions: {
                                includePaths: ['node_modules']
                            },
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/',
                    }
                }]
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?v=.*)?$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                    }
                }]
            },
        ]
    }
}

module.exports = config
