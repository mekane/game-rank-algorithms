const path = require('path');

const rankBundle = {
    entry: './src/Merger.js',
    mode: 'production',
    target: 'web',
    output: {
        filename: 'rank.bundle.js',
        library: 'Rank',
        path: path.resolve(__dirname, 'build')
    }
}

module.exports = rankBundle;
