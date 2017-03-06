var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

console.log("\nThe arguments passed to webpack are:\n");
console.log(process.argv);

var getCLIParameter=function(param){
	for(var i=0;i<process.argv.length;i++){
		var arg=process.argv[i];
		if(arg.startsWith(param)){
			var value=arg.substring(arg.indexOf("=")+1).trim();
			console.log(param +":" + value);
			return value;
		}
	}
	return "";
}

console.log("\nThe arguments passed to HtmlWebpackPlugin are:\n");

//We read the command line arguments, these are passed from maven through npm to webpack
var generateTestsBundle = process.argv.indexOf('--noTest') == -1;
var contextPath = getCLIParameter("--contextPath");
var useSsl = getCLIParameter("--useSsl");
var embedded = getCLIParameter("--embedded");
var embedderURL = getCLIParameter("--embedderURL");


var publicPath = ((contextPath == '/') ? contextPath : "/"+ contextPath +"/") + "geppetto/build/" ;
console.log("\nThe public path (used by the main bundle when including split bundles) is: "+publicPath+"\n");


var entries = {
    main: "./js/pages/geppetto/main.js",
    admin: "./js/pages/admin/admin.js",

};
if (generateTestsBundle) {
    entries['tests'] = "./js/pages/tests/qunit/QUnitTests.js";
}

console.log("The Webpack entries are:\n");
console.log(entries);


var extensionConfiguration = require('./extensions/extensionsConfiguration.json');
var availableExtensions = [];
for (var extension in extensionConfiguration){
	if (extensionConfiguration[extension]){
		availableExtensions.push({from: 'extensions/' + extension.split("/")[0] + "/static/*", to: 'static', flatten: true});
	}
}
console.log("Static pages coming from extensions are:\n");
console.log(availableExtensions);


module.exports = {
//	context: __dirname,
    entry: entries,
    output: {
        path: './build/',
    	//path: path.resolve(__dirname, 'build/'),
        filename: '[name].bundle.js',
        publicPath: publicPath
    },

    plugins: [
        new CopyWebpackPlugin(availableExtensions
//        		[ { from: 'extensions/geppetto-tibs/static/biography.html',
//            to: 'biography.html' } ]
        		
        ),
        new HtmlWebpackPlugin({
            filename: 'geppetto.vm',
            template: './js/pages/geppetto/geppetto.ejs',
            contextPath: contextPath,
            embedded: embedded,
            useSsl: useSsl,
            embedderURL: embedderURL,
            //chunks: ['main'] Not specifying the chunk since its not possible yet (need to go to Webpack2) to specify UTF-8 as charset without which we have errors
            chunks: []
        }),
        new HtmlWebpackPlugin({
            filename: 'admin.vm',
            template: './js/pages/admin/admin.ejs',
            contextPath: contextPath,
            embedded: embedded,
            useSsl: useSsl,
            embedderURL: embedderURL,
            //chunks: ['admin'] Not specifying the chunk since its not possible yet (need to go to Webpack2) to specify UTF-8 as charset without which we have errors
            chunks: []
        }),
        new HtmlWebpackPlugin({
            filename: 'dashboard.vm',
            template: './js/pages/dashboard/dashboard.ejs',
            contextPath: contextPath,
            embedded: embedded,
            useSsl: useSsl,
            embedderURL: embedderURL,
            chunks: []
        }),
        new HtmlWebpackPlugin({
            filename: 'tests.vm',
            template: './js/pages/tests/tests.ejs',
            contextPath: contextPath,
            embedded: embedded,
            useSsl: useSsl,
            embedderURL: embedderURL,
            chunks: []
        }),
        new HtmlWebpackPlugin({
            filename: 'qunitTest.vm',
            template: './js/pages/tests/qunitTest.ejs',
            contextPath: contextPath,
            embedded: embedded,
            useSsl: useSsl,
            embedderURL: embedderURL,
            //chunks: ['tests'] Not specifying the chunk since its not possible yet (need to go to Webpack2) to specify UTF-8 as charset without which we have errors
            chunks: []
        }),
        new HtmlWebpackPlugin({
            filename: '../WEB-INF/web.xml',
            template: './WEB-INF/web.ejs',
            contextPath: contextPath,
            embedded: embedded,
            useSsl: useSsl,
            embedderURL: embedderURL,
            chunks: []
        }),
    ],

    resolve: {
        extensions: ['', '.js', '.json'],
    },

    module: {
        loaders: [
            {
                test: /\.(js)$/, exclude: [/node_modules/, /build/, /\.bundle/, ], loader: ['babel-loader'],
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.(py|png|svg|gif|css|jpg|md|hbs)$/,
                loader: 'ignore-loader'
            },
            {   test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file?name=/fonts/[name].[ext]'
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
             }
        ]
    },
    node: {
        fs: 'empty',
        child_process: 'empty',
        module: 'empty'
    }
};