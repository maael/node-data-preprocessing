var divide = function(options, data) {
    options = options || {};
    options.random = options.random || false;
    options.splits = options.splits || [60, 20, 20];
    var divisionSizes = [],
        splitSum = 0,
        divisionSum = 0,
        dividedData = [],
        maxSplit = Math.max.apply(null, options.splits),
        extraAllocated = false;
    for(var i = 0; i < options.splits.length; i++) {
        splitSum += options.splits[i];
        dividedData.push([]);
    }
    for(var i = 0; i < options.splits.length; i++) {
        var divisionSize = Math.floor(data[0].length * (options.splits[i]/splitSum));
        divisionSum += divisionSize;
        divisionSizes.push(divisionSize);
    }
    divisionSizes[0] += data[0].length - divisionSum;
    for(var i = 0; i < options.splits.length; i++) {
        for(var j = 0; j < data.length; j++) {
            dividedData[i].push(data[j].splice(0, divisionSizes[i]))
        }
    }
    return dividedData;
};

module.exports = divide;