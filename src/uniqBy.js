import baseUniq from './_baseUniq';

function uniqBy(array, iteratee) {
	return (array && array.length) ? baseUniq(array, iteratee) : [];
}

export default uniqBy;