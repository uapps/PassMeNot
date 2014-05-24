module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '\n/*!\n' +
            ' * <%= pkg.name %> v<%= pkg.version %> by vadimck & tsov\n' +
            '' +
            ' * Copyright <%= grunt.template.today("yyyy") %> PassMeNot\n' +
            '' +
            ' */\n',
        less: {
            pass_me_not: {
                files: {
                    'build/<%= pkg.name %>-<%= pkg.version %>.css': ["css/app.less"]
                }
            }
        },
        html2js: {
            options: {
                module: 'pass-me-not.templates',
                rename: function(moduleName) {
                    return '/pass-me-not' + moduleName.match(/\/[\w-]*\.html/);
                }
            },
            main: {
                src: ['partials/share.html'],
                dest: 'js/templates.js'
            }
        },
        concat: {
            'pass_me_not_js': {
                src: [
                    'js/angular/angular.js',
                    'js/angular/angular-route.js',
                    'js/angular/angular-animate.js',
                    'js/angular-ui.min.js',
                    'js/templates.js',
                    'js/app.js'
                ],
                dest: 'build/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            pass_me_not_js: {
                src: ['<%= concat.pass_me_not_js.dest %>'],
                dest: 'build/<%= pkg.name %>-<%= pkg.version %>.min.js'
            }
        },
        cssmin: {
            add_banner: {
                options: {
                    banner: '<%= banner %>'
                },
                files: {
                    'build/<%= pkg.name %>-<%= pkg.version %>.min.css': ['build/<%= pkg.name %>-<%= pkg.version %>.css']
                }
            }
        },
        watch: {
            css: {
                files: ['css/**/*.less'],
                tasks: ['less', 'cssmin']
            },
            js: {
                files: ['js/**/*.js'],
                tasks: ['concat', 'uglify']
            },
            html: {
                files: ['partials/share.html'],
                tasks: ['html2js', 'concat', 'uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('build', ['less', 'html2js' ,'concat', 'uglify', 'cssmin']);
};