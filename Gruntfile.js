module.exports = function (grunt) {
  grunt.initConfig({
    uglify: {
      main: {
        options: {
          preserveComments: 'some'
        },
        files: {
          'ng-stomp.min.js': ['ng-stomp.js'],
          'ng-stomp.standalone.min.js': [
            'bower_components/sockjs/sockjs.min.js',
            'bower_components/stomp-websocket/lib/stomp.min.js',
            'bower_components/stompie/stompie-min.js',
            'ng-stomp.js'
          ]
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