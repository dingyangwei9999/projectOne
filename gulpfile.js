var gulp = require('gulp');
var sass = require('gulp-sass');
gulp.task('compileSass',function(){
	gulp.src('webapp/sass/*.scss')
	.pipe(sass().on('error',sass.logError))
	.pipe(gulp.dest('webapp/css'))

});
gulp.task('jsCss',function(){
	gulp.watch('webapp/sass/*.scss',['compileSass']);
});

var browserSync = require('browser-sync');
gulp.task('server',function(){
	browserSync.init({
		// server:'../webapp'
		proxy:'http://localhost/bg1/',
		port:888,
		files:['webapp/**.html','webapp/css/*.css']
		
	});
	gulp.watch('webapp/sass/*.scss',['compileSass']);
});