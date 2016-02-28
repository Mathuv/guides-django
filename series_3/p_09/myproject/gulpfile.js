// plugins
var gulp         = module.exports = require('gulp');
var toolsConfig  = require("./tools/configs/tools.config.js");
var browserSync  = require("browser-sync");

// tasks
var tasksDir = toolsConfig.paths.tasksDir;
var tasks = [
    'css-dev',
    'css-prod',
    'webpack',
    'browsersync',
];

// load tasks
tasks.forEach(function(task) {
    require(tasksDir + '/' + task)();
});

// task: start
gulp.task('start', ['css-dev', 'browsersync'], function () {});

// task: build
gulp.task('build', ['css-prod', 'webpack'], function () {});
