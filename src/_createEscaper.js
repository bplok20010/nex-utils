import keys from './keys';

function createEscaper(map) {
	const escaper = function(match) {
		return map[match];
	};
	// Regexes for identifying a key that needs to be escaped
	const source = '(?:' + keys(map).join('|') + ')';
	const testRegexp = RegExp(source);
	const replaceRegexp = RegExp(source, 'g');
	
	return function(string) {
		string = string == null ? '' : '' + string;
		return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	};
}

export default createEscaper;
