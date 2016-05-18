var gulp = require('gulp');
var plugins = require("gulp-load-plugins")();

var config = {
  jsAssetsSrcDir: 'src/js/*.js',
  jsVendorsAssetsSrcDir: 'src/js/vendors/*.min.js',
  jsAssetsDestDir: 'build/javascript/',

  scssAssetsSrcDir: 'src/scss/style.scss',
  scssVendorsAssetsSrcDir: 'src/scss/vendors/*.min.css',
  cssAssetsDestDir: 'build/stylesheets/',
  scssAssetsSrcDirWatch: 'src/scss/**/*.scss',
  
  imgAssetsSrcDir: 'src/img/**/*',
  imgAssetsDestDir: 'build/images/',

  // jsonAssetsSrcDir: 'src/data/**/*.json',
  // jsonAssetsDestDir: 'build/data/',

  production: !!plugins.util.env.production,
  sourceMaps: !plugins.util.env.production
};

//minify html
gulp.task('html', function() {
  gulp.src(config.htmlAssetsSrcDir)
    .pipe(plugins.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(config.htmlAssetsDestDir))
});

// compile css of the sass files and process it
gulp.task('stylesheets', function () {
  gulp.src(config.scssAssetsSrcDir)
    .pipe(plugins.if(config.sourceMaps, plugins.sourcemaps.init()))
    // .pipe(plugins.rubySass({style: 'compressed'}))
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer({ browsers: ['last 2 versions'] }))
    // .pipe(plugins.uncss({
    //         html: ['index.html', 'posts/**/*.html', 'http://appleton.com']
    //     }))
    /*.pipe(config.production ? plugins.cleanCSS( {debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }) : plugins.util.noop())*/
    .pipe(plugins.csso())
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(plugins.if(config.sourceMaps, plugins.sourcemaps.write('.')))
    .pipe(gulp.dest(config.cssAssetsDestDir));
});

// move vedors' .min.css files to appropriate build dir
gulp.task('moveCSS', function () {
  gulp.src(config.scssVendorsAssetsSrcDir)
    .pipe(gulp.dest(config.cssAssetsDestDir));
});

// concatenate & minify js files
gulp.task('scripts', function () {
  gulp.src(config.jsAssetsSrcDir)
    .pipe(plugins.if(config.sourceMaps, plugins.sourcemaps.init()))
    .pipe(plugins.concat('app.js'))
    .pipe(plugins.uglify())
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(plugins.if(config.sourceMaps, plugins.sourcemaps.write('.')))
    .pipe(gulp.dest(config.jsAssetsDestDir));
});

// move vedors' .min.js files to appropriate build dir
gulp.task('moveJs', function () {
  gulp.src(config.jsVendorsAssetsSrcDir)
    .pipe(gulp.dest(config.jsAssetsDestDir));
});

//js syntax verifiing
gulp.task('lint', function() {
  gulp.src(config.jsAssetsSrcDir)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

//images processing
gulp.task('images', function() {
  gulp.src(config.imgAssetsSrcDir)
    .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest(config.imgAssetsDestDir));
});

// //json processing
// gulp.task('json', function () {
//   gulp.src(config.jsonAssetsSrcDir)
//     .pipe(plugins.jsonminify())
//     .pipe(gulp.dest(config.jsonAssetsDestDir));
// });

// Watch for changes in files
gulp.task('watch', function () {
  // Watch .js files
  gulp.watch(config.jsAssetsSrcDir, ['scripts']);
  // Watch .scss files
  gulp.watch(config.scssAssetsSrcDirWatch, ['stylesheets']);
  // Watch image files
  gulp.watch(config.imgAssetsSrcDir, ['images']);
  // Watch .json files
  // gulp.watch(config.jsonAssetsSrcDir, ['json']);
 });

 // Default Task
gulp.task('default', ['scripts', 'moveJs', 'stylesheets', 'moveCSS', 'images', /*'json',*/ 'watch']);