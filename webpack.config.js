/* webpack.config.js */
var path = require('path');
var webpack = require('webpack');
var WebpackMd5Hash = require('webpack-md5-hash');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanPlugin = require('clean-webpack-plugin');

// 项目根路径
var ROOT_PATH = path.resolve(__dirname, './');
// 项目源码路径
var SRC_PATH = ROOT_PATH + '/app';
// 产出路径
var DIST_PATH = ROOT_PATH + '/build';
// 是否是开发环境
var __DEV__ = process.env.NODE_ENV !== 'npm install -g babel';

//使用缓存
var CACHE_PATH = ROOT_PATH + '/cache';
var entry = {
  index: [
      './index.js'
  ],
  vendor: ["react", "react-dom", 'react-redux', "redux", 'react-router', 'react-router-redux']
}

var loaders = [];
loaders.push({
    test: /\.js$/,
    exclude: /node_modules/,
    loader: ['babel-loader'],
    // include: [path.join(__dirname, './')],
});

// 编译 sass
loaders.push({
  test: /\.(scss|css|less)$/,
  loaders: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader', 'less-loader']
});

//图片
loaders.push({
  // test: /\.(png|jpg)$/,
  //loader: "file-loader?limit=1000&name=images/[hash:8].[name].[ext]",
  test: /\.(png|jpg|gif|svg)$/,
　loader: 'url-loader?limit=1000&name=images/[hash:8].[name].[ext]'
});

var plugins = [];
plugins.push(
    new webpack.DefinePlugin({
      // http://stackoverflow.com/questions/30030031/passing-environment-dependent-variables-in-webpack
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || 'dev')
    })
)
plugins.push(
  new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function(){
                    return [
                        require("autoprefixer")({
                            browsers: ['ie>=8','>1% in CN']
                        })
                    ]
                }
            }
        })
)
// html 页面
var HtmlwebpackPlugin = require('html-webpack-plugin');

Object.keys(entry).forEach(function(name){
  if(name != "vendor"){
    plugins.push(
      new HtmlwebpackPlugin({
        hash:true,
        filename: name + '.html',
        // 自动将引用插入html
        inject: 'html',
        chunks: [name, 'vendor'],
        template: SRC_PATH + '/index.html'
      })
    )
  }
})

//css单独打包
// plugins.push(new ExtractTextPlugin("./css/[name].min.css"))
plugins.push(new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }));

var config = {
  devtool: 'source-map',
  context: SRC_PATH,
  entry: entry,
  output: {
    path: DIST_PATH,
    filename: '[name].js',
    // 添加 chunkFilename
    chunkFilename: '[name].[chunkhash].chunk.js',
  },
  module: {
      loaders : loaders
  },
  
 
  plugins: plugins,
  devServer: {
      stats:{colors:true},
      hot: true,
      contentBase: "build/",
       proxy: [
         {  
            '/*.do*': {  
                target: 'http://10.172.31.228:8080', 
                changeOrigin: true, 
                secure: false  
            }  
        }
      ]  
  },
  //其它解决方案配置
  resolve: {
    alias: {
    }
  }
};

if(process.env.NODE_ENV == 'production'){
  delete config.devServer
  delete config.devtool
  config.plugins.push(
    //清空输出目录
    new CleanPlugin([], {
      "root": DIST_PATH,
      verbose: true,
      dry: false
    })
  )
}else{
  
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new webpack.NamedModulesPlugin());
  // 根据文件内容生成 hash
  config.plugins.push(new WebpackMd5Hash());
}
module.exports = config;