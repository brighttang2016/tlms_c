var gulp = require('gulp'),
    minifycss=require('gulp-minify-css'),
    concat=require('gulp-concat'),
    uglify=require('gulp-uglify'),
    rename=require('gulp-rename'),
    jshint=require('gulp-jshint'),
    clean=require('gulp-clean'),
    minifyhtml=require('gulp-minify-html'),
    utf8Convert=require('gulp-utf8-convert'),
    templateCache =require('gulp-angular-templatecache'),
    runSequence = require('gulp-run-sequence');
var bom = require('gulp-bom');

var src_css='asset/!**',
    dist='dist',
    src_js = 'app/**/*.js',
    dist_js='dist';
gulp.task('minifycss',function(){
   gulp.src('asset/**/*.css')
       //.pipe(rename({suffix:'.min'}))
       .pipe(minifycss())
       .pipe(gulp.dest("dist"));
});

gulp.task('templatecache',function(){
    return gulp.src('app/**/*.tpl.html')
        .pipe(templateCache('templates.js',{
            root:'app',
            standalone :true,
            transformUrl: function(url) {
                return url.replace(/\.tpl\.html$/, '.html')
            }
        }))
        .pipe(gulp.dest('dist/js/template'))
});

gulp.task('minifyjs',function(){
    //gulp.src('asset/**/*.js')
    //gulp.src(['app/**/*.js','asset/**/*.js'])
    gulp.src(['app/*.js'
        ,'asset/js/**/*.js'
        ,'app/xhr/*.js'
        ,'app/uirouter/*.js'
        ,'app/toaster/*.js'
        ,'app/utils/**/*.js'
        ,'app/module-*/**/*.js'
        ,'dist/js/template/templates.js'])
        .pipe(concat('all.js'))
        .pipe(rename({suffix:'.min'}))
        /*.pipe(uglify({
            //mangle:{regex:'tang'}
            //mangle:true
            //mangle:{except:['require' ,'exports' ,'module','$scope','$http','$q','xhrService']},
            mangle:false,
            compress:true
            //preserveComments: all//
        }))*/
        //.pipe(bom())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('minifyhtml',function(){
    gulp.src('app/**/*.html')
        .pipe(utf8Convert({
            encNotMatchHandle:function(file){
            }
        }))
        .pipe(minifyhtml())
        .pipe(gulp.dest('dist/html'))
});
/*gulp.task('indexhtml',function(){
    gulp.src('app/index.html')
        .pipe(utf8Convert({
            encNotMatchHandle:function(file){
            }
        }))
        //.pipe(minifyhtml())
        .pipe(gulp.dest('dist'))
});*/

gulp.task('appAllHtml',function(){
    gulp.src('app/*.html')
        .pipe(utf8Convert({
            encNotMatchHandle:function(file){
            }
        }))
        //.pipe(minifyhtml())
        .pipe(gulp.dest('dist'))
});

/*gulp.task('concat',function(){
   // gulp.src('asset/!**!/!*.js')
    gulp.src(['asset/!**!/!*.js','app/!**!/!*.js'])
   // gulp.src(['app/xhr/!*.js','asset/!**!/!*.js'])
        .pipe(utf8Convert({
            encNotMatchHandle:function(file){
            }
        }))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'));
});*/

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
    return gulp.src(['dist']).pipe(clean());
    console.log("clean");
});

gulp.task('dobefore',function(){
    //console.log(" do before default");
    //gulp.start('clean');
});

gulp.task('copy',function(){
    gulp.src(['bower_components/**/*.js'])
        .pipe(gulp.dest('dist/bower_components'));
    gulp.src(['bower_components/**/*.css'])
        .pipe(gulp.dest('dist/css'));
    gulp.src(['bower_components/**/*.woff2'])
        .pipe(gulp.dest("dist/css"));
    gulp.src(['app/*.css'])
        .pipe(gulp.dest("dist"));
    gulp.src(['asset/fonts/**/*.*'])
        .pipe(gulp.dest("dist/fonts"));
    gulp.src(['asset/img/*.*'])
        .pipe(gulp.dest("dist/img"));
    gulp.src(['app/vendor/**/*.*'])
        .pipe(gulp.dest("dist/vendor"));
    gulp.src(['app/diagramviewer/**/*.*'])
        .pipe(gulp.dest("dist/html/diagramviewer"));
});

/*gulp.task('default',['clean'],function(){
   gulp.start('minifycss','templatecache','minifyjs','minifyhtml','copy','appAllHtml');
});*/

gulp.task('default',function(cb){
    runSequence('clean','minifycss','templatecache',['minifyjs','copy'],'appAllHtml');
});
