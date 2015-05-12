/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */

var
    server = require('./server'),
    httpConfig = require('./config').get('application').http;


if (module.parent) {
    module.exports = server;
} else {
    server.listen(httpConfig.port, httpConfig.addr, function (err) {
        if (err) return console.log(err);
        console.log('Server started on: ' + httpConfig.addr + ':' + httpConfig.port);
    });
}
