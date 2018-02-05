import baseCreate from './_baseCreate';
import assign from './assign';

function create(proto, props){
	const result = baseCreate(proto);
    return props == null ? result : assign(result, props);	
}

export default create;