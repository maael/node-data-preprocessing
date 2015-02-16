var cleanse = function(options, data) {
	options = options || {};
	options.formats = options.formats || [];
	var dataLength = data[0].length;
	for(var i = 0; i < data.length; i++) {
		for(var j = 0; j < dataLength; j++) {
			if(!validate(data[i][j], options.formats[i])) {
				data = removeRow(j, data);
			}
		}
	}
	return data;
};

function validate(value, format) {
	var typeCheck = (typeof(value) === format),
		NaNCheck = (value === value);
	return (typeCheck && NaNCheck);
}

function removeRow(row, data) {
	for(var i = 0; i < data.length; i++) {
		data[i].splice(row, 1);
	}
	return data;
}

module.exports = cleanse;