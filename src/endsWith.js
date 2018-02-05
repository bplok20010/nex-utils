function endsWith(str, ends){
	if (ends === '') return true;
	if (str == null || ends == null) return false;
	str = String(str); ends = String(ends);
	return str.length >= ends.length && str.slice(str.length - ends.length) === ends;
}

export default endsWith;