'use strict';

const gulp         = require( 'gulp' );
const postcss      = require( 'gulp-postcss' );
const sourcemaps   = require( 'gulp-sourcemaps' );
const cssnano      = require( 'cssnano' );
const precss       = require( 'precss' );
const cssnext      = require( 'postcss-cssnext' )( { warnForDuplicates: false } );
const autoprefixer = require( 'autoprefixer' )(
	{ browsers: [ 'last 3 versions', '> 5%', 'ie 10', 'ie 11', 'not ie <= 9' ], add: false }
);
const ext_replace  = require( 'gulp-ext-replace' );
const concatCss    = require( 'gulp-concat-css' );
const concat       = require( 'gulp-concat' );
const image        = require( 'gulp-image' )();

const config = {
	from : './resources/assets/',
	to   : './public/',
	views: './resources/views/',

	css   : 'css',
	js    : 'js',
	images: 'images',
	fonts : 'fonts'
};

gulp.task( 'default', [ 'css', 'partials-css', 'images', 'js', 'partials-js' ] );

gulp.task( 'css', function runCss() {
	return gulp.src( [
						 config.from + config.css + '/**/*.pcss',
						 config.views + '**/*.pcss',
						 '!' + config.views + 'partials/**/*.pcss'
					 ] )
			   .pipe( sourcemaps.init() )
			   .pipe( postcss( [ cssnext, precss, cssnano, autoprefixer ] ) )
			   .pipe( ext_replace( '.css' ) )
			   .pipe( sourcemaps.write( '.' ) )
			   .pipe( gulp.dest( config.to + config.css + '/' ) );
} );

gulp.task( 'partials-css', function runViewsCss() {
	return gulp.src( config.views + 'partials/**/*.pcss' )
			   .pipe( sourcemaps.init() )
			   .pipe( postcss( [ cssnext, precss, cssnano, autoprefixer ] ) )
			   .pipe( ext_replace( '.css' ) )
			   .pipe( concatCss( 'common.css' ) )
			   .pipe( sourcemaps.write( '.' ) )
			   .pipe( gulp.dest( config.to + config.css + '/' ) );
} );

gulp.task( 'images', function runImages() {
	return gulp.src( [ config.from + config.images + '/**/*', config.views + '**/*.jpg' ] )
			   .pipe( image )
			   .pipe( gulp.dest( config.to + config.images + '/' ) );
} );

gulp.task( 'js', function runJs() {
	return gulp.src( [
						 config.from + config.js + '/**/*.js',
						 config.views + '**/*.js',
						 '!' + config.views + 'partials/**/*.js'
					 ] )
			   .pipe( sourcemaps.init() )
			   .pipe( sourcemaps.write( '.' ) )
			   .pipe( gulp.dest( config.to + config.js + '/' ) );
} );

gulp.task( 'partials-js', function runViewsJs() {
	return gulp.src( config.views + 'partials/**/*.js' )
			   .pipe( sourcemaps.init() )
			   .pipe( concat( 'common.js' ) )
			   .pipe( sourcemaps.write( '.' ) )
			   .pipe( gulp.dest( config.to + config.js + '/' ) );
} );

gulp.task( 'watch', [ 'default' ], function () {

	return gulp.watch(
		[
			config.from + '**/*.pcss',
			config.views + '**/**/*.pcss',
			config.from + '**/*.js',
			config.views + '**/**/*.js'
		], [ 'css', 'partials-css', 'js', 'partials-js' ]
	);

} );