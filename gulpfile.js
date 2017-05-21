//创建gulp任务  用来编译sass文件
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('buildSass',function(){
	//先查找文件所在位置
	gulp.src('src/sass/*.scss')
	//通过pipe方法导入到gulp插件中实现编译
	.pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))
	//文件输出
	.pipe(gulp.dest('src/css'));
})

//监听文件修改  执行响应文件
gulp.task('jtSass',function(){
	gulp.watch('src/sass/*.scss',['buildSass']);
});

// // 同步任务
// var browserSync = require('browser-sync');
// gulp.task('server',function(){
// 	browserSync({
// 		// server: "./src",

// 		// 代理服务器
// 		proxy:'http://localhost/project/',

// 		// 自定义端口
// 		//port:999,

// 		// 监听文件修改，自动刷新浏览器
// 		files:['./src/*.html','./src/css/*.css','./src/js/*.js']
// 	});

// 	// 监听sass文件修改，执行编译sass文件
// 	gulp.watch('src/sass/*.scss',['jtSass']);
// });