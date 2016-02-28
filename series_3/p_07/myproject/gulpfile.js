// plugins
var gulp         = module.exports = require('gulp');
var browserSync  = require("browser-sync");

// tasks
var tasksDir = './tools/tasks/';
var tasks = [
    'css-dev',
    'css-prod',
    'browsersync',
];

// load tasks
tasks.forEach(function(task) {
    require(tasksDir + task)();
});

// task: development
gulp.task('start', ['css-dev', 'browsersync'], function () {});

// task: build
gulp.task('build', ['css-prod'], function () {});
