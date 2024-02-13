/**
 * This function takes in the cache that stores the selected options and updates the cache
 * @date 2/1/2024 - 3:10:26 PM
 *
 * @param {useState(Object)} param0.cache - the cache of the parent stores a list of options as objects
 * @param {React.Dispatch<React.SetStateAction<Object>>} param0.setCache - function to update the caches value
 * @param {string} param0.name - the name of the option
 * @param {boolean} param0.state - the state of if the option is selected or not
 * @param {string} param0.type - the type of data to be stored for this
 */
function toggleOption({optionsCache, setOptionsCache, name, state, type}) {
	let tempCache = [];

	let isAdded = false;
	try {
		optionsCache.values.forEach((value) => {
			if (value.name === name) {
				tempCache.push({name: name, value: state, type: type});
				isAdded = true;
			} else {
				tempCache.push(value);
			}
		});
	} catch (e) {}

	if (!isAdded) tempCache.push({name: name, value: state, type: type});
	setOptionsCache({values: tempCache});
}
export default toggleOption;
