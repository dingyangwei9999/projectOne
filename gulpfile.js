// 引入gulp模块
// commonjs规范引用模块
var gulp = require('gulp');
<<<<<<< HEAD
var sass = require('gulp-sass');

gulp.task('buildSass',function(){
	//先查找文件所在位置
	gulp.src('webapp/sass/*.scss')
	//通过pipe方法导入到gulp插件中实现编译
	.pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))
	//文件输出
	.pipe(gulp.dest('webapp/css'));
})

//监听文件修改  执行响应文件
gulp.task('jtSass',function(){
	gulp.watch('webapp/sass/*.scss',['buildSass']);
=======
var sass = require('gulp-sass'); 


//这里创建gulp任务
//用来编译sass文件
gulp.task('compileSass',function(){
	//先查找sass文件所在的位置
	gulp.src('webapp/sass/*.scss')

	// 通过pipe 方法导入到 gulp 的插件中实现编译sass
	.pipe(sass({outputStyle:'compact'}).on('error', sass.logError))

	// 把编译后的文件输出
	.pipe(gulp.dest('webapp/css'));
});

// 监听文件修改，执行相应任务
gulp.task('jtSass',function(){
	// 监听sass文件，如果有修改，则编译
	gulp.watch('webapp/sass/*.scss',['compileSass']);
});


// 用于js文件的压缩
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
gulp.task('compressJS',function(){
	gulp.src('webapp/js/*.js')

	// 合并
	.pipe(concat('page.js'))

	// 输入合并后但未压缩的版本
	.pipe(gulp.dest('dist/js/'))

	// 压缩
	.pipe(uglify({
		mangle:false,
		compress:false
	}))

	// 重命名
	.pipe(rename({
		suffix:'.min'
	}))

	// 输出
	.pipe(gulp.dest('dist/js/'))
});

gulp.task('comJS',function(){
	// 监听js文件，如果有修改，则编译
	gulp.watch('webapp/js/*.js',['compressJS']);
>>>>>>> 7e1d08f1ba449a627989010960d260f258d70ce0
});

// 同步任务
var browserSync = require('browser-sync');
gulp.task('server',function(){
	browserSync({
		// server: "./src",

		// 代理服务器
		proxy:'http://localhost/project/',

		// 自定义端口
		port:999,

		// 监听文件修改，自动刷新浏览器
		files:['./webapp/*.html','./webapp/css/*.css']
	});

	// 监听sass文件修改，执行编译sass文件
	gulp.watch('webapp/sass/*.scss',['compileSass']);
});