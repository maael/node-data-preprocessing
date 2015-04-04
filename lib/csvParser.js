var parser = function(source) {
    var data = [],
        lines = source.split(/\r?\n/g);
    for(var i = 0; i < lines.length; i++) {
        var parts = lines[i].split(',');
        if((parts.length > 0 ) && (parts[0] !== '')) {
            data.push(lines[i].split(','));
        }
    }
    return data;
};

module.exports = parser;