import repeat from './repeat';

function createPadding(length, chars) {
	chars = chars === undefined ? ' ' : String(chars);
	
	const charsLength = chars.length;
	if (charsLength < 2) {
		return charsLength ? repeat(chars, length) : chars;
	}
	const result = repeat(chars, Math.ceil(length / chars.length));
	return result.slice(0, length);
}

export default createPadding;