import baseUniq from './_baseUniq';

function uniq(array) {
	return (array && array.length) ? baseUniq(array) : [];
}

export default uniq;