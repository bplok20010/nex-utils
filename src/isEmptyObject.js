
function isEmptyObject(obj){
	for ( let name in obj ) {
		return false;
	}
	return true;	
}

export default isEmptyObject;