const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = [
  {
    entry: {
			style: [
				'./src/sass/style.scss',
			],
    },
    devServer: {
      contentBase: './dist',
      watchContentBase: true,
      port: 3000,
      open: true,
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
          use: [
            {
              loader: 'url-loader?limit=100000&name=img/[name].[ext]',
            },
          ],
        },
      ],
    },
    plugins: [
			new CleanWebpackPlugin(),
			new MiniCssExtractPlugin({
				filename: 'css/style.css',
			}),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, 'public/img/'),
          to: path.resolve(__dirname, 'dist/img/'),
				},
				{
					from: path.resolve(__dirname, 'public/index.html'),
					to: path.resolve(__dirname, 'dist/index.html'),
				},
      ]),
    ],
  },
];
