import keys from './keys';

function forOwn(object, iteratee) {
	object = Object(object);
	keys(object).forEach((key) => iteratee(object[key], key, object));
}

export default forOwn;