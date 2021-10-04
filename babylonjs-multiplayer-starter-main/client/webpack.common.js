const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');


// App directory
const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
    target: 'web',
    entry: path.resolve(appDirectory, "src/index.ts"),
    output: {
        filename: 'js/babylonBundle.js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: {
            fs: false
        }
    },
    module: {
        rules: [{
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            loader: 'source-map-loader',
            enforce: 'pre',
        },
        {
            test: /\.tsx?$/,
            loader: 'ts-loader'
        },
        {
            test: /\.(png|jpg|gif|env|glb|stl)$/i,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                },
            },],
        }
        ]
    },
    plugins: [
        //      new CleanWebpackPlugin(),

        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(appDirectory, "public/index.html"),
        }),
        new webpack.DefinePlugin({
            __SERVER_URL__: JSON.stringify(process.env.LOCAL_SERVER ? "http://localhost:8080" :
                "https://metaga9.herokuapp.com/")
        }),

    ]
}