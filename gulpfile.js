const gulp = require("gulp");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const del = require("del");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const imagemin = require("gulp-imagemin");

const styleFiles = [
	"./src/css/color.scss",
	"./src/css/fonts.scss",
	"./src/css/main.scss",
	"./src/css/header.scss",
	"./src/css/first-section.scss",
	"./src/css/second-section.scss",
	"./src/css/sprey-section.scss",
	"./src/css/third-section.scss",
	"./src/css/reviews.scss",
	"./src/css/footer.scss",
	"./src/css/sliders.scss",
	"./src/css/modal.scss",
	"./src/css/adaptive.scss",
];


gulp.task("styles", () => {
	return (
		gulp
			.src(styleFiles)
			.pipe(concat("style.css"))
			.pipe(sass({ outputStyle: 'expanded' }))
			.pipe(
				autoprefixer({
					cascade: false,
				}),
			)
			.pipe(gulp.dest("./build/css"))
			.pipe(browserSync.stream())
	);
});

gulp.task("html", () => {
	return gulp.src("./src/index.html").pipe(gulp.dest("./build")).pipe(browserSync.stream());
});

gulp.task("fonts", () => {
	return gulp.src("./src/fonts/**").pipe(gulp.dest("./build/fonts/")).pipe(browserSync.stream());
});

gulp.task("libs", () => {
	return gulp.src("./src/libs/**").pipe(gulp.dest("./build/libs/")).pipe(browserSync.stream());
});

gulp.task("scripts", () => {
	return gulp.src("./src/js/**").pipe(gulp.dest("./build/js/")).pipe(browserSync.stream())
});

gulp.task("del", () => {
	return del(["build/*"]);
});

gulp.task("img-compress", () => {
	return gulp
		.src("./src/img/**")
		// .pipe(
		// 	imagemin({
		// 		progressive: true,
		// 	}),
		// )
		.pipe(gulp.dest("./build/img/"))
		.pipe(browserSync.stream());
});

gulp.task("watch", () => {
	browserSync.init({
		server: {
			baseDir: "./build",
		},
	});
	gulp.watch("./src/img/**", gulp.series("img-compress"));
	gulp.watch("./src/fonts/**", gulp.series("fonts"));
	gulp.watch("./src/libs/**", gulp.series("libs"));
	gulp.watch("./src/css/**/*.scss", gulp.series("styles"));
	gulp.watch("./src/js/**/*.js", gulp.series("scripts"));
	gulp.watch("./src/*.html", gulp.series("html"));
	gulp.watch("./src/*.html").on("change", browserSync.reload);
});

gulp.task(
	"default",
	gulp.series("del", gulp.parallel("html", "styles", "scripts", "img-compress", "fonts", "libs"), "watch"),
);
