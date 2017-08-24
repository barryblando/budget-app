// Gulp Start;

var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./assets/css/*.css', reload);
  gulp.watch('./assets/js/*.js', reload);
  gulp.watch('./assets/js/*.+(jpg|jpeg|gif|png)', reload);
  gulp.watch('./*.html', reload);
});

gulp.task('default', ['serve']);
