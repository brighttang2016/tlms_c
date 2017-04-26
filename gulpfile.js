var gulp = require('gulp'),
    minifycss=require('gulp-minify-css'),
    concat=require('gulp-concat'),
    uglify=require('gulp-uglify'),
    rename=require('gulp-rename'),
    jshint=require('gulp-jshint');

var src_css='./asset/css',
    src_js='./asset/js',
    dest_css='./dest/css',
    dest_js='./dest/js';

gulp.task('mincss',function(){
   gulp.src(src_css+'/!**!/!*.css')
       .pipe(mincss())
       .pipe(gulp.dest(dest_css));
});

gulp.task('minjs',function(){
    gulp.src(src_js+'/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(dest_js));
});


gulp.task("watch",function(){
    gulp.watch(src_css+'/!**!/!*.css',['mincss']);
    gulp.watch(src_js+'/!**!/!*.js',['minjs']);
});

/*gulp.task("default",function(){
    gulp.run('minjs','mincss');
    gulp.run('watch');
});*/

gulp.task("watch",function(){
    gulp.watch(src_js+'/!**!/!*.js',['minjs']);
});

gulp.task("default",function(){
   gulp.start('minjs','mincss');
    gulp.start('watch');
});
