const { createLogger, format, transports } = require('winston');

const customFormat = format.combine(format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }), format.printf((info) => {
    return `${info.timestamp} - [${info.level.toUpperCase()}] - ${info.message}`
}))
const managerLogger = createLogger({
    format: customFormat,
    defaultMeta: { component: 'manager-service' },
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'app.log' })
    ]
});

const employeeLogger = createLogger({
    format: customFormat,
    defaultMeta: { component: 'employee-service' },
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'app.log' })
    ]
});

module.exports = {
    managerLogger,
    employeeLogger
};