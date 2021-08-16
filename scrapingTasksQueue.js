const Queue= require('bee-queue')
let { options } = require('./options')

function createTasksQueue(queueName) {
    const tasksQueue = new Queue(queueName, options)
    return tasksQueue;
}

module.exports = {
    createTasksQueue
}