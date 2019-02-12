const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../server/public'),
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000'
      }
    }
  },
  pages: {
    login: {
      entry: 'src/entry/login/main.js',
      template: 'public/index.html',
      filename: 'login/index.html',
      title: 'Login | pvpasm'
    },
    register: {
      entry: 'src/entry/register/main.js',
      template: 'public/index.html',
      filename: 'register/index.html',
      title: 'Register | pvpasm'
    },
    home: {
      entry: 'src/entry/home/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'pvpasm'
    },
    leaderboard: {
      entry: 'src/entry/leaderboard/main.js',
      template: 'public/index.html',
      filename: 'leaderboard/index.html',
      title: 'Leaderboard | pvpasm'
    },
    challenge: {
      entry: 'src/entry/challenge/main.js',
      template: 'public/index.html',
      filename: 'challenge/index.html',
      title: 'Challenge | pvpasm'
    },
    classic: {
      entry: 'src/entry/classic/main.js',
      template: 'public/index.html',
      filename: 'classic/index.html',
      title: 'Classic | pvpasm'
    }
  }
}