import baseFlatten from './_flatten';
import map from './map';

function flatMapDepth(collection, iteratee, depth = 1) {
	return baseFlatten(map(collection, iteratee), depth);
}

export default flatMapDepth;
