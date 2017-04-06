var ExtractTextPlugin = require('extract-text-webpack-plugin')
var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: [
        'bootstrap-loader',
        './src/main.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist/',
        filename: 'app.js'
    },
    module: {
        rules: [
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
                loader: 'babel-loader',
                exclude: /node_modules/
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
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]?[hash]'
                }
            },
            {
                test: /glyphicons-halflings-regular\.(svg|eot|woff|woff2|ttf)$/,
                loader: 'file-loader',
                options: {
                    publicPath: './', //comment this if 'extractStyles: false' in .bootstraprc
                    name: 'fonts/glyphicons/[name].[ext]?[hash]'
                }
            },
            {
                test: /fontawesome-webfont\.(svg|eot|woff|woff2|ttf)$/,
                loader: 'file-loader',
                options: {
                    publicPath: './',
                    name: 'fonts/fontawesome/[name].[ext]?[hash]'
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
        })
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
