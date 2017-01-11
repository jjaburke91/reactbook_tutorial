
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        babel: {
            options: {
                plugins: ['transform-react-jsx'], // npm install babel-plugin-transform-react-jsx
                presets: ['es2015', 'react'] // npm install babel-preset-es2015 babel-preset-react
            },
            jsx: {
                files: [{
                    expand: true,
                    cwd: 'src/js',
                    src: ['*.jsx'],
                    dest: 'dist/js/',
                    ext: '.js'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-babel');

    grunt.registerTask('dev',  [
        'babel'
    ]);

};
