import clone from './clone';

function cloneDeep(value){
	return clone(value, true);	
}

export default cloneDeep;