import toString from './toString';

const nativeIsArray = Array.isArray;

const isArray = nativeIsArray || function(obj) {
	return toString.call(obj) === '[object Array]';
};

export default isArray;