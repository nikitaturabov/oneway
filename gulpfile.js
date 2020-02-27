const gulp = require("gulp");
const less = require("gulp-less");
const order = require("gulp-order");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const gcmq = require("gulp-group-css-media-queries");
const clean = require("gulp-clean");
const babel = require("gulp-babel");
const filesize = require("gulp-filesize");
const gutil = require("gulp-util");
const browserSync = require("browser-sync").create();
var reload = browserSync.reload;
const nunjucksRender = require("gulp-nunjucks-render");
const plumber = require("gulp-plumber");
const filter = require("gulp-filter");
const debug = require("gulp-debug");
const svgSprite = require("gulp-svg-sprite");
const imagemin = require("gulp-imagemin");
const replace = require('gulp-replace');
const gulpFont = require('gulp-font');

//Сборка less файлов в один css, минификация, перемещение media вниз файла
gulp.task("less", function () {
	return gulp
		.src("./src/less/__styles.less")
		.pipe(concat("style.min.less"))
		.pipe(less())
		.pipe(cleanCSS())
		.pipe(gcmq())
		.pipe(cleanCSS())
		.pipe(gulp.dest("./build/css"))
		.pipe(filesize());
});

//Для сброки в отдельный js библиотек и расширений
gulp.task("vendor", function () {
	return gulp
		.src("./src/vendor/*.js")
		.pipe(babel({ presets: ["@babel/preset-env"] }))
		.pipe(concat("vendor.min.js"))
		.pipe(uglify())
		.pipe(gulp.dest("./build/js"))
		.pipe(filesize())
		.on("error", gutil.log);
});

//Сборка и оптимизация js
gulp.task("js", function () {
	return gulp
		.src("./src/js/*.js")
		.pipe(babel({ presets: ["@babel/preset-env"] }))
		.pipe(concat("scripts.min.js"))
		.pipe(uglify())
		.pipe(gulp.dest("./build/js"))
		.pipe(filesize())
		.on("error", gutil.log);
});

gulp.task("html", function () {
	return gulp
		.src(["./src/html/*.html"], {
			since: gulp.lastRun("html")
		})
		.pipe(plumber())
		.pipe(debug({ title: "html:" }))
		.pipe(
			nunjucksRender({
				path: "./src/"
			})
		)

		.pipe(gulp.dest("./build/html"));
});

gulp.task("svgSprite", function () {
	return gulp
		.src("./src/images/*.svg")
		.pipe(
			svgSprite({
				mode: {
					stack: {
						sprite: "sprite.svg"
					},
					css: {
						render: {
							css: true
						}
					}
				}
			})
		)
		.pipe(replace(/viewBox=(".*?")/, ''))
		.pipe(gulp.dest("./build"));
});

gulp.task("optimizationPNG", function () {
	return gulp
		.src("./src/img/*")
		.pipe(imagemin([imagemin.optipng({ optimizationLevel: 5 })]))
		.pipe(gulp.dest("./build/img"));
});

gulp.task("clear-css", function () {
	return gulp.src("./build/*.css").pipe(clean());
});

gulp.task("clear-js", function () {
	return gulp.src("./build/*.js").pipe(clean());
});

gulp.task('fonts', function () {
	gulp.src('src/fonts/**/*.{ttf,otf}')
		.pipe(gulp.dest('build/fonts'))
});

gulp.task("serve", function () {
	browserSync.init({
		notify: false, //
		port: 8000, // порт
		server: {
			baseDir: "./build/"
		}
	});

	gulp
		.watch(["src/less/*.less", "src/less/import/*.less", "src/less/features/*.less"], gulp.series("clear-css", "less"))
		.on("change", reload);

	gulp
		.watch(["src/fonts/**/*.*"], gulp.series("fonts"))
		.on("change", reload);
	gulp
		.watch(["src/js/*.js"], gulp.series("clear-js", "js"))
		.on("change", reload);
	gulp.watch(["src/html/*.html"], gulp.series("html")).on("change", reload);
	gulp
		.watch(["src/images/*.svg"], gulp.series("svgSprite"))
		.on("change", reload);
	gulp
		.watch(["src/img/*.png"], gulp.series("optimizationPNG"))
		.on("change", reload);


	gulp.series(
		gulp.parallel('less', 'js', 'fonts'),
		'html',
		'svgSprite');
});
