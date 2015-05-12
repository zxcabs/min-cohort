/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 *
 * Берем доступное соединение из пула.
 * Незабываем его потом освободить https://github.com/felixge/node-mysql/#pooling-connections
 */
var
    pool = require('../dbPool');

module.exports = function (req, res, next) {
    pool.getConnection(function (err, connection) {
        if (err) return next(err);
        req.db = connection;
        next();
    });
};
