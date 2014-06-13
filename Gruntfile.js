module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            pass_me_not: {
                files: {
                    'css/application.css': ["css/application.less"]
                }
            }
        },
        watch: {
            css: {
                files: ['css/**/*.less'],
                tasks: ['less']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', ['less']);
};