import isObject from './isObject';

const Ctor = function(){};
const nativeCreate = Object.create;

function baseCreate(proto){
	if (!isObject(proto)) {
    	return {};
    }
    if (nativeCreate) {
    	return nativeCreate(proto);
    }
    Ctor.prototype = proto;
    const result = new Ctor;
    Ctor.prototype = undefined;
    return result;	
}

export default baseCreate;