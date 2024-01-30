import {useEffect, useState} from "react";
import InputForm from "../../../../../assets/components/form/form";
import * as svgs from "../../../components/equipmentSVGs";
import "./addDevice.css";

function AddNewDevice({
	setVisibility,
	deviceList,
	setDeviceList,
	devices,
	setDevices,
	setSelectedDevice,
	setSelectedDeviceName,
}) {
	const [errors, setErrors] = useState("");
	const [newDeviceCache, setNewDeviceCache] = useState(defaultCache);

	//----------------------------------------------------------------
	//This funcion is called when add Device is called and verifies that
	//all fields in the form are filled
	//----------------------------------------------------------------
	function verifyDevice() {
		let newErrors = "";
		newDeviceCache.values.forEach((value) => {
			if (value.value === "") {
				newErrors += value.name + ": cannot be empty\n ";
			}
		});
		if (newErrors.length <= 0) {
			let response = validateDevice();
			if (response === "") {
				setVisibility(false);
			} else {
				newErrors += response;
			}
		}
		setErrors(newErrors);

		return;
	}

	function validateDevice() {
		var newDeviceName = "";
		//Check for name field
		for (let i = 0; i < newDeviceCache.values.length; i++) {
			if (newDeviceCache.values[i].name === "Name") {
				newDeviceName = newDeviceCache.values[i].value;
				break;
			}
		}
		if (newDeviceName === "") return "no Name found";
		//Check if name exists
		let invalidDevice = false;
		for (let i = 0; i < deviceList.length; i++) {
			if (deviceList[i] === newDeviceName) {
				invalidDevice = true;
				break;
			}
		}
		if (invalidDevice) return "Device already exists";
		//Add device
		var deviceToAdd = {};
		newDeviceCache.values.forEach((value) => {
			switch (value.name) {
				case "Name":
					deviceToAdd.name = value.value;
					break;
				case "IPID":
					deviceToAdd.ipid = value.value;
					break;
				case "Program":
					deviceToAdd.deviceProgram = value.value;
					break;
				case "notes":
					deviceToAdd.notes = value.value;
					break;
			}
		});
		setDevices([...devices, deviceToAdd]);
		setDeviceList([...deviceList, newDeviceName]);
		setSelectedDevice(deviceToAdd);
		setSelectedDeviceName(newDeviceName);
		return "";
	}
	return (
		<div className="add_new_device_container">
			<div className="inline_content" style={{width: "100%"}}>
				<h1>New Device</h1>
				{errors.length > 0 && (
					<h2 className="add_new_device_errors">{errors}</h2>
				)}
				<button
					className="close_button"
					onClick={() => {
						setVisibility(false);
					}}>
					{svgs.circleXSVG()}
				</button>
			</div>
			<div className="add_new_device_form">
				<InputForm
					initialStates={newDeviceForm}
					isEditable={true}
					cachedChanges={newDeviceCache}
					setCachedChanges={setNewDeviceCache}
				/>
			</div>
			<button
				onClick={() => {
					verifyDevice();
				}}
				className="add_new_device_btn">
				<h1>Add New Device</h1>
			</button>
		</div>
	);
}
export default AddNewDevice;

const defaultCache = {
	values: [
		{name: "Name", value: ""},
		{name: "Program", value: ""},
		{name: "IPID", value: ""},
		{name: "notes", value: ""},
	],
};

const newDeviceForm = {
	inputs: [
		{
			fieldName: "Name",
			type: "text",
			initialValue: "Device Name",
		},
		{
			fieldName: "Program",
			type: "text",
			initialValue: "Program",
		},
		{
			fieldName: "IPID",
			type: "text",
			initialValue: "##",
		},
		{
			fieldName: "notes",
			type: "text",
			initialValue: "notes for device",
		},
	],
};
