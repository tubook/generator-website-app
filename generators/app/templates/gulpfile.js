var gulp = require('gulp'),
  clean = require('del'),
  gulpif = require('gulp-if'),
  sass = require('gulp-ruby-sass'),
  uglify = require('gulp-uglify'),
  postcss = require('gulp-postcss'),
  // replace = require('gulp-replace'),
  browserSync = require('browser-sync'),
  autoprefixer = require('autoprefixer');
// spritesmith = require("gulp-spritesmith"); // css sprites图片
// sprity = require("sprity"); // css sprites图片
var atImport = require('postcss-import');
var mqpacker = require('css-mqpacker');
var cssnano = require('cssnano');
var reload = browserSync.reload;
var tmtsprite = require('gulp-tmtsprite'); // css sprites图片
var zip = require('gulp-zip');
//解析 scss 文件
gulp.task('scss', function() {
  var processors = [
    autoprefixer,
    cssnano,
    atImport,
    mqpacker
  ];
  return gulp.src(['./src/scss/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./src/css'));
});
//解析 scss 文件
gulp.task('css', function() {
  return gulp.src(['./src/css/*.css'])
    .pipe(gulp.dest('./dist/css'));
});
//监听 css 和 css sprite 生成
gulp.task('watchScss', function() {
  // gulp.watch('./src/images/sprite/**', ['sprites']);
  gulp.watch('./src/scss/*.scss', ['scss']);
});

gulp.task('images', function() {
  return gulp.src(['./src/images/*.{gif,jpg,png,ico}'])
    .pipe(gulp.dest('./dist/images'));
});
gulp.task('js', function() {
  return gulp.src(['./src/js/*.js'])
    // .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});
gulp.task('plugin', function() {
  return gulp.src(['./src/lib/**'])
    .pipe(gulp.dest('./dist/lib/'));
});
gulp.task('html', ['css', 'images', 'js', 'plugin'], function() {
  return gulp.src(['./src/view/*.html'])
    .pipe(gulp.dest('./dist/views'));
});

gulp.task('del', clean.bind(null, ['dist']));
// 预设任务
gulp.task('default', ['html'], function() {});
//生产预览
gulp.task('serve', ['scss', 'watchScss'], function() { //注册任务
  browserSync({ //调用API
    files: "**",
    port: 8000,
    server: {
      baseDir: ['./src'] //监听当前路径
    },
    startPath: 'view/index.html'
  });
});
gulp.task('zip', function() {
  return gulp.src('dist/**/*')
    .pipe(zip('dist.zip'))
    .pipe(gulp.dest('./'));
});
