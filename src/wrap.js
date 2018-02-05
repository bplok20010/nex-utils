import partial from './partial';

export default function(func, wrapper){
	return partial(wrapper, func);	
}