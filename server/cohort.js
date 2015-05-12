/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */

var
    bluebird = require('bluebird'),
    dateFormat = require('dateformat'),
    pool = bluebird.promisifyAll(require('./dbPool'));

function r1(date, userIds) {
    if (!userIds.length) return 0;

    var
        nextDate = new Date(date);

    nextDate.setDate(nextDate.getDate() + 1);

    return pool
        .queryAsync('select count(distinct userId) as R1 from `userLogin` where ts = ? and userId in (?) group by userId',
                        [dateFormat(nextDate, 'yyyy-mm-dd'), userIds])
        .then(function (rows) {
            var
                data = rows[0][0];
            return data && data.R1 ? data.R1: 0;
        });
}

function r(date, userIds) {
    if (!userIds.length) return 0;

    return pool
        .queryAsync('select count(distinct userId) as R from `userLogin` where ts > ? and userId in (?) group by userId',
                        [dateFormat(date, 'yyyy-mm-dd'), userIds])
        .then(function (rows) {
            var
                data = rows[0][0];
            return data && data.R ? data.R: 0;
        });
}

function purchase(date, userIds) {
    if (!userIds.length) return 0;

    return pool
        .queryAsync('select count(userId) as P from `userPurchase` where ts >= ? and userId in (?)',
                        [dateFormat(date, 'yyyy-mm-dd'), userIds])
        .then(function (rows) {
            var
                data = rows[0][0];
            return data && data.P ? data.P: 0;
        });
}

module.exports = function (date) {
    var
        ts = dateFormat(date, 'yyyy-mm-dd');

    return pool
        .queryAsync('select userId, ts from `userRegister` where ts = ?', [ts])
        .then(function (rows) {
            return rows[0].map(function (row) {
                return row.userId;
            });
        })
        .then(function (userIds) {
            return bluebird
                .props({
                    date: ts,
                    count: userIds.length,
                    R1: r1(date, userIds),
                    R: r(date, userIds),
                    purchase: purchase(date, userIds)
                });
        });
};
