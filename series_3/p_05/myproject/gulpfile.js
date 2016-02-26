// plugins
var gulp         = module.exports = require('gulp');
var browserSync  = require("browser-sync");

// tasks
var tasksDir = './tools/tasks/';
var tasks = [
    'css',
    'browsersync',
];

// load tasks
tasks.forEach(function(task) {
    require(tasksDir + task)();
});

// task: development
gulp.task('development', ['browsersync'], function () {});
