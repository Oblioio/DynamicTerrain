console.log('HEY THERE POST CSS!!!!');

module.exports = {
    parser: 'postcss-scss',
    plugins: [
        require('postcss-easy-import'),
        require('autoprefixer'),
        require('precss')({
            extension: 'scss'
        })
    ]
};

// const precss = require('precss');
// const autoprefixer = require('autoprefixer');

// module.exports = {
//     parser: 'postcss-scss',
//     plugins: {
//         precss: precss,
//         autoprefixer: autoprefixer({ browsers: ['last 2 versions', 'iOS >= 8'] })
//     },
// };