/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */
var
    p = require('path'),
    express = require('express'),
    app = module.exports = express(),
    bluebird = require('bluebird'),
    cohort = require('./cohort'),
    log = require('../log');

app.set('view engine', 'jade');
app.set('views', p.join(__dirname, 'views'));

var
    logHttp = log.getLogger('http');

app.use(log.connectLogger(logHttp, { level: 'auto' }));

app.use('/api', require('./api'), function (err, req, res, next) {
    // логируем ошибки
    logHttp.error(err.stack);
    res.json({ success: false });
});


app.get('/', function (req, res, next) {
    var
        startDate = new Date(),
        count = req.query.count? parseInt(req.query.count, 10): 20,
        dates = [startDate];

    for (var i = 1; count > i; i += 1) {
        dates.push((new Date(startDate)).setDate(startDate.getDate() - i));
    }

    bluebird
        .all(dates.map(function (date) {
            return cohort(date);
        }))
        .then(function (result) {
            res.render('index', { result: result });
        })
        .catch(function (error) {
            next(error);
        });
});


app.use(function (err, req, res, next) {
    logHttp.error(err);
    res.status(500).send('Die :(');
});
