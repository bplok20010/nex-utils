const nativeIsFinite = isFinite;

function isFinite(value){
	return typeof value == 'number' && nativeIsFinite(value);	
}

export default isFinite;