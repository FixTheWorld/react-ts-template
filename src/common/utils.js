export function deepClone(source) {
    if (typeof source !== 'object' || source === null) {
        return source;
    }
    let target = Array.isArray(source) ? [] : {};
    for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            const value = source[key];
            const type = getType(value);
            if (value !== null && (type === 'Object' || type === 'Array')) {
                target[key] = deepClone(source[key]);
            } else {
                target[key] = value;
            }
        }
    }
    return target;
}

export function getType(obj) {
    let str = Object.prototype.toString.call(obj);
    return str.slice(7, -1);
}
