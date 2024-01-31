const gulp = require('gulp');
const pug = require('gulp-pug');
const less = require('gulp-less');
const babel = require('gulp-babel');
const del = require('del');

// Задача для преобразования pug-файлов в HTML
gulp.task('pug', () => {
  return gulp.src('./views/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./public/html'));
});

// Задача для преобразования less-файлов в CSS
gulp.task('make_css', () => {
  return gulp.src('./public/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('public/css'));
});

// Задача для обработки js-файлов с использованием Babel
gulp.task('babel', () => {
  return gulp.src('./public/scripts/*.js')
    .pipe(babel())
    .pipe(gulp.dest('public/gulp_scripts'));
});

gulp.task('clear_css', () => {
    return del('./public/css/*.css');
});

gulp.task('clear_js', () => {
    return del('./public/gulp_scripts/*.js');
});

gulp.task('clear_html', () => {
    return del('./public/html/*.html');
});


gulp.task("default",gulp.parallel((gulp.series('clear_js', 'babel')),(gulp.series('clear_css', 'make_css'))));