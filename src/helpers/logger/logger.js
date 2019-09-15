
const { createLogger, format, transports } = require('winston')
const { combine } = format

module.exports.Logger = createLogger({
    level: 'info',
    format: combine(
        format.colorize(),
        format.splat(),
        format.timestamp(),
        format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            level: 'error',
            maxsize: 1024 * 10,
            maxFiles: 5,
            filename: `${__dirname}/../../../logs/errors.log`
        }),
        new transports.File({
            level: 'info',
            maxsize: 1024 * 10,
            maxFiles: 10,
            filename: `${__dirname}/../../../logs/logs.log`
        })
    ]
})
