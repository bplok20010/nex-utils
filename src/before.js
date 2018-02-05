
function before(n, func){
	var result;
	return function(){
		if (--n > 0) {
			result = func.apply(this, arguments);
		}
		if (n <= 1) {
			func = undefined;
		}
		return result;
	};
}

export default before;