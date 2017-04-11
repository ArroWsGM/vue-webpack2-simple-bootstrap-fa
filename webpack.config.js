var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: [
        'bootstrap-loader',
        './src/main.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        //publicPath: 'dist/',
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                        loader: ['css-loader']
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                        loader: ['css-loader','sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                include: [
                    path.resolve(__dirname, 'src/assets/img')
                ],
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name].[ext]?[hash]'
                    }
                }
            },
            {
                test: /glyphicons-halflings-regular\.(svg|eot|woff|woff2|ttf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        //publicPath: './', //comment this if 'extractStyles: false' in .bootstraprc
                        name: 'fonts/glyphicons/[name].[ext]?[hash]'
                    }
                }
            },
            {
                test: /fontawesome-webfont\.(svg|eot|woff|woff2|ttf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        //publicPath: './',
                        name: 'fonts/fontawesome/[name].[ext]?[hash]'
                    }
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map',
    plugins: [
        new ExtractTextPlugin({
            filename: 'app.css',
            disable: false,
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(['dist'])
    ]
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
