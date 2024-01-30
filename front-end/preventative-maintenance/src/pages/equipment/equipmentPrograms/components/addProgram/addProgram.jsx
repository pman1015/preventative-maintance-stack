import {useEffect, useState} from "react";
import InputForm from "../../../../../assets/components/form/form";
import {
	getProgramDetails,
	getProgramList,
} from "../../../../../util/equipmentQueries";
import * as svgs from "../../../components/equipmentSVGs";
import "./addProgram.css";
function AddNewProgram({setVisibility}) {
	//UseStates for the new Program vs new Version toggle
	const [selectedButton, setSelectedButton] = useState("left");
	//UseState to store errors
	const [errors, setErrors] = useState([]);
	return (
		<div className="add_new_program_container">
			<div className="add_new_program_header ">
				<div className="inline_content">
					<h1>Add New {selectedButton === "left" ? "Version" : "Program"}</h1>
					<div className="stacked_content">
						<ToggleButton
							selectedButton={selectedButton}
							setSelectedButton={setSelectedButton}
						/>
						<h3>version / program </h3>
					</div>
					<div className="Errors">
						{errors.map((error) => (
							<h3>{error}</h3>
						))}
					</div>
					<button
						className="exit_button"
						onClick={() => {
							setVisibility(false);
						}}>
						{svgs.circleXSVG()}
					</button>
				</div>
			</div>
			{selectedButton === "left" ? (
				<NewVersionContainer />
			) : (
				<NewProgramContainer />
			)}
		</div>
	);
}
export default AddNewProgram;

//----------------------------------------------------------------
//This function returns the container for updating the version of the
//The program
//----------------------------------------------------------------

function NewVersionContainer() {
	const [cachedChanges, setCachedChanges] = useState({});
	const [programInitialState, setProgramsInitialState] = useState(
		defaultProgramsDropdown
	);
	//----------------------------------------------------------------
	//This useEffect loads the programs from an api call whenever the
	//component is first loaded
	//----------------------------------------------------------------
	useEffect(() => {
		let result = getProgramList();
		if (result.status === 200) {
			var programsList = [];
			try {
				result.programs.forEach((program) => {
					programsList.push(program.name);
				});
			} catch (err) {}
			setProgramsInitialState({
				inputs: [
					{
						fieldName: "Program",
						type: "textChoiceBox",
						options: programsList,
						initialValue: "",
					},
				],
			});
		}
	}, []);

	//----------------------------------------------------------------
	//When the cache is updated set program selected to true if a program
	//is selected so the other options are shown
	//----------------------------------------------------------------
	const [programSelected, setProgramSelected] = useState(false);
	useEffect(() => {
		console.log(cachedChanges);
		if (
			JSON.stringify(cachedChanges) === "{}" ||
			typeof cachedChanges === "undefined" ||
			typeof cachedChanges.values === "undefined"
		) {
			return;
		}

		for (let i = 0; i < cachedChanges.values.length; i++) {
			let value = cachedChanges.values[i];
			if (value.name === "Program" && value.value !== "") {
				setProgramSelected(true);
				loadProgramDetails(value.name);
			}
		}
	}, [cachedChanges]);

	//----------------------------------------------------------------
	//
	//----------------------------------------------------------------
	const [newVersionCache, setNewVersionCache] = useState({});
	const [devicesCache, setDevicesCache] = useState({});

	const loadProgramDetails = (programName) => {
		let result = getProgramDetails(programName);
		if (result.status !== 200) return;

		//get the latest version

		let latestVersionDetails =
			result.version_details[result.version_details.length - 1];
		let tempDeviceCache = [];
		latestVersionDetails.devices.forEach((device) => {
			let tempDevice = {
				values: [
					{
						name: "Name",
						value: device.name,
					},
					{
						name: "IPID",
						value: device.ipid,
					},
					{
						name: "Program",
						value: device.deviceProgram,
					},
					{name: "notes", value: device.notes},
				],
			};
			tempDeviceCache.push(tempDevice);
		});
		setDevicesCache({devices: tempDeviceCache});
	};
	const initialSettings_newVersionForm = {
		inputs: [
			{
				fieldName: "version",
				type: "text",
				initialValue: "",
			},
			{
				fieldName: "Change Notes",
				type: "textarea",
				initalValue: "",
				styleClass: "device-notes",
			},
		],
	};
	return (
		<div className="form">
			<InputForm
				initialStates={programInitialState}
				isEditable={true}
				cachedChanges={cachedChanges}
				setCachedChanges={setCachedChanges}
			/>
			{programSelected && (
				<>
					<InputForm
						initialStates={initialSettings_newVersionForm}
						isEditable={true}
						cachedChanges={newVersionCache}
						setCachedChanges={setNewVersionCache}
					/>
					<DeviceSelector
						deviceCache={devicesCache}
						setDeviceCache={setDevicesCache}
					/>
					<div
						style={{
							width: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}>
						<button className="saveButton">
							<h1>Save</h1>
						</button>
					</div>
				</>
			)}
		</div>
	);
}

function NewProgramContainer() {
	const [cachedChanges, setCachedChanges] = useState({});
	const [devicesCache, setDevicesCache] = useState({});

	return (
		<div className="form">
			<InputForm
				initialStates={newProgramForm}
				isEditable={true}
				cachedChanges={cachedChanges}
				setCachedChanges={setCachedChanges}
			/>
			<DeviceSelector
				deviceCache={devicesCache}
				setDeviceCache={setDevicesCache}
			/>
			<div
				style={{
					width: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}>
				<button className="saveButton">
					<h1>Save</h1>
				</button>
			</div>
		</div>
	);
}

function DeviceSelector({deviceCache, setDeviceCache}) {
	const [devicePosition, setDevicePosition] = useState(0);
	const [currentDeviceCache, setCurrentDeviceCache] = useState({});
	const [runCheck, setRunCheck] = useState("");

	const inputs = [
		{
			fieldName: "Name",
			type: "text",
		},
		{
			fieldName: "Program",
			type: "text",
		},
		{
			fieldName: "IPID",
			type: "text",
		},
		{
			fieldName: "notes",
			type: "textarea",
			styleClass: "device-notes",
		},
	];
	const [newDeviceInitialState, setnewDeviceInitialState] = useState({
		inputs: inputs,
	});

	useEffect(() => {
		try {
			if (
				typeof deviceCache === "undefined" ||
				typeof deviceCache.devices === "undefined" ||
				deviceCache.devices.length === 0 ||
				deviceCache.devices.length <= devicePosition
			) {
				setCurrentDeviceCache({});
			} else {
				let device = deviceCache.devices[devicePosition];
				setCurrentDeviceCache(device);
			}
		} catch (e) {}
	}, [devicePosition, deviceCache]);

	//----------------------------------------------------------------
	//This function is to validate the cache
	// It goes through each section of the cache and ensures that it is valid
	// if the cache has less than the expected number of keys then some fields are
	// null and therefore invalid
	//----------------------------------------------------------------
	function validateFields(action) {
		var invalidFields = ["Name", "IPID", "Program", "notes"];
		if (action === 0) {
			invalidateFields([]);
			return true;
		}
		if (typeof currentDeviceCache.values === "undefined") {
			invalidateFields(invalidFields);
			return false;
		} else {
			invalidateFields([]);
			return true;
		}
	}
	function invalidateFields(values) {
		let newInput = [];
		inputs.forEach((input) => {
			let index = values.indexOf(input.fieldName);
			if (index !== -1) {
				values = values.slice(0, index).concat(values.slice(index + 1));
				input.error = "Invalid";
				input.message = "Field cannot be empty";
			}
			newInput.push(input);
		});
		setnewDeviceInitialState({inputs: newInput});
	}

	//----------------------------------------------------------------
	//This function is called when the current device is changed
	// Icrement the current position and save the current device on a +1
	// Decrement and store the current device on a -1
	// Delete the current device and adjust the position on a 0
	//----------------------------------------------------------------
	function updateCache(action) {
		if (
			typeof deviceCache !== "undefined" &&
			typeof deviceCache.devices !== "undefined" &&
			deviceCache.devices.length > 0
		) {
			let invalid = !validateFields(action);
			if (invalid) {
				return;
			}
			var tempCache = [];
			for (var i = 0; i < deviceCache.devices.length; i++) {
				let device = {};
				if (i === devicePosition) {
					device = currentDeviceCache;
					if (action === 0) {
						device = {};
					}
				} else {
					device = deviceCache.devices[i];
				}
				if (Object.keys(device).length !== 0) {
					tempCache.push(device);
				}
			}
			if (devicePosition > deviceCache.devices.length - 1 && action !== 0) {
				tempCache.push(currentDeviceCache);
			}
			setDeviceCache({devices: tempCache});
		} else {
			if (action === 0) {
				setCurrentDeviceCache({});
			} else {
				setDeviceCache({devices: [currentDeviceCache]});
			}
		}
		if (action === 0 && devicePosition > 0) {
			setDevicePosition(devicePosition - 1);
		} else {
			setDevicePosition(devicePosition + action);
		}
	}

	return (
		<div className="deviceSelector">
			<div className="currentDevice" style={{marginBottom: "12px"}}>
				<InputForm
					initialStates={newDeviceInitialState}
					isEditable={true}
					cachedChanges={currentDeviceCache}
					setCachedChanges={setCurrentDeviceCache}
					runCheck={runCheck}
					setRunCheck={setRunCheck}
				/>
			</div>
			<div
				className="inline-content"
				style={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
					gap: "12px",
				}}>
				{devicePosition > 0 && (
					<button
						onClick={() => {
							updateCache(-1);
						}}>
						<h1>Previous</h1>
					</button>
				)}

				<button
					onClick={() => {
						updateCache(0);
					}}>
					<h1>Delete</h1>
				</button>
				<button
					onClick={() => {
						updateCache(1);
					}}>
					<h1>Next</h1>
				</button>
			</div>
		</div>
	);
}

const defaultProgramsDropdown = {
	inputs: [
		{
			fieldName: "Program",
			type: "textChoiceBox",
			options: [],
			initialValue: "",
		},
	],
};
const newProgramForm = {
	inputs: [
		{
			fieldName: "Processor",
			type: "dropdown",
			options: ["DMPS-100", "DMPS-200"],
			initialValue: "",
		},
		{
			fieldName: "Program Name",
			type: "text",
			initialValue: "enter the name of the program",
		},
		{
			fieldName: "Version",
			type: "text",
			initialValue: "what is the first version of the program",
		},
		{
			fieldName: "Notes",
			type: "textarea",
			initialValue: "Enter any notes about the program",
			styleClass: "device-notes",
		},
	],
};

function ToggleButton({selectedButton, setSelectedButton}) {
	const inactive = "inactive";
	const active = "active";
	const [leftButton, setLeftButton] = useState("active");
	const [rightButton, setRightButton] = useState("");

	const toggle_state = () => {
		if (selectedButton == "left") {
			setSelectedButton("right");
		} else {
			setSelectedButton("left");
		}
	};
	useEffect(() => {
		if (selectedButton == "right") {
			setRightButton(active);
			setLeftButton(inactive);
		} else {
			setRightButton(inactive);
			setLeftButton(active);
		}
	}, [selectedButton]);

	return (
		<div className="toggle_button_container">
			<button
				className={"left_button " + leftButton}
				onClick={() => {
					toggle_state();
				}}
			/>
			<button
				className={"right_button " + rightButton}
				onClick={() => {
					toggle_state();
				}}
			/>
		</div>
	);
}
