module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.title %> <%= grunt.template.today("yyyy-mm-dd") %> verison <%= pkg.version %> */\n' + '/* <%= pkg.repository.url %> */\n'
      },
      dist: {
        src: 'src/mislider.js',
        dest: 'dist/mislider.min.js'
      }
    },
    concat: {
      options: {},
      dist: {
      	js: { // copy
      		src: ['src/js'], 
      		dest: 'dist/js'
      	},
      	css: {
      		cameo: {// concat
      			src: ['src/css/mislider-core.css', 'src/css/mislider-skin-cameo.css'],
      			dest: 'dist/css/mislider-cameo.css',
      		}
        }
      },
      deploy: {
      	js: { // copy
      		src: ['dist/js'], 
					dest: '<%= pkg.directories.deploy.js %>'
      	},
      	css: { // copy
      		src: ['dist/css'], 
					dest: '<%= pkg.directories.deploy.css %>'
      	}
      },
      demo: {
      	js: { // copy
      		src: ['dist/js'], 
					dest: 'demo/'
      	},
      	css: { // copy
      		src: ['dist/css'],
					dest: 'demo/'
      	},
      	licence: { // copy
  				src: ['licence.txt'],
  				dest: 'demo/'
				}
      }
    },
    markdown: {
      readme: {
        files: [
          {
            expand: true,
            src: 'readme.md',
            dest: ['demo/'],
            ext: '.html'
          }
        ]
      }
    },
    includes: {
      demo: {
        src: ['demo/sample.html', 'demo/readme.html'], // Source files
        dest: 'demo/index.html', // Destination file
        flatten: true,
        cwd: '.',
        options: {
          silent: true,
          banner: '<!-- grunt-includes readme.html  -->'
        }
      }
    },
    connect: {
      demo: {
      	options: {
      		port: 9002,
      		base: 'demo/',
      		keepalive: true
      	}
      }
    },
    watch: {
      js: {
        files: 'src/js/*.js',
        tasks: ['jshint', 'jscs'],
        options: {
          debounceDelay: 250
        }
      },
    	css: {
  			files: 'src/css/*.css',
  			tasks: ['csslint'],
  			options: {
  				debounceDelay: 250
  			}
    	},
    	html: {
    		files: ['src/**/*.html', '*.html', 'demo/**/*.html'],
    		tasks: ['htmlhint'],
    		options: {
    			debounceDelay: 250
    		}
    	},
    	json: {
  			files: '*.json',
  			tasks: ['jsonlint'],
  			options: {
  				debounceDelay: 250
  			}
			}
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: false,
        browser: true,
        quotmark: 'single',
        globals: {
          jQuery: true
        }
      },
      files: {
        src: ['src/**/*.js']
      }
    },
    jscs: {
      src: ['src/**/*.js'],
      options: {}
    },
    csslint: {
      strict: {
        options: {
          import: 2
        },
        src: ['src/**/*.css']
      },
      lax: {
        options: {
          import: false
        },
        src: ['src/**/*.css']
      }
    },
    htmlhint: {
      options: {
        'tag-pair': true
      },
      src: {
        src: ['src/**/*.html']
      },
      root: {
        src: ['/*.html']
      }
    },
    jsonlint: {
      root: {
        src: ['/*.json']
      }
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        commit: false,
        createTag: false,
        push: false
      }
    }
    
      
  });

  // Load grunt tasksfrom NPM packages
  require('load-grunt-tasks')(grunt);

  // Default task(s).
  grunt.registerTask('lint', ['jshint', 'jscs', 'csslint', 'htmlhint', 'jsonlint']);
  grunt.registerTask('build', ['lint', 'uglify', 'concat:dist']);
  grunt.registerTask('demo', ['build', 'markdown:readme', 'includes:demo', 'concat:demo', 'connect:demo']);
  grunt.registerTask('deploy', ['build', 'concat:deploy']);
  grunt.registerTask('default', ['lint']);

};
