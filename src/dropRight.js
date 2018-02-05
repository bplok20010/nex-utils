
function dropRight(array, n, guard) {
	const length = array == null ? 0 : array.length;
	if (!length) {
		return [];
	}
	n == null || guard ? 1 : n;
	n = length - n;
    return array.slice(0, n < 0 ? 0 : n);
}

export default dropRight;