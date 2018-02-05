import flattenDeep from './flattenDeep';
import basePickBy from './_basePickBy';
import hasIn from './hasIn';

function pick(object, ...paths){
	return object == null ? {} : basePickBy(object, flattenDeep(paths), (value, key) => hasIn(object, key) );
}

export default pick;