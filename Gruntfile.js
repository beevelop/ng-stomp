module.exports = function (grunt) {
  var standaloneFiles = [
    'bower_components/sockjs-client/dist/sockjs.min.js',
    'bower_components/stomp-websocket/lib/stomp.min.js',
    'src/ng-stomp.js'
  ]

  grunt.initConfig({
    fileExists: {
      scripts: standaloneFiles
    },
    uglify: {
      main: {
        options: {
          preserveComments: 'some'
        },
        files: {
          'dist/ng-stomp.min.js': ['src/ng-stomp.js'],
          'dist/ng-stomp.standalone.min.js': standaloneFiles
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-file-exists')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.registerTask('default', ['fileExists', 'uglify'])
}
