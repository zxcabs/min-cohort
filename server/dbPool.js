/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */
var
    mysqlConfig = require('../config').get('application').mysql,
    mysql = require('mysql');

module.exports = mysql.createPool(mysqlConfig);
