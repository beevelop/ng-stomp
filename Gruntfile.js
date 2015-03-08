module.exports = function (grunt) {
	grunt.initConfig({
		uglify: {
			main: {
				files: {
					'ng-stomp.min.js': ['ng-stomp.js']
				}
			}
		}
 	});

 	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['uglify']);
};