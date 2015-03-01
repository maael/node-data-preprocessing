var cleanse = function(options, data) {
	options = options || {};
	options.formats = options.formats || [];
	options.ranges = options.ranges || [];
	var dataLength = data[0].length;
	for(var i = 0; i < data.length; i++) {
		for(var j = 0; j < dataLength; j++) {
			if(!validate(data[i][j], options.formats[i], options.ranges[i])) {
				data = removeRow(j, data);
			}
		}
	}
	return data;
};

function validate(value, format, range) {
	var typeCheck = (typeof(value) === format),
		NaNCheck = (value === value),
		rangeCheck = validateRange(value, range);
	return (typeCheck && NaNCheck && rangeCheck);
}

function validateRange(value, range) {
	var check = true;
	var validators = {
		greater: function (value, min) {
			return value > min;
		},
		greaterOrEqual: function (value, min) {
			return value >= min;
		},
		less: function (value, max) {
			return value < max;
		},
		lessOrEqual: function (value, max) {
			return value <= max;
		},
		between: function (value, range) {
			var parts = range.split('-'),
				min = parts[0],
				max = parts[1];
			return greater(value, min) && less(value, max);
		},
		betweenOrEqual: function (value, range) {
			var parts = range.split('-'),
				min = parts[0],
				max = parts[1];
			return greaterOrEqual(value, min) && lessOrEqual(value, max);
		}
	}
	if(typeof(range) !== 'undefined') {
		for (var type in range) {
		    if (range.hasOwnProperty(type)) {
		        if(!validators[type](value, range[type])) {
		        	check = false;
		        	break;
		        }
		    }
		}
	}
    return check;
}

function removeRow(row, data) {
	for(var i = 0; i < data.length; i++) {
		data[i].splice(row, 1);
	}
	return data;
}

module.exports = cleanse;