

export function getValue(cache, fieldName){
    if(typeof cache.values !== "undefined"){
        let index = cache.values.findIndex((obj) => obj.name === fieldName);
        if(index === -1) return false;
        return cache.values[index].value;
    }
}


