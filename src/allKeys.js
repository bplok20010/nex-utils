
function allKeys(object){
	const result = [];
	for (const key in object) {
		result.push(key);
	}
	return result;
}

export default allKeys;