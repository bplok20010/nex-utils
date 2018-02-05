import isObject from './isObject';
import isArray from './isArray';
import isDate from './isDate';
import isSet from './isSet';
import isMap from './isMap';
import isRegExp from './isRegExp';
import forOwn from './forOwn';
import create from './_baseCreate';
import toString from './toString';

const hasOwnProperty = Object.prototype.hasOwnProperty;
const reFlags = /\w*$/;

function cloneRegExp(regexp) {
	const result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	result.lastIndex = regexp.lastIndex;
	return result;
}

function cloneArray(array, isDeep) {
	if( !isDeep ) return array.slice();
	
	let i = array.length;
	const result = new Array(i);
	
	while (i--) {
		result[i] = clone(array[i], true);
	}
	
	// Add properties assigned by `RegExp#exec`.
	if (i && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
		result.index = array.index
		result.input = array.input
	}	
	
	return result;
}

function clone(value, isDeep){
	if (!isObject(value)) return value;
	
	if( isDate(value) ) {
		 return new Date(+value);
	}
	
	if( isRegExp(value) ) {
		return cloneRegExp(value);	
	}
	
	if( isSet(value) ) {
		const result = new Set(); 
		value.forEach( v => result.add(isDeep ? clone(v, true) : v) );
		return result;
	}
	
	if( isMap(value) ) {
		const result = new Map();
		value.forEach( (v, k) => result.set(k, isDeep ? clone(v, true) : v) );
		return result;
	}
	
	if( isArray(value) ) {
		return cloneArray(value, isDeep);
	}
	
	if( toString.call(value) === '[object Object]' && value.constructor === Object ) {
		const result = create(Object.getPrototypeOf(value));
		forOwn(value, (v, k) => result[k] = isDeep ? clone(v, true) : v);
		return result;
	}
	
	return value;
}

export default clone;