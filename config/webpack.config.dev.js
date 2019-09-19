const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ConcatPlugin = require('webpack-concat-plugin');

const appDir = path.resolve(__dirname, '..', 'app');
const distDir = path.resolve(__dirname, '..', 'dist');

module.exports = {
    mode: 'development',

    context: appDir,

    devtool: 'source-map',

    entry: {
        main: './js/main.js',
        dynamicTerrain: './js/dynamicTerrain.js'
    },

    output: {
        filename: '[name].js',
        path: distDir,
        publicPath: '/',
        sourceMapFilename: '[name].map'
    },

    devServer: {
        disableHostCheck: true,
        contentBase: appDir,
        publicPath: '/',
        historyApiFallback: true,
        port: 3000,
        https: true
    },

    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     include: [
            //         path.resolve(__dirname, 'app'),
            //         path.resolve(__dirname, 'node_modules/OblioUtils')
            //     ],
            //     use: [
            //         {
            //             loader: 'babel-loader',
            //             'options': {
            //                 sourceMap: true,
            //                 presets: [['env', {
            //                     modules: false,
            //                     useBuiltIns: true
            //                 }]],
            //                 plugins: [require('babel-plugin-transform-es3-member-expression-literals'), require('babel-plugin-transform-es3-property-literals')],
            //                 compact: true,
            //                 babelrc: false
            //             }
            //         },
            //     ],
            // },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, '../app'),
                    path.resolve(__dirname, '../node_modules/OblioUtils')
                ]
            },
            {
                test: /\.(scss|css)$/,
                include: [
                    path.resolve(__dirname, '../app'),
                    path.resolve(__dirname, '../node_modules/OblioUtils')
                ],
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: './postcss.config.js'
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(woff(2)?|eot|ttf|svg)(\?[a-z0-9]+)?$/,
                use: "file-loader?name=fonts/[name].[ext]",
                include: [
                    path.resolve(__dirname, '../app'),
                    path.resolve(__dirname, '../node_modules/OblioUtils')
                ],
            },
            {
                test: /\.(mp3|ogg)$/,
                use: "file-loader?name=sounds/[name].[ext]",
                include: [
                    path.resolve(__dirname, '../app'),
                    path.resolve(__dirname, '../node_modules/OblioUtils')
                ],
            },
            {
                test: /\.(jpg|jpeg|png|gif|ico|svg)$/,
                use: 'file-loader?name=images/[path][name].[ext]&context=app/assets/images',
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'mustache-loader',
                        options: {
                                tiny: true,
                                noShortcut: true
                        }
                    }
                ]
            },
            {
                test: /\.(glsl|frag|vert|template)$/,
                use: 'raw-loader',
                include: [
                    path.resolve(__dirname, '../app'),
                    path.resolve(__dirname, '../node_modules/OblioUtils')
                ]
            },
            {
                test: /\.(glsl|frag|vert)$/,
                use: 'glslify-loader',
                include: [
                    path.resolve(__dirname, '../app'),
                    path.resolve(__dirname, '../node_modules/OblioUtils')
                ]
            }
        ]
    },
    
    resolve: {
        extensions: [".js", ".scss", ".css"],

        modules: [path.resolve(__dirname, "../app"), "node_modules"]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('dev'),
            }
        }),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(appDir, 'index.tmp'),
            jsPath: '/',
            path: distDir,
            filename: 'index.html',
            inject: false
        }),
        new ConcatPlugin({
            uglify: false,
            sourceMap: false,
            name: 'result',
            outputPath: '../app/js/',
            fileName: 'dynamicTerrainPack.js',
            filesToConcat: [
                '../app/js/perlin.js', 
                '../app/js/dynamicTerrain.js'
            ],
            attributes: {
                async: true
            }
        })
    ],
};