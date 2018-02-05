import isError from './isError';

function attempt(func, ...args) {
	try {
		return func.apply(undefined, args);
	} catch (e) {
		return isError(e) ? e : new Error(e);
	}
}

export default attempt;