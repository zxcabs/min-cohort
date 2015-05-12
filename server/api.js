/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */
var
    router = module.exports = require('express').Router(),
    getConnection = require('./middlewares/getConnection.js'),
    date = require('./middlewares/date.js'),
    cohort = require('./cohort');

router.get('/userRegister', getConnection, function (req, res, next) {
    req.db.query('insert into `userRegister` (`userId`, `ts`) values (?, curdate())', [req.query.userId], function (err) {
        req.db.release();

        if (err) return next(err);
        res.json({ success: true });
    });
});

router.get('/userLogin', getConnection, function (req, res, next) {
    req.db.query('insert into `userLogin` (`userId`, `ts`) values (?, curdate())', [req.query.userId], function (err) {
        req.db.release();

        if (err) return next(err);
        res.json({ success: true });
    });
});

router.get('/userPurchase', getConnection, function (req, res, next) {
    req.db.query('insert into `userPurchase` (`userId`, `ts`) values (?, curdate())', [req.query.userId], function (err) {
        req.db.release();

        if (err) return next(err);
        res.json({ success: true });
    });
});

router.get('/cohort', date, function (req, res, next) {
    cohort(req.query.date)
        .then(function (result) {
            res.json({ success: true, result: result });
        })
        .catch(function (e) {
            next(e);
        });
});
