/**
 * Function that is used to update the cache in each InputForm component
 *
 * @param {string} name -name of the field
 * @param {*} value  -value of the field
 * @param {Object} cachedChanges - cached changes stored as an object with one key : "values" and a value of a list of objects represnting all cached values as Objects with two keys name: "fieldname" and value:"the selected value"
 * @param {function(Object)} setCachedChanges - function to set cached changes
 */
const updateCache = (name, value, cachedChanges, setCachedChanges) => {
	var newCache = [];
	try {
		if (
			typeof cachedChanges === "undefined" ||
			typeof cachedChanges.values === "undefined" ||
			cachedChanges.values.length < 1
		) {
			newCache.push({name: name, value: value});
		} else {
			let newValue = true;
			for (let i = 0; i < cachedChanges.values.length; i++) {
				var param = cachedChanges.values[i];
				if (param.name === name) {
					newValue = false;
					param.value = value;
					newCache.push(param);
				} else {
					newCache.push(param);
				}
			}
			if (newValue) {
				newCache.push({name: name, value: value});
			}
		}

		setCachedChanges({values: newCache});
	} catch (e) {}
};
export default updateCache;
