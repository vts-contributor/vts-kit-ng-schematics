const { series, task, src, dest } = require('gulp')
const gulpClean = require('gulp-clean');
const gulpFilter = require('gulp-filter');
const path = require('path')
const ts = require("gulp-typescript");

const srcDir = path.join(__dirname, 'src')
const outDir = path.join(__dirname, 'lib')

function clean() {
    return src(outDir, { read: false, allowEmpty: true })
            .pipe(gulpClean(null))
}

function compile() {
    const tsProject = ts.createProject('tsconfig.json')
    return src(`${srcDir}/**/*.ts`)
            .pipe(tsProject())
            .pipe(dest(outDir))
}

function copyDependency() {
    return src(`${srcDir}/**/*`, { dot: true })
            .pipe(gulpFilter(file => file.extname != '.ts'))
            .pipe(dest(outDir))
}

task('compile', series(
    clean,
    compile,
    copyDependency
))