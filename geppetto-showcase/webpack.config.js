const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
  entry: './src/index.js',
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: { historyApiFallback: true },
  node: { fs: 'empty', },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/'
  },
  resolve: { extensions: ['*', '.js', '.json', '.ts', '.tsx', '.jsx'], },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules\/(?!(@metacell)\/).*/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { modules: false }],
            '@babel/preset-react',
            { plugins: ['@babel/plugin-proposal-class-properties'] },
          ],
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.html$/,
        use: [{ loader: 'html-loader' }],
      },
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: {},
        },
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.s[a|c]ss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(png|gif|jpg|cur)$/i,
        loader: 'url-loader',
      },
      {
        test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        loader: 'url-loader',
        options: { limit: 10000, mimetype: 'application/font-woff2' },
      },
      {
        test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        loader: 'url-loader',
        options: { limit: 10000, mimetype: 'application/font-woff' },
      },
      {
        test: /\.(ttf|eot|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        loader: 'file-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.md$/,
        use: [{ loader: 'html-loader' }, { loader: 'markdown-loader' }],
      },
      {
        test: /\.dat$/i,
        use: [
          {
            loader: 'raw-loader',
            options: { esModule: false, },
          },
        ],
      },
      {
        test: /\.obj|\.drc|\.gltf/,
        loader: 'url-loader',
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      }
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      favicon: 'node_modules/@metacell/geppetto-meta-client/style/favicon.png',
    }),
    new CopyPlugin(
      {
        patterns: [
          { from: path.resolve(__dirname, "./src/examples/3d-canvas/models"), to: "assets" },
          { from: path.resolve(__dirname, "./src/examples/list-viewer/instances-small.js"), to: "instances-small.js" },
          { from: path.resolve(__dirname, "./src/examples/connectivity-viewer/model.js"), to: "model.js" },
          { from: path.resolve(__dirname, "./src/examples/plot/model.js"), to: "model.js" },
          { from: path.resolve(__dirname, "./src/examples/menu/model.json"), to: "model.json" },
          { from: path.resolve(__dirname, "./src/examples/vr-canvas/auditory_cortex.json"), to: "auditory_cortex.json" },
        ]
      },
    ),
  ],
});
