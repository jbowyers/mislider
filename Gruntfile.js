module.exports = function (grunt) {

	// Project configuration ---------------------------------------------------
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.title %> <%= grunt.template.today("yyyy-mm-dd") %> verison <%= pkg.version %> */\n' + '/* <%= pkg.repository.url %> */\n'
			},
			dist: {
				src: 'src/js/mislider.js',
				dest: 'dist/js/mislider.min.js'
			}
		},
		copy: {
			dist: {
				files: [
					{
						expand: true,
						cwd: 'src/js/',
						src: ['**'],
						dest: 'dist/js/'
					}
				]
			},
			deploy: {
				files: [
					{
						expand: true,
						cwd: 'dist/js/',
						src: ['**'],
						dest: '<%= pkg.directories.deploy.js %>'
					},
					{
						expand: true,
						cwd: 'dist/css/',
						src: ['**'],
						dest: '<%= pkg.directories.deploy.css %>'
					}
				]
			},
			demo: {
				files: [
					{
						expand: true,
						cwd: 'dist/js/',
						src: ['**'],
						dest: 'demo/js/'
					},
					{
						expand: true,
						cwd: 'dist/css/',
						src: ['**'],
						dest: 'demo/css/'
					},
					{
						expand: true,
						src: ['LICENCE.txt'],
						dest: 'demo/'
					}
				]
			}
		},
		concat: {
			css: {
				files: [
					// cameo skin
					{
						src: ['src/css/mislider-core.css', 'src/css/mislider-skin-cameo.css'],
						dest: 'dist/css/mislider-cameo.css'
					}
				]
			}
		},
		markdown: {
			readme: {
				files: [
					{
				  		expand: true,
				  		src: 'README.md',
				  		dest: 'templates/',
				  		ext: '.html'
					}
				],
				options: {
					template: 'templates/md-blank.html'
				}
			}
		},
		includes: {
			demo: {
				options: {
					includePath: 'templates/'
				},
				files: [
					{
						cwd: 'src/',
						src: 'demo.html', // Source files
						dest: 'demo/index.html', // Destination file
					}
				]
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
				globals: {
					jQuery: true
				}
			},
			files: {
				src: ['src/**/*.js']
			}
		},
		jscs: {
			all: {
				options: {
					standard: 'jquery',
					report: 'full'
				},
				files: {
					src: ['src/js/mislider.js' ]
				}
			}
		},
		csslint: {
			options: {
				'important': false,
				'adjoining-classes': false,
				'known-properties': true,
				'box-sizing': false,
				'box-model': true,
				'overqualified-elements': true,
				'display-property-grouping': true,
				'bulletproof-font-face': true,
				'compatible-vendor-prefixes': true,
				'regex-selectors': true,
				'errors': true,
				'duplicate-background-images': true,
				'duplicate-properties': true,
				'empty-rules': true,
				'selector-max-approaching': true,
				'gradients': true,
				'fallback-colors': true,
				'font-sizes': true,
				'font-faces': true,
				'floats': true,
				'star-property-hack': true,
				'outline-none': true,
				'import': true,
				'ids': false,
				'underscore-property-hack': true,
				'rules-count': true,
				'qualified-headings': true,
				'selector-max': true,
				'shorthand': true,
				'text-indent': true,
				'unique-headings': true,
				'universal-selector': false,
				'unqualified-attributes': true,
				'vendor-prefix': true,
				'zero-units': true
				},
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
				src: ['*.html']
			}
		},
		jsonlint: {
			root: {
				src: ['*.json']
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
	// set the grunt force option
	grunt.option("force", true);

	// Load grunt tasksfrom NPM packages
	require( 'load-grunt-tasks' )( grunt );

	// Default task(s)
	grunt.registerTask( 'lint', [ 'jshint', 'csslint:lax', 'htmlhint', 'jsonlint', 'jscs' ] );
	grunt.registerTask( 'build', [ 'uglify', 'copy:dist', 'concat:css' ] );
	grunt.registerTask( 'demo', [ 'build', 'markdown:readme', 'includes:demo', 'copy:demo' ] );
	grunt.registerTask( 'deploy', [ 'build', 'copy:deploy' ] );
	grunt.registerTask( 'default', [ 'lint' ]);

};
