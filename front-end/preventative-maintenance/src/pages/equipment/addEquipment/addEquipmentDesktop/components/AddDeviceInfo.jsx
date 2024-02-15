import {useEffect, useState} from "react";
import IndexNavigation from "../../../../../assets/components/IndexNavigation/IndexNavigation";
import InputForm from "../../../../../assets/components/form/form";
import {getDeviceOptionsByType} from "../../../../../util/equipmentQueries";

function AddDeviceInfo({deviceName}) {
	//An array that stores the availabel options and there basic information as recieved from the database
	const [availableOptions, setAvailableOptions] = useState([]);
	//use State for the size of the available options to be used by the index navigation
	const [size, setSize] = useState(0);
	// useState for the current position of index navigation
	const [selectedIndex, setSelectedIndex] = useState(0);
	//Array of objects storing the available options as well as user input data
	const [formCache, setFormCache] = useState({});
	//use State that stores the configuration for the input form
	const [defaultInfo, setDefaultInfo] = useState([]);

	//----------------------------------------------------------------
	//This use effect loads the device options when device type is changed
	//----------------------------------------------------------------
	useEffect(() => {
		var deviceOptions = getDeviceOptionsByType(deviceName);
		if (deviceOptions.status !== 200) return [];
		setAvailableOptions(deviceOptions.options);
		setFormCache({});
		setSize(deviceOptions.options.length);
	}, [deviceName]);

	//----------------------------------------------------------------
	//This useEffect fires when the availabel options are changed
	//When the availabe options are changed it updates the formCache
	//With the new options their value
	//----------------------------------------------------------------
	useEffect(() => {
		let tempCache = [];
		for (let i = 0; i < availableOptions.length; i++) {
			try {
				let option = availableOptions[i];
				let index = -1;
				if (
					typeof formCache.values !== "undefined" &&
					Array.isArray(formCache.values)
				) {
					index = formCache.values.findIndex(
						(item) => item.name === option.name
					);
				}
				tempCache.push({
					name: option.name,
					type: option.type,
					value: index === -1 ? option.default : formCache.values[i].value,
					options: option.options,
					index: index,
				});
				setFormCache({values: tempCache});
			} catch (e) {
				console.error(e);
			}
		}
	}, [availableOptions, deviceName]);

	//----------------------------------------------------------------
	//This useEffect fires when the selectedIndex is changed
	//When the selectedIndex is changed it updates the formCache
	//With the new options their value
	//----------------------------------------------------------------
	useEffect(() => {
		console.log("updated Index");
		console.log(formCache);
		try {
			let selectedOption = availableOptions[selectedIndex];
			if (typeof selectedOption.type === "undefined") return;
			setDefaultInfo({
				inputs: [
					{
						fieldName: selectedOption.name,
						type: selectedOption.type,
						options: selectedOption.options,
					},
				],
			});
		} catch (e) {
			console.error(e);
		}
	}, [selectedIndex]);
	return (
		<div className="card addDeviceInfo">
			<h1>{`Add Device Info for: ${deviceName} `} </h1>
			<div className="infoFrom">
				<InputForm
					initialStates={defaultInfo}
					cachedChanges={formCache}
					setCachedChanges={setFormCache}
					isEditable={true}
				/>
			</div>

			<IndexNavigation
				size={size}
				selectedIndex={selectedIndex}
				setSelectedIndex={setSelectedIndex}
			/>
		</div>
	);
}

export default AddDeviceInfo;
