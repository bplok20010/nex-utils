import isArrayLike from './isArrayLike'

function size(collection) {
	if (collection == null) {
		return 0
	}
	if (isArrayLike(collection)) {
		return collection.length
	}
	
	return Object.keys(collection).length
}

export default size