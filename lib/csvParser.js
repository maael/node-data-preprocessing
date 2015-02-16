var parser = function(source) {
    var data = [],
        lines = source.split(/\r?\n/g);
    lines.splice((lines.length - 1), 1);
    for(var i = 0; i < lines.length; i++) {
        data.push(lines[i].split(','));
    }
    return data;
};

module.exports = parser;