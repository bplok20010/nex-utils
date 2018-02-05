/**
 * The inverse of `toPairs`is method returns an object composed
 * from key-value `pairs`.
 *
 * @since 4.0.0
 * @category Array
 * @param {Array} pairs The key-value pairs.
 * @returns {Object} Returns the new object.
 * @example
 *
 * fromPairs([['a', 1], ['b', 2]])
 * // => { 'a': 1, 'b': 2 }
 */
function fromPairs(pairs) {
	const result = {}
	if (pairs == null) {
		return result
	}
	for (let i = 0, length = pairs.length; i < length; i++) {
		const pair = pairs[i]
		result[pair[0]] = pair[1]
	}
	return result
}

export default fromPairs
