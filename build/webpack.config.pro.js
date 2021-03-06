var webpack = require("webpack"),
    path = require("path"),
    fs = require('fs-extra'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    assets = path.resolve(__dirname, "../"),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    AssetsWebpackPlugin = require('assets-webpack-plugin');
    // ExtractTextPlugin = require("extract-text-webpack-plugin");
    var buildName = '[hash]';


fs.emptyDirSync('./dist');

var config = Object.assign({}, {
    devtool: "source-map",
    devServer: "../assets/dist",
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin(buildName+'.css'),
        new AssetsWebpackPlugin({
            filename: 'assets.json',
            prettyPrint: true,
            fullPath: true,
            processOutput: function (assets) {
                Object.keys(assets).forEach(function (key) {
                    Object.keys(assets[key]).forEach(function (k) {
                        assets[key][k] =  assets[key][k];
                    });
                });
                return JSON.stringify(assets, null, 4);
            }
        })
    ],
    entry: {
      'index': './src/index.jsx'
    },
    output: {
        // path: path.join(assets, "dist"),
        // filename: buildName+'.js' 
        path: 'dist',
        filename: buildName + '.js',
        publicPath: ''
   
    },
    module:{
        loaders:[{
            test:/\.js$/,
            loader:"babel",
        },{
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract(['css','sass'])
        },
        {
            test: /\.(png|jpg|jpeg)(\?.*)?$/,
            loader: 'url?limit=5120'
        },
        {
            test: /\.json$/,
            loader: 'json'
        },
        {
            test: /\.tpl$/,
            loader: 'html'
        },
        {
            test: /\.jsx$/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015']
            }
        },
        {
            test: /\.json$/,
            loader: 'json',
            exclude: /node_modules/,
          }
        ]
    }
});


compiler = webpack(config);
compiler.run(function (err, status) {
    if (err) {
        console.log(err);
    }
});
