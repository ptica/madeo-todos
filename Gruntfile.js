module.exports = function(grunt) {
	grunt.initConfig({
		// copy bootstrap fonts
		copy: {
			all: {
				files: [
					{	expand: true,
						cwd: 'Vendor/bootstrap/fonts',
						src: '*',
						dest:'webroot/fonts/',
						filter:'isFile'
					},
					{	expand: true,
						cwd: 'Vendor/font-awesome/fonts',
						src: '*',
						dest:'webroot/fonts/',
						filter:'isFile'
					}
				]
			}
		},
		// react offline transform
		react: {
			all: {
				files: {
					'dist/jsx-combined.js': [ 'jsx/**.jsx' ]
				}
			}
		},
		postcss: {
			options: {
				map: false,
				processors: [
					require('autoprefixer-core')({browsers: ['last 2 versions']}).postcss
				]
			},
			dist: {
				src: 'webroot/css/*.css'
			}
		},
		// extract pot file from handlebars templates
		jspot: {
			all: {
				options: {
					keyword: 'i18n'
				},
				files: {
					'Locale': ['Plugin/BlueUpload/View/Elements/*.hbs', 'js/app.js']
				}
			}
		},
		// convert translated po files into json
		po2json: {
			all: {
				options: {
					format: 'jed',
					pretty: true
				},
				src: ['Locale/**/messages.po'],
				dest: 'dist/js/'
			}
		},
		// load i18n json data into [window.]App.messages
		json: {
			all: {
				options: {
					namespace: 'App',
					includePath: false,
					processName: function(filename) {
						return filename.toLowerCase();
					}
				},
				src: ['dist/js/*.json'],
				dest: 'dist/js/messages.js'
			}
		},
		// precompile handlebars templates into [window.]App.render
		handlebars: {
			all: {
				options: {
					namespace: 'App.render',
					processName: function(filePath) {
						return filePath
							.replace(/^Plugin\/BlueUpload\/View\/Elements\//, 'BlueUpload/')
							.replace(/^View\//, '/')
							.replace(/\.hbs$/, '');
					}
				},
				files: {
					'js/templates.js': ['View/**/*.hbs']
				}
			}
		},
		// concatenate all js & css files
		concat: {
			js: {
				src: [
					'Vendor/es5-shim/es5-shim.js',
					'Vendor/es5-shim/es5-sham.js',
					'Vendor/jquery/dist/jquery.js',
				],
				dest: 'webroot/js/site-pre.js',
				nonull: true,
				options: {
					separator: ';\n'
				}
			},
			js_post: {
				src: [
					'Vendor/bootstrap/dist/js/bootstrap.js',
					'Vendor/bootbox.js/bootbox.js',
					'Vendor/Sortable/Sortable.js',
					'js/*.js'
				],
				dest: 'webroot/js/site-post.js',
				nonull: true,
				options: {
					separator: ';\n'
				}
			},
			css_admin: {
				src: [
					'Vendor/bootstrap/dist/css/bootstrap.css',
					'css/*.css'
				],
				dest: 'webroot/css/site-admin.css',
				nonull: true,
				options: {
					separator: '\n'
				}
			}
		},
		// compile less into css
		less: {
			development: {
				options: {
					compress: true
				},
				files: {
					'dist/bs-custom.css':'css/overrides/bs-custom.less',
				}
			}
		},
		// minifications
		uglify: {
			options: {
				mangle: false
			},
			site: {
				files: {
					'webroot/js/site-post.js': 'webroot/js/site-post.js',
					'webroot/js/site-pre.js': 'webroot/js/site-pre.js'
				}
			}
		},
		cssmin: {
			site: {
				files: {
					'webroot/css/site.css': 'webroot/css/site.css'
				}
			}
		},
		// tests
		phpunit: {
				// cakephp2 has not suitable bootstrap for phpunit.xml
				// (cakephp3 fixes this)
				// so we resort to running the cake wrapper instead
				cases: {
					dir: 'AllTests'
				},
				options: {
					bin: 'Vendor/bin/cake test app',
				}
		},
		watch: {
			stylesheets: {
				files: ['<%= concat.css.src %>', '<%= concat.css_admin.src %>', 'webroot/**/*.less'],
				tasks: ['stylesheets']
			},
			scripts: {
				files: ['Locale/**/messages.po', 'jsx/**.jsx', '<%= concat.js.src %>', '<%= concat.js_post.src %>', 'Plugin/BlueUpload/View/Elements/*.hbs', 'View/**/*.hbs'],
				tasks: ['scripts']
			},
			grunt: {
				files: ['Gruntfile.js'],
				tasks: ['default']
			}
		}
	});

	// Plugin loading
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-phpunit');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-jspot');
	grunt.loadNpmTasks('grunt-po2json');
	grunt.loadNpmTasks('grunt-json');
	grunt.loadNpmTasks('grunt-react');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Task definition
	grunt.registerTask('default', ['scripts', 'stylesheets', 'copy']);
	grunt.registerTask('stylesheets', ['concat:css_admin', /*'postcss'*/ 'cssmin']);
	grunt.registerTask('scripts', ['react', 'concat:js', 'concat:js_post']);

	grunt.registerTask('locales', ['po2json', 'json']);
	//grunt.registerTask('stylesheets', ['less', 'concat:css', 'cssmin']);
	//grunt.registerTask('scripts', ['locales', 'handlebars', 'concat:js', 'uglify']);
	// uglify on direct invocation only as it is slow
	grunt.registerTask('scripts-min', ['locales', 'handlebars', 'concat:js', 'uglify']);
	//grunt.registerTask('scripts', ['locales', 'handlebars', 'concat:js']);
};
