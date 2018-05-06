const path = require('path'),
    webpack = require('webpack'),
    caseSensitivePaths = require('case-sensitive-paths-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    merge = require('webpack-merge'),
    server = require('./webpackModules/server.module'),
    scss = require('./webpackModules/scss.module'),
    css = require('./webpackModules/css.module'),
    extractCss = require('./webpackModules/cssExtract.module'),
    imageLoader = require('./webpackModules/imageLoader.module'),
    ts = require('./webpackModules/ts.module'),
    pug = require('./webpackModules/pug.module');

const PATHS = {
    src: path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'dist')
};

const common = merge([
    {
        context: PATHS.src,
        entry: {
            index: PATHS.src + '/app/index/index.ts',
            contacts: PATHS.src + '/app/contacts/contacts.ts'
        },
        output: {
            filename: './js/[name].js',
            path: PATHS.dist
        },
        plugins: [
            new caseSensitivePaths(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                chunks: ['index', 'vendor'],
                template: PATHS.src + '/app/index/index.pug'
            }),
            new HtmlWebpackPlugin({
                filename: 'contacts.html',
                chunks: ['contacts', 'vendor'],
                template: PATHS.src + '/app/contacts/contacts.pug'
            }),
            new webpack.ProvidePlugin({})
        ],
        optimization: {
            splitChunks: {
                chunks: 'all',
                name: 'vendor'
            }
        }
    },
    ts,
    pug
]);

module.exports = (env) => {
    if (env === 'production') {
        return merge([common, extractCss, imageLoader])
    }
    if (env === 'development') {
        return merge([common, server, scss, css])
    }
};
