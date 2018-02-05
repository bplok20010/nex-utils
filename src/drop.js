function drop(array, n, guard) {
	const length = array == null ? 0 : array.length;
	if (!length) {
		return [];
	}
	n == null || guard ? 1 : n;
    return array.slice(n);
}

export default drop;