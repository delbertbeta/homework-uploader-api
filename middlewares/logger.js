const log4js = require('log4js');
log4js.configure({
    appenders: {
        out: { type: 'stdout' },
        file: {
            type: 'file',
            filename: 'logs/HomeworkUploader.log'
        }
    },
    categories: {
        default: {
            appenders: ['file', 'out'],
            level: 'info'
        }
    }
});

const logger = log4js.getLogger('HomeworkUploader');

module.exports = {
    logger: logger,
    logVisitInfo: function (req, res, next) {
        var meta = req.ip + '(' + req.hostname + ')' + ' ' + req.method + ' ' + req.url;
        logger.info(meta);
        next();
    }
}