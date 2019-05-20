const path = require('path');
var prod = process.env.NODE_ENV === 'production'

module.exports = {
  output: 'ec-dist',
  source: 'src',
  wpyExt: '.wpy',
  build: {
    web: {
    }
  },
  resolve: {
    alias: {
      counter: path.join(__dirname, 'src/components/counter'),
      '@': path.join(__dirname, 'src')
    },
    modules: ['node_modules']
  },
  compilers: {
    less: {
      compress: true
    },
    sass: {
      outputStyle: 'compact'
    },
    babel: {
      sourceMap: true,
      presets: [
        'es2015',
        'stage-1'
      ],
      plugins: [
        'transform-decorators-legacy',
        'transform-export-extensions',
        'syntax-export-extensions'
      ]
    }
  },
  plugins: {
  },
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
}

if (prod) {

  delete module.exports.compilers.babel.sourcesMap;
  //样式文件不压缩，压缩会导致一个不可预料的错误
  // 压缩sass
  //module.exports.compilers['sass'] = {outputStyle: 'compressed'}

  // 压缩less
  //module.exports.compilers['less'] = {compress: true}

  // 压缩js
  module.exports.plugins = {
    uglifyjs: {
      filter: /\.js$/,
      config: {
      }
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    }
  }
}
