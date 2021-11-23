const { getProjectRoot } = require('./utils')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const tailwindcss = require('@tailwindcss/postcss7-compat')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const outputPath = require('./outputPath')

const siteRoot = path.join(getProjectRoot())
module.exports = {
  entry: {
    index: `${siteRoot}/app.jsx`
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            options: {
              rootMode: 'upward'
            }
          },
          {
            test: /\.html$/,
            loader: 'html-withimg-loader'
          },
          {
            test: /\.yml$/,
            loader: 'json-loader!yaml-loader'
          },
          {
            test: /\.md$/,
            loader: `babel-loader!${path.join(
              __dirname,
              './markdown-import-loader.js'
            )}`
          },
          {
            test: /\.(css|scss|sass)(\?.*)?$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    autoprefixer({
                      overrideBrowserslist: [
                        'ie >= 9',
                        'Chrome >= 21',
                        'Firefox >= 1',
                        'Edge >= 13',
                        'last 3 versions'
                      ],
                      flexbox: 'no-2009'
                    }),
                    tailwindcss
                  ]
                }
              },
              'sass-loader'
            ]
          },
          {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'file-loader',
            options: {
              name: 'media/[name].[ext]'
            }
          },
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'file-loader',
            options: {
              limit: 3000,
              name: 'fonts/[name].[ext]'
            }
          },
          {
            test: /\.(png|jpe?g|gif|bpm|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 3000,
              name: 'img/[name].[ext]'
            }
          },
          {
            exclude: /\.js|\.css|\.scss|\.sass|\.html|\.json|\.ejs$/,
            loader: 'url-loader',
            options: {
              limit: 2000,
              name: 'ext/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@md': path.resolve(__dirname, '../markdown/')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${siteRoot}/index.html`
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(siteRoot, 'static'),
        to: path.resolve(getProjectRoot(), outputPath.output)
      }
    ])
  ]
}
