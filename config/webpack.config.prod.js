'use strict';
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const appDir = path.resolve(__dirname, '..', 'app');
const distDir = path.resolve(__dirname, '..', 'dist');


module.exports = {
    mode: 'production',

    context: appDir,

    devtool: 'hidden-source-map',

    entry: {
        main: './js/main.js',
        dynamicTerrain: './js/dynamicTerrain.js'
    },

    output: {
        filename: 'js/[name].js',
        path: distDir,
        publicPath: '/',
        library: 'dynamicTerrain'
    },

    devServer: {
        contentBase: distDir,
        historyApiFallback: true,
        port: 3000,
        compress: true,
        inline: false
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, '../app'),
                    path.resolve(__dirname, '../node_modules/OblioUtils')
                ],
                use: [
                    {
                        loader: 'babel-loader',
                        'options': {
                            sourceMap: true,
                            presets: [['@babel/preset-env', {
                                modules: false,
                                useBuiltIns: 'entry'
                            }]],
                            plugins: [require('babel-plugin-transform-es3-member-expression-literals'), require('babel-plugin-transform-es3-property-literals')],
                            babelrc: false
                        }
                    },
                ],
            },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, '../app'),
                    path.resolve(__dirname, '../node_modules/OblioUtils')
                ],
                use: [
                    {
                        loader: path.resolve(__dirname, '../loaders/widget-js-loader.js'),
                        'options': {
                            // 'json': settings
                        }
                    },
                ],
            },
            {
                test: /\.(scss|css)$/,
                include: [
                    path.resolve(__dirname, '../app'),
                    path.resolve(__dirname, '../node_modules/OblioUtils')
                ],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: path.resolve(__dirname, '../')
                        }
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.resolve(__dirname, '..', 'postcss.config.js')
                            }
                        }
                    },
                    {
                        loader: "sass-loader",
                    },
                    {
                        loader: path.resolve(__dirname, '../loaders/widget-css-loader.js'),
                        'options': {
                            // 'json': settings.widgets
                        }
                    }
                ]
                // use: ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: [
                //         {
                //             loader: "css-loader",
                //         },
                //         {
                //             loader: 'postcss-loader',
                //             options: {
                //                 config: {
                //                     path: './postcss.config.js'
                //                 }
                //             }
                //         },
                //         {
                //             loader: "sass-loader",
                //         },
                //         {
                //             loader: path.resolve(__dirname, '../loaders/widget-css-loader.js'),
                //             'options': {
                //                 'json': settings.widgets
                //             }
                //         }
                //     ],
                //     publicPath: '../'
                // }),
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
                test: /templates\.js$/,
                use: [
                    {
                        loader: path.resolve(__dirname, '../loaders/widget-templates-loader.js'),
                        'options': {
                            // 'json': settings.widgets
                        }
                    }
                ]
            },
            {
                test: /\.(glsl|frag|vert|template)$/,
                use: 'raw-loader',
                include: [
                    path.resolve(__dirname, '../app'),
                    path.resolve(__dirname, '../node_modules/OblioUtils'),
                    path.resolve(__dirname, '../node_modules/three')
                ]
            },
            {
                test: /\.(glsl|frag|vert)$/,
                use: 'glslify-loader',
                include: [
                    path.resolve(__dirname, '../app'),
                    path.resolve(__dirname, '../node_modules/OblioUtils'),
                    path.resolve(__dirname, '../node_modules/three')
                ]
            },
            {
                test: /\.(woff(2)?|eot|ttf|svg)(\?[a-z0-9]+)?$/,
                include: [
                    path.resolve(__dirname, '../app'),
                    path.resolve(__dirname, '../node_modules/OblioUtils')
                ],
                use: "file-loader?name=fonts/[name].[ext]"
            },
            {
                test: /\.(mp3|ogg)$/,
                include: [
                    path.resolve(__dirname, '../app'),
                    path.resolve(__dirname, '../node_modules/OblioUtils')
                ],
                use: "file-loader?name=sounds/[name].[ext]"
            },
            {
                test: /\.(jpg|jpeg|png|gif|ico|svg)$/,
                include: [
                    path.resolve(__dirname, '../app'),
                    path.resolve(__dirname, '../node_modules/OblioUtils')
                ],
                use: [
                    {
                        loader: 'file-loader?name=images/[path][name].[ext]&context=app/assets/images'
                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: [".js", ".scss", ".css"],

        modules: [path.resolve(__dirname, "../app"), "node_modules"],
        // alias: {
        //   three: "js/vendor/three/three.custom"
        // },
    },

    optimization: {
        minimize: false,
        minimizer: [
            new UglifyJsPlugin({
                parallel: true,
                uglifyOptions: {
                    compress: {
                        drop_console: true
                    },
                    ie8: false
                }
            })
        ]
    },

    plugins: [
        new webpack.NamedModulesPlugin(),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),


        // new CopyWebpackPlugin([{from: "assets/video", to: "video"}]),
        // new CopyWebpackPlugin([{from: "json/en.json", to: "json/en.json"}]),
        // new CopyWebpackPlugin([{from: "html", to: "html"}]),

        new HtmlWebpackPlugin({
            env: 'prod',
            template: path.join(appDir, 'index.tmp'),
            filename: 'index.php',
            jsPath: 'js/',
            inject: false
        }),

        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         screw_ie8: false,
        //         drop_console: true
        //     },
        //     mangle: {
        //         screw_ie8: false
        //     },
        //     comments: false,
        //     output: { screw_ie8: false }
        // }),

        // Put all css code in this file
        // new ExtractTextPlugin('css/main.css'),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'css/[name].css'
        }),

        // new CopyWebpackPlugin([{from: "assets", to: "assets"}]),

        new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })
    ],
};