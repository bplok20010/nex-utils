const _slice = Array.prototype.slice;

function slice(array, start, end){
	return _slice.call(array, start, end);
}

export default slice;