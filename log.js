/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */
var
    log4js = require('log4js'),
    logConfig = require('./config').get('application').log4js;

log4js.configure(logConfig);

module.exports = log4js;
