/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */

function getDate(date) {
    return date ? new Date(date): new Date();
}

module.exports = function (req, res, next) {
    var
        query = req.query;
    query.date = getDate(query.date);
    next();
};
