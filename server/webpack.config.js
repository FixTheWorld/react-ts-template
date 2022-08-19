const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")//用于把HTML页面放入内存
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const minicss = require("mini-css-extract-plugin")//webpack4.0以后的打包css文件
const webpack = require("webpack")
const htmlplugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, '../public/index.html'),//源头文件
    filename: "index.html",//生成首页的文件名称
    minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true
    }
})
const css = new minicss({//输出css独立文件
    filename: "./css/[name].css",
    chunkFilename: "[name].css"//或者id
})

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';

// Variable used for enabling profiling in Production
// passed into alias object. Uses a flag if passed into the build command

// We will provide `paths.publicUrlOrPath` to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
// Get environment variables to inject into our app.
const shouldUseReactRefresh = false;

module.exports = {//webpack基于node构建的
    mode: "development",
    entry: ['webpack-hot-middleware/client', path.join(__dirname, '../src/index.tsx')],
    output: {
        // filename: 'main.[hash:8].js',//通过热加载输出script文件挂载在目录与index.HTML一样
        path: path.resolve(__dirname, 'build'),
        publicPath:'/',

        filename: isEnvProduction
            ? 'static/js/[name].[contenthash:8].js'
            : isEnvDevelopment && 'static/js/bundle.[contenthash:8].js',
        // There are also additional JS chunk files if you use code splitting.
        chunkFilename: isEnvProduction
            ? 'static/js/[name].[contenthash:8].chunk.js'
            : isEnvDevelopment && 'static/js/[name].chunk.js',
        assetModuleFilename: 'static/media/[name].[hash][ext]',
    },
    watchOptions: {
        poll: 1000,
        // aggregateTimeOut: 500,
        ignored: /node_modules/
    },
    //production 提供了约定大于配置 约定打包文件是src/index ->dist/main
    plugins: [
        htmlplugin,
        new CleanWebpackPlugin(),
        css,
        new webpack.HotModuleReplacementPlugin()
        //    new clernWebpackPlugin('./dist')
    ],
    module: {//所以第三方模块的配置规则
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                include: path.join(__dirname, '../src'),
                loader: require.resolve('babel-loader'),
                options: {
                    customize: require.resolve(
                        'babel-preset-react-app/webpack-overrides'
                    ),
                    presets: [
                        [
                            require.resolve('babel-preset-react-app'),
                            {
                                runtime: 'automatic'
                            },
                        ],
                    ],

                    plugins: [
                        isEnvDevelopment &&
                        shouldUseReactRefresh &&
                        require.resolve('react-refresh/babel'),
                    ].filter(Boolean),
                    // This is a feature of `babel-loader` for webpack (not Babel itself).
                    // It enables caching results in ./node_modules/.cache/babel-loader/
                    // directory for faster rebuilds.
                    cacheDirectory: true,
                    // See #6846 for context on why cacheCompression is disabled
                    cacheCompression: false,
                    compact: isEnvProduction,
                },
            },
            {
                test: /\.scss$/,
                // use: [
                //   'vue-style-loader',
                //   'css-loader',
                //   'sass-loader'
                // ]

                use: [{ loader: minicss.loader }, {
                    loader: 'css-loader',
                    options: { modules: true }
                }, 'sass-loader']
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000

                }
            },
            // { test:/\.js|\jsx$/,use:[{loader:"babel-loader",options:{cacheDirectory:true}}],exclude:/node_modules/},//一个属性use:"babel-loader"两个是数组
            // // { test:/\.css/,use:['style-loader','css-loader']},
            { test: /\.css$/, use: [{ loader: minicss.loader }, 'css-loader'] },
            //     { test:/\.scss/,use:['style-loader',  {loader: "css-loader",
            //     options: {//这个是react的css模块化
            //        modules: {
            //            localIdentName: "[path][name]-[local]-[hash:5]"
            //        }//import css from '路径' console.log(css)会生成模块
            //        //这是react的处理办法 vue就是style里面写scoped
            //        //支持id与class 控制台输出的模块是健对值形式
            //     }//css scss less一样的配置模块化
            //    }]},
            {
                test: /\.(jpg|PNG|png|jpeg)/, use: [{
                    loader: "url-loader", options: {
                        outputPath: "images/",
                        limit: 1024,//单位是B 大于这个会打包出来
                        name: "[name].[ext]"
                    }
                }]
            },
            { test: /.vue$/, use: [{ loader: "vue-loader" }] },

        ]
    },
    devtool: "hidden-source-map",//inline把js打包在一个文件里面 hidden分离出来 eval也是分离 
    optimization: {//代码分割 下面vendors就是分割代码之后(把相同的库或者文件都提出来打包) 你可能在想css文件去哪了 你注销代码分割 你可以看见css文件夹
        splitChunks: {
            chunks: "all"
        }
    },
    resolve: {
        // 将 `.ts` 添加为一个可解析的扩展名。
        extensions: ['.js', '.vue', '.ts','.tsx', '.json']
    },
    devServer: {
        port: 8080,
        hot: true,
        progress: true,
        historyApiFallback: true
        //true 表示webpack支持使用history false路由默认是hash
    }
}
