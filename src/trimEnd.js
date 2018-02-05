
const reTrim = /\s+$/g;

function trimEnd(string/*, chars*/){
	return string.replace(reTrim, '');	
}

export default trimEnd;