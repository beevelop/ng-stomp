module.exports = function (grunt) {
	grunt.initConfig({
		uglify: {
			main: {
				files: {
					'ng-stomp.min.js': ['ng-stomp.js']
				}
			}
		},
        jshint: {
            all: ['*.js', '!*.min.js']
        }
 	});

 	grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('default', ['jshint', 'uglify']);
};