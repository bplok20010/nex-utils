let idCounter = 0;
function uniqueId(prefix) {
	const id = ++idCounter + '';
	return prefix ? prefix + id : id;
}

export default uniqueId;