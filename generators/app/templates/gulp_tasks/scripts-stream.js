  return gulp.src(conf.path.client('**/*.js'))
    .pipe(eslint())
    .pipe(eslint.format())
