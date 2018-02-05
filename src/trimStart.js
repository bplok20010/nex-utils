
const reTrim = /^\s+/g;

function trimStart(string/*, chars*/){
	return string.replace(reTrim, '');	
}

export default trimStart;