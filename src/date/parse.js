import formatCodes, {getFormatCode} from './options';
import {
	now
} from './utils';

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