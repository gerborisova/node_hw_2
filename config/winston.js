import { format, transports, createLogger } from 'winston';
import expressWinston from 'express-winston';

expressWinston.requestWhitelist.push('body');

export const winstonLogger = createLogger({
    format: format.combine(
        format.simple(),
        format.timestamp(),
        format.printf(
            error => `[${error.timestamp}] ${error.level} ${error.message}`
        )),
    transports: [
        new transports.File({
            filename: 'logs/error_processon.log',
            level: 'error'
        })
    ]
});

export const logger = expressWinston.logger({
    format: format.combine(
        format.json(),
        format.timestamp(),
        format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`),
    ),
    transports: [
        new transports.File({
            filename: 'logs/info.log',
            level: 'info'
        })
    ],
    meta:true,
    msg: 'HTTP {{req.method}} to: {{req.url}} req.body:{{JSON.stringify(req.body)}} res.statusCode: {{res.statusCode}}'

});
// another way for handling errors with express-winston

export const errorLogger = expressWinston.errorLogger({
    format: format.combine(
        format.simple(),
        format.timestamp(),
        format.printf(
            error => `[${error.timestamp}] ${error.level} ${error.message}`
        )),
    transports: [
        new transports.File({
            filename: 'logs/error.log',
            level: 'error'
        })
    ],
    msg:'Error'
});

