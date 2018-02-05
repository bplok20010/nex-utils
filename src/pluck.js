import map from './map';

function pluck(obj, key){
	return map(obj, item => item[key]);	
}

export default pluck;