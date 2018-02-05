import keys from './keys';

function values(obj){
	return obj == null ? [] : keys(obj).map( key => obj[key] );
}

export default values;