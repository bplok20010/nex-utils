import repeat from './repeat';

function pad(string, length, chars, type){
	string = string == null ? '' : String(string);
	length = ~~length;
	
	if (!chars)
        chars = ' ';
	else if (chars.length > 1)
        chars = chars.charAt(0);	
	
	const padlen = length - string.length;
	switch( type ) {
		case 'right':
			return string + repeat(chars, padlen);
		case 'left':
			return repeat(chars, padlen) + string;	
		default:
			return repeat(chars, Math.floor(padlen/2)) + string
				+ repeat(chars, Math.ceil(padlen/2));
	}
}

export default pad;