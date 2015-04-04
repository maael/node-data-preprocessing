var extract = function(options, source) {
	options = options || {};
	options.path = options.path || '';
	options.format = options.format || 'csv';
	options.useHeaders = options.useHeaders || false;
	var result = [],
		i = ((options.useHeaders) ? 0 : 1);
	for(var j = 0; j < source[0].length; j++) {
		result.push([]);
	}	
	for(i; i < source.length; i++) {
		for(var j = 0; j < source[i].length; j++) {
			result[j].push(parseFloat(source[i][j]));
		}
	}
	return result;
};

module.exports = extract;