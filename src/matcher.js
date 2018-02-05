import isMatch from './isMatch';
import assign from './assign';

function matcher(attrs){
	attrs = assign({}, attrs);
	return function(obj){
		return isMatch(obj, attrs);	
	}
}

export default matcher;