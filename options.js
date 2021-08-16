const options = {
    removeOnSuccess: true,
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
}

module.exports = {
    options
}