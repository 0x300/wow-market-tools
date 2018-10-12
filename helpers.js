const
    fs = require('fs'),
    assert = require('assert');

const loadJSON = (filePath) => {
    assert(filePath, 'must pass path to file');
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

module.exports = {
    loadJSON,
};
