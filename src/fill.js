
function fill(array, value, start = 0, end) {
	const length = array == null ? 0 : array.length;
	if (!length) {
		return [];
	}
	
	if (start < 0) {
		start = -start > length ? 0 : (length + start);
	}
	end = (end === undefined || end > length) ? length : end;
	if (end < 0) {
		end += length;
	}
	end = start > end ? 0 : end;
	while (start < end) {
		array[start++] = value;
	}
	
	return array;
}

export default fill;