import {useEffect, useState} from "react";
import IndexNavigation from "../../../../../assets/components/IndexNavigation/IndexNavigation";
import FieldForm from "./FieldForm/FieldForm";

function FieldConfiguration({fieldCache, setFieldCache}) {
	const [size, setSize] = useState(0);
	const [selectedIndex, setSelectedIndex] = useState(0);
	useEffect(() => {
		try {
			setSize(fieldCache.values.length);
		} catch (e) {}
	}, [fieldCache]);

	const [selectedDevice, setSelectedDevice] = useState({});
	const [selectedDeviceName, setSelectedDeviceName] = useState("");
	useEffect(() => {
		//Update the fieldCache with the updated values from the fieldSelection
		storeTempCache(
			fieldCache,
			setFieldCache,
			selectedDevice,
			selectedDeviceName
		);
		//limit the range of the selected index to within the field cache
		if (selectedIndex < 0) {
			setSelectedIndex(0);
			return;
		} else {
			if (selectedIndex > size - 1 && size > 0) {
				setSelectedIndex(size - 1);
				return;
			}
		}
		//If the new Index is valid set load the stored cache
		let selectedCache = getValueFromFieldCache(fieldCache, selectedIndex);
		if (selectedCache === null) return;
		console.log(selectedCache);
		setSelectedDevice({values: selectedCache});
		setSelectedDeviceName(selectedCache.name);
	}, [selectedIndex, size]);

	return (
		<div className="FieldConfiguration card">
			<h1>Update Fields</h1>
			<div className="FieldContainer">
				<FieldForm cache={selectedDevice} setCache={setSelectedDevice} />
			</div>
			<IndexNavigation
				size={size}
				selectedIndex={selectedIndex}
				setSelectedIndex={setSelectedIndex}
			/>
		</div>
	);
}

export default FieldConfiguration;

function getValueFromFieldCache(fieldCache, index) {
	try {
		return fieldCache.values[index];
	} catch (e) {
		// handle error
		return null;
	}
}

function storeTempCache(fieldCache, setFieldCache, tempCache, name) {
	try {
		let tempArray = fieldCache.values;
		const index = tempArray.findIndex((obj) => obj.name === name);
		if (index !== -1) {
			tempArray[index] = tempCache.values;
			setFieldCache({values: tempArray});
		}
	} catch (e) {
		// handle error
	}
}
