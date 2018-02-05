import reduce from './reduce';

function partition(collection, predicate) {
	return reduce(collection, (result, value/*, key*/) => (
		result[predicate(value) ? 0 : 1].push(value), result
	), [[], []])
}

export default partition;