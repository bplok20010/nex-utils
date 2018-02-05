import basePullAt from './_basePullAt'
import baseFlatten from './_flatten'

function pullAt(array, ...indexes) {
	return basePullAt(array, baseFlatten(indexes, 1).sort())
}

export default pullAt
