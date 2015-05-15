/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */

var
    applicationLog = require('./log').getLogger('application');

function stopOnError(err) {
    applicationLog.error(err);
    process.nextTick(function () {
        process.exit(1);
    });
}

process.on('uncaughtException', stopOnError);
// логируем ошибки необработанные в промисах.
process.on('unhandledRejection', function (error) {
    applicationLog.error(error);
});

var
    server = require('./server'),
    httpConfig = require('./config').get('application').http;

if (module.parent) {
    module.exports = server;
} else {
    server.listen(httpConfig.port, httpConfig.addr, function (err) {
        if (err) {
            return stopOnError(err);
        }

        applicationLog.info('Server started on: ' + httpConfig.addr + ':' + httpConfig.port);
    });
}
