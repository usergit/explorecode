module.exports = {
    entry    : "./src/index.js",
    output   : {
        path    : __dirname,
        filename: "./public/bundle.js"
    },
    devServer: {
        inline: true,
        port  : 5000
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                exclude: /(node_modules)/,
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader",
                include: __dirname + '/src'
            }
        ]
    }
};