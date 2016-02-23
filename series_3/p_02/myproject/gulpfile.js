// plugins
var gulp = module.exports = require('gulp');

// tasks
var tasksDir = './tools/tasks/';
var tasks = [
    'css',
];

// load tasks
tasks.forEach(function(task) {
    require(tasksDir + task)();
});
