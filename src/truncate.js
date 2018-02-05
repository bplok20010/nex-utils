function truncate(str, length, truncateStr){
	if (str == null) return '';
	str = String(str); truncateStr = truncateStr || '...';
	length = ~~length;
	return str.length > length ? str.slice(0, length) + truncateStr : str;	
}

export default truncate;