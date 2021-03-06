var bigInt = require('big-integer');
var standardise = function(options, data) {
	options = options || {};
	options.path = options.path || '';
	options.format = options.format || 'csv';
	options.min = options.min || 0.1;
	options.max = options.max || 0.9;
	options.standardisationMethod = options.standardisationMethod || 'default';
	options.ignore = options.ignore || [];
	var column, min, max;
	for(var i = 0; i < data.length; i++) {
		if(options.ignore.indexOf(i) === -1) {
			column = data[i];
			if(typeof(column[0]) === 'object') {
				var mappedColumn = column.map(function(el, i) {
					return { index: i, value: el };
				});
				mappedColumn.sort(function(a, b) {
					return +(a.value.greater(b.value)) || +(a.value.equals(b.value)) - 1;
				});
				var sortedColumn = mappedColumn.map(function(el) {
					return column[el.index];
				});
				max = sortedColumn[sortedColumn.length - 1];
				min = sortedColumn[0];
			} else {
				max = Math.max.apply(null, column);
				min = Math.min.apply(null, column);
			}
			for(var j = 0; j < column.length; j++) {
				data[i][j] = standardisation(options.standardisationMethod, min, max, column[j]);
			}
		}
	}
	return data;
};
function standardisation(type, min, max, value) {
	var result;
	switch(type) {
		case 'ss':
			result = ssStandardisation(min, max, value);
			break;
		case 'normal':
			result = normalStandardisation(min, max, value);
			break;
		default:
			result = defaultStandardisation(min, max, value);
	}
	return result;
}
function defaultStandardisation(min, max, value) {
	if(typeof(value) === 'object') {
		return 0.8 * ((value.subtract(min)).toJSNumber() / (max.subtract(min)).toJSNumber()) + 0.1;
	} else {
		return 0.8 * ((value - min)/(max - min)) + 0.1;
	}
}

function ssStandardisation(min, max, value) {

}

function normalStandardisation(min, max, value) {

}

module.exports = standardise;