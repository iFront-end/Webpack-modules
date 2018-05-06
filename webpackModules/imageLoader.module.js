module.exports = {
    module: {
        rules: [{
            test: /\.(jpe?g|png|gif|svg|ico)$/,
            loader: 'file-loader',
            options: {
                name: 'images/[name].[ext]'
            }
        }]
    }
};