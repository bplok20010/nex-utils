import formatCodes from './options';
import {
	now
} from './utils';

function getFormatCode(code){
	const f = formatCodes[code];
	return function(date){
		if( f ) return f(date);
		return code;	
	};	
}

/** 
 * 日期格式化
 * @param {Date}
 * @param {String}
 * @return {String}
 */
export default function format(date = now(), format = 'Y-m-d'){
	let code = [],
		special = false,
		ch = '',
		i;

	for (i = 0; i < format.length; ++i) {
		ch = format.charAt(i);
		if (!special && ch === "\\") {
			special = true;
		} else if (special) {
			special = false;
			code.push(ch);
		} else {
			code.push(getFormatCode(ch)(date));
		}
	}
	
	return code.join('');
}