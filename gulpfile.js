var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var uglify = require('gulp-uglify');
var install = require("gulp-install");
var runSequence = require('run-sequence');
var livereload = require('gulp-livereload');
var replace = require('gulp-batch-replace');

var paths = {
    html: [
        './public/html/*.html',
        './public/index.html'
    ],
    blog_html:[
        './public/html/header.html',
        './public/html/footer.html'
    ],
    less: [
        './src/less/**/*.less'
    ],
    js: [
        './bower_components/jquery/dist/jquery.js',
        './bower_components/bootstrap/dist/js/bootstrap.js',
        './bower_components/angular/angular.js',
        './bower_components/angular-route/angular-route.js',
        './bower_components/angular-animate/angular-animate.js',
        './bower_components/angular-ui-bootstrap-bower/ui-bootstrap.js',
        './src/js/lib/**.js',
        './src/js/app.js',
        './src/js/router.js',
        './src/js/ctrl/**.js',
        './src/js/fctry/**.js'
    ],
    font: [
        './bower_components/bootstrap/dist/fonts/**',
        './bower_components/fontawesome/fonts/**'
    ]
};

gulp.task('default', function(){
    runSequence(['less-watch', 'js-watch'], 'watch');
});

gulp.task('build', ['less', 'js']);

gulp.task('less-watch', function() {
    gulp.src('./src/less/app.less')
        .pipe(less())
        .pipe(gulp.dest('./public/css'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('./public/css'))
        .pipe(livereload());

    gulp.src('./public/blog/wp-content/themes/MadnessApp/assets/less/main.less')
        .pipe(less())
        .pipe(gulp.dest('./public/blog/wp-content/themes/MadnessApp/assets/css'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('./public/blog/wp-content/themes/MadnessApp/assets/css'))
        .pipe(livereload());
});

gulp.task('less', function() {
    gulp.src('./src/less/app.less')
        .pipe(less())
        .pipe(gulp.dest('./public/css'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('./public/css'));

    gulp.src('./public/blog/wp-content/themes/MadnessApp/assets/less/main.less')
        .pipe(less())
        .pipe(gulp.dest('./public/blog/wp-content/themes/MadnessApp/assets/css'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('./public/blog/wp-content/themes/MadnessApp/assets/css'));
});

gulp.task('js-watch', function() {
    gulp.src(paths.js)
        .pipe(concat('build.js'))
        .pipe(gulp.dest('./public/blog/wp-content/themes/MadnessApp/assets/js'))
        .pipe(rename('scripts.js'))
        .pipe(uglify({
            "mangle": false
        }))
        .pipe(gulp.dest('./public/blog/wp-content/themes/MadnessApp/assets/js'))
        .pipe(livereload());

    gulp.src(paths.js)
        .pipe(concat('build.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(rename('build.min.js'))
        .pipe(uglify({
            "mangle": false
        }))
        .pipe(gulp.dest('./public/js'))
        .pipe(livereload());
});

gulp.task('js', function() {
    gulp.src(paths.js)
        .pipe(concat('build.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(rename('build.min.js'))
        .pipe(uglify({
            "mangle": false
        }))
        .pipe(gulp.dest('./public/js'));

    gulp.src(paths.js)
        .pipe(concat('build.js'))
        .pipe(gulp.dest('./public/blog/wp-content/themes/MadnessApp/assets/js'))
        .pipe(rename('scripts.js'))
        .pipe(uglify({
            "mangle": false
        }))
        .pipe(gulp.dest('./public/blog/wp-content/themes/MadnessApp/assets/js'));
});

gulp.task('blog-watch', function() {
    var replaceThis = [
        [ 'data-class-active', 'class="active"' ]
    ];

    gulp.src(paths.blog_html)
        .pipe(replace(replaceThis))
        .pipe(gulp.dest('./public/blog/wp-content/themes/MadnessApp/templates/html'));
});

gulp.task('watch', function() {
    var server = livereload();

    gulp.watch(paths.html).on('change', function(file){
        livereload(server).changed(file.path);
    });
    gulp.watch(paths.blog_html, ['blog-watch']);
    gulp.watch(paths.less, ['less-watch']);
    gulp.watch(paths.js, ['js-watch']);
});

gulp.task('copy-fonts', function() {
    gulp.src(paths.font)
        .pipe(gulp.dest('./public/fonts'));
    gulp.src(paths.font)
        .pipe(gulp.dest('./public/blog/wp-content/themes/MadnessApp/assets/fonts'));   
});

gulp.task('copy-blog-html', function() {
    return gulp.src(paths.blog_html)
    .pipe(replace('data-class-active', 'class="active"'))
    .pipe(gulp.dest('./public/blog/wp-content/themes/MadnessApp/templates/html'));
});

gulp.task('bower', function() {
    return gulp.src(['./bower.json'])
        .pipe(install());
});

gulp.task('install', function() {
    runSequence(
        'bower', ['copy-fonts'], ['less', 'js']
    );
});