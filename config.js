/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */
var
    fs = require('fs'),
    p = require('path'),
    yaml = require('js-yaml'),

    configs = {},

    CONFIG_DIR = p.join(__dirname, 'config');

exports.get = function (configName) {
    return configs[configName] || (configs[configName] = yaml.safeLoad(fs.readFileSync(p.join(CONFIG_DIR, configName + '.yaml'), 'utf8')));
};
