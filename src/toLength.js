import toInteger from './toInteger';

const maxSafeInteger = Math.pow(2, 53) - 1;
function toLength(value) {
	const len = toInteger(value);
	return Math.min(Math.max(len, 0), maxSafeInteger);
}

export default toLength;