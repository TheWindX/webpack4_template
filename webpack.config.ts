const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isDebug = process.env.NODE_ENV === 'development'

const config = {
    mode: isDebug
        ? 'development'
        : 'production',
    entry: {
        app: path.resolve(__dirname, "src/index.js"),
        vendor: ['react', 'react-dom']
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        open: true,
        overlay: {
            warnings: true,
            errors: true
        },
        port: 8700,
        host: "localhost",
        publicPath: "/",
        historyApiFallback: true,
        disableHostCheck: true
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/",
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.txt$/,
                use: 'raw-loader'
            }, {
                test: /\.tsx$/,
                use: ["ts-loader", "babel-loader"]

            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }, {
                test: /\.scss|css$/,
                use: ["style-loader", "css-loader", "postcss-loader?sourceMap", "resolve-url-loader", "sass-loader?sourceMap"]
            }
        ]
    },
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    priority: -10,
                    reuseExistingChunk: false,
                    test: /node_modules\/(.*)\.js/
                }
            }
        },
    },
    performance: { hints: false },
    plugins: [new HtmlWebpackPlugin({template: './src/index.html'})]
}

module.exports = config