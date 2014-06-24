module.exports = function(grunt) {
  grunt.initConfig({
    convert: {
      yaml2json: {
        files: [{
          src: 'src/data/asciibots.yml', 
          dest: 'src/asciibots.json'
        }]
      }
    },
    concat: {
      options: {
        separator: ""
      },
      vanilla: {
        src: ['src/vanilla-intro.js', 'src/asciibots.json', 'src/shared.js', 'src/vanilla-outro.js'],
        dest: 'dist/asciibots.js'
      },
      jquery: {
        src: ['src/jquery-intro.js', 'src/asciibots.json', 'src/shared.js', 'src/jquery-outro.js'],
        dest: 'dist/jquery/asciibots.js'
      }
    },
    jsbeautifier : {
      options: {
        js: {
          indentChar: " ",
          indentSize: 2
        }
      },
      files : ['dist/asciibots.js', 'dist/jquery/asciibots.js']
    },
    jshint: {
      dist: ['dist/asciibots.js', 'dist/jquery/asciibots.js']
    }
  });
  


  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-convert');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['convert', 'concat', 'jsbeautifier', 'jshint']);

};