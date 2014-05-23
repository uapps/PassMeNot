module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '\n/*!\n' +
		  ' * <%= pkg.name %> v<%= pkg.version %> by vadimck & tsov\n' +
		  '' +
		  ' * Copyright <%= grunt.template.today("yyyy") %> PassMeNot\n' +
		  '' +
		  ' */\n',

		less: {
			air_menu_min: {
				options: {
					paths: ['less']
				},
				files: {
					"css/<%= pkg.title %>-<%= pkg.version %>.css": ["css/app.less"]
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