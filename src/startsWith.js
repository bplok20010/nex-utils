function startsWith(str, starts){
	if (starts === '') return true;
	if (str == null || starts == null) return false;
	str = String(str); starts = String(starts);
	return str.length >= starts.length && str.slice(0, starts.length) === starts;
}

export default startsWith;