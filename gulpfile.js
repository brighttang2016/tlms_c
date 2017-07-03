var gulp = require('gulp')
    minifycss=require('gulp-minify-css'),
    concat=require('gulp-concat'),
    uglify=require('gulp-uglify'),
    rename=require('gulp-rename'),
    jshint=require('gulp-jshint'),
    clean=require('gulp-clean'),
    minifyhtml=require('gulp-minify-html'),
    utf8Convert=require('gulp-utf8-convert');
var bom = require('gulp-bom');

var src_css='asset/!**',
    dest_css='dest',
    src_js = 'app/**/*.js',
    dest_js='dest';
gulp.task('minifycss',function(){
   gulp.src('asset/**/*.css')
       .pipe(rename({suffix:'.min'}))
       .pipe(minifycss())
       .pipe(gulp.dest("dest"));
});

gulp.task('minifyjs',function(){
    //gulp.src('asset/**/*.js')
    gulp.src(['app/**/*.js','asset/**/*.js'])
        .pipe(rename({suffix:'.min'}))
        /*.pipe(uglify({
            //mangle:{regex:'tang'}
            mangle:false
            //mangle:{except:['require' ,'exports' ,'module','$']}
            //mangle:false,//
            //compress:true,//
            //preserveComments: all//
        }))*/
        //.pipe(bom())
        .pipe(gulp.dest('dest/js'));
});

gulp.task('minifyhtml',function(){
    gulp.src('app/**/*.html')
        .pipe(utf8Convert({
            encNotMatchHandle:function(file){
            }
        }))
        .pipe(minifyhtml())
        .pipe(gulp.dest('dest/html'))
});

gulp.task('concat',function(){
   // gulp.src('asset/**/*.js')
    gulp.src(['asset/**/*.js','app/**/*.js'])
        .pipe(utf8Convert({
            encNotMatchHandle:function(file){
            }
        }))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dest/js'));
});

/*gulp.task("watch",function(){
    gulp.watch(src_css+'/!**!/!*.css',['mincss']);
    gulp.watch(src_js+'/!**!/!*.js',['minjs']);
});*/

/*gulp.task("default",function(){
    gulp.run('minjs','mincss');
    gulp.run('watch');
});*/

/*gulp.task("watch",function(){
    gulp.watch(src_js+'/!**!/!*.js',['minjs']);
});*/

gulp.task('clean',function(){
    setTimeout(function(){
        gulp.src(['dest/**/*.css','dest/**/*.js','dest/**/*.html'])
            .pipe(clean());
    },10);
});

gulp.task('dobefore',function(){
    console.log(" do before default");
});

gulp.task('default',['dobefore'],function(){
   gulp.start('minifycss','minifyjs','minifyhtml','concat');
});
