  return gulp.src([conf.path.client('**/*.js'), `!${conf.path.client('bower_components/**/*')}`])
    .pipe(eslint())
    .pipe(eslint.format())
