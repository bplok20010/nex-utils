
const reTrim = /^\s+|\s+$/g;

function trim(string/*, chars*/){
	if( String.prototype.trim ) return string.trim();
	return string.replace(reTrim, '');	
}

export default trim;