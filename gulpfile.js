var gulp           = require('gulp'),
	gutil          = require('gulp-util' ),
	sass           = require('gulp-sass'),
	browserSync    = require('browser-sync'),
	autoprefixer   = require('gulp-autoprefixer'),
	bourbon        = require('node-bourbon'),
	notify         = require("gulp-notify"),
	cssbeautify    = require('gulp-cssbeautify');

// Browser Synk
gulp.task('browser-sync', function() {
	browserSync({ server: { baseDir: '' }, notify: false });
});

// Слежение за JS
gulp.task('scripts', function() {
	return gulp.src('js/**/*.js')
	.pipe(browserSync.reload({stream: true}));
});

// SASS Компиляция
gulp.task('sass', function() {
	return gulp.src('sass/**/*.sass')
	.pipe(sass({
		includePaths: bourbon.includePaths
	}).on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cssbeautify({indent: '	'}))
	.pipe(gulp.dest('css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'scripts', 'browser-sync'], function() {
	gulp.watch('sass/**/*.sass', ['sass']);
	gulp.watch('js/**/*.js', ['scripts']);
	gulp.watch('**/*.html', browserSync.reload);
});

gulp.task('default', ['watch']);
