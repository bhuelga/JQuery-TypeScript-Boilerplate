/* gulpfile */

const gulp = require('gulp');
const sass = require('gulp-sass');
const ts = require('gulp-typescript');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const imageMin = require('gulp-imagemin');
const cache = require('gulp-cache');
const del = require('del');
const gulpIf = require('gulp-if');

// File Paths
const HTML_PATH = './src/**/*.html';
const SCSS_PATH = './src/scss/**/*.scss';
const CSS_PATH = './src/css';
const TS_PATH = './src/ts/**/*.ts';
const JS_PATH = './src/js';
const IMG_PATH = './src/img';
const DIST_PATH = './dist/';

const tsProject = ts.createProject("tsconfig.json");

/* Compiles .scss to .css */
function compileSass() {
	return gulp.src(SCSS_PATH)
		.pipe(sass())
		.pipe(gulp.dest(CSS_PATH))
		.pipe(browserSync.reload({
			stream : true
		}));
}

/* Compiles .ts to .js */
function compileTS() {
	return gulp.src(TS_PATH)
		.pipe(tsProject())
		.pipe(gulp.dest(JS_PATH))
		.pipe(browserSync.reload({
			stream : true
		}));
}

/* Browser Sync */
function startBrowserSync() {
	browserSync.init({
		server : {
			baseDir : 'src'
		},
	});
}

/* Condenses CSS and JS tags in HTML files and moves to dist */
function htmlCssJs() {
	return gulp.src(HTML_PATH)
		.pipe(useref())
		.pipe(gulpIf('*.js', uglify()))
		.pipe(gulpIf('*.css', cleanCSS()))
		.pipe(gulp.dest(DIST_PATH));
}

/* Minify images */
function imageMinify() {
	return gulp.src(IMG_PATH)
		.pipe(cache(imageMin()))
		.pipe(gulp.dest(DIST_PATH));
}

/* Cleans distribution directory */
function cleanDist(cb) {
	del.sync(DIST_PATH + '*');
	cb();
}

/* Clears gulp cache */
function clearCache(cb) {
	return cache.clearAll(cb);
}

/* Reload wrapper */
function reload(cb) {
	browserSync.reload();
	cb();
}

/* Watch function */
function watch() {
	gulp.watch(HTML_PATH, reload);
	gulp.watch(SCSS_PATH, gulp.series(compileSass)); 
	gulp.watch(TS_PATH, gulp.series(compileTS));
}

/*    Gulp Tasks   */

exports.cleanDist = gulp.series(cleanDist);

exports.clearCache = gulp.series(clearCache);

exports.compile = gulp.parallel(compileSass, compileTS);

exports.build = gulp.series(cleanDist,
							gulp.parallel(compileSass, 
										  compileTS),
							gulp.parallel(htmlCssJs,
										  imageMinify));

exports.default = gulp.series(gulp.parallel(compileSass, 
										    compileTS), 
							  gulp.parallel(startBrowserSync, 
											watch));