const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractScss = new ExtractTextPlugin({
    filename: "./css/[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    module: {
        rules: [{
            test: /\.scss$/,
            use: extractScss.extract({
                publicPath: '../',
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                fallback: "style-loader"
            })
        },
        {
            test: /\.css$/,
            use: extractScss.extract({
                publicPath: '../',
                use: [{
                    loader: "css-loader"
                }],
                fallback: "style-loader"
            })
        }]
    },
    plugins: [
        extractScss
    ]
};
