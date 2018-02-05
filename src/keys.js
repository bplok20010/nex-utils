import has from './has';

const nativeKeys = Object.keys;

function keys(obj){
    if (nativeKeys) return nativeKeys(obj);
    const keys = [];
    for (let key in obj) if (has(obj, key)) keys.push(key);
    return keys;	
}

export default keys;