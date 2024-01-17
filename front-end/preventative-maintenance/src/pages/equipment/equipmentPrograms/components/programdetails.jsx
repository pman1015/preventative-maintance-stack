import {useEffect, useState} from "react";
import DropDown from "../../../../assets/components/Dropdown/Dropdown";
import InputForm from "../../../../assets/components/form/form";
import {getProgramDetails} from "../../../../util/equipmentQueries";
import * as svgs from "../../components/equipmentSVGs";

//----------------------------------------------------------------
//Program details take in a program name
//This returns a div with the program versions in a dropdown
//that updes the devices in the program based on the version selected
//----------------------------------------------------------------
function ProgramDetails({name}) {
	//----------------------------------------------------------------
	// ProgramQuery stores the program version details loaded from the
	// API call
	// devices stores the device information for the selected version
	// device list is are the options for the device dropdown
	// programVersions stores the version list of available versions
	//----------------------------------------------------------------
	const [programQuery, setProgramQuery] = useState({});
	const [devices, setDevices] = useState([]);
	const [deviceList, setDeviceList] = useState([]);
	const [programVersions, setProgramVersions] = useState([]);
	const [isEditable, setIsEditable] = useState(false);
	const [initialStates, setInitialStates] = useState({});

	//----------------------------------------------------------------
	//useEffect uses an API call whenever the prgram name changes
	//----------------------------------------------------------------
	useEffect(() => {
		var query_result = getProgramDetails(name);
		if (query_result.status !== 200) return;

		setProgramVersions(query_result.versions);
		setProgramQuery(query_result.version_detais);
	}, [name]);

	//---------------------------------------------------------------
	//load verion function takes the selected program version
	//and loads the appropriate devices for the program version
	//It also clears the cache of any changes made to an existing device
	//---------------------------------------------------------------
	const loadVersion = (selectedVersion) => {
		//get the version details for the selected program version
		programQuery.forEach((version) => {
			if (version.version_number === selectedVersion) {
				setCachedDevices({devices: []});
				loadDevices(version);
			}
		});
	};

	//---------------------------------------------------------------
	//load devices loades individal devices from the results of the
	//API call that are stored inside of the program query
	//---------------------------------------------------------------
	function loadDevices(versionDetails) {
		var tempDevices = [];
		var tempDeviceList = [];
		versionDetails.devices.forEach((device) => {
			tempDeviceList.push(device.name);
			tempDevices.push(device);
		});
		setDevices(tempDevices);
		setDeviceList(tempDeviceList);
	}

	//---------------------------------------------------------------
	//Select device stores and loads the details for the device selected
	//by the DropDown
	//---------------------------------------------------------------
	const [selectedDevice, setSelectedDevice] = useState({});
	const selectDevice = (selected) => {
		devices.forEach((device) => {
			if (device.name === selected) {
				try {
					cacheChanges(selectedDevice.name);
				} catch (e) {}
				setSelectedDevice(device);
			}
		});
	};

	//---------------------------------------------------------------
	//This use effect will detect an update to the selected device and
	//update the form to be loaded accordingly.
	//---------------------------------------------------------------
	const [form, setForm] = useState(<></>);
	const [cachedChanges, setCachedChanges] = useState({});
	const [cachedDevices, setCachedDevices] = useState({devices: []});

	function initalizeCacheForDevice() {
		var testForm = {
			inputs: [
				{
					fieldName: "Name",
					type: "text",
					initialValue: selectedDevice.name,
				},
				{
					fieldName: "Program",
					type: "text",
					initialValue: selectedDevice.deviceProgram,
				},
				{
					fieldName: "IPID",
					type: "text",
					initialValue: selectedDevice.ipid,
				},
				{
					fieldName: "notes",
					type: "text",
					initialValue: selectedDevice.notes,
				},
			],
		};
		var values = [];
		testForm.inputs.forEach((input) => {
			values.push({name: input.fieldName, value: input.initialValue});
		});
		return {
			cache: {values: values},
			initialData: testForm,
		};
	}

	useEffect(() => {
		var startData = initalizeCacheForDevice();
		loadCachedChanges(selectedDevice.name, startData.cache);
		setInitialStates(startData.initialData);
	}, [selectedDevice]);

	//----------------------------------------------------------------
	//This function stores the changes to a device in the cache and
	//
	//----------------------------------------------------------------
	function cacheChanges(deviceName) {
		var tempCache = [];
		var hasCached = false;

		for (var i = 0; i < cachedDevices.devices.length; i++) {
			var device = cachedDevices.devices[i];
			if (device.name === deviceName) {
				hasCached = true;
				tempCache.push({name: deviceName, cache: cachedChanges});
			} else {
				tempCache.push(device);
			}
		}
		if (!hasCached) {
			tempCache.push({name: deviceName, cache: cachedChanges});
		}
		setCachedDevices({devices: tempCache});
	}

	//----------------------------------------------------------------
	//This function checks if there are cached changes for a given device
	//If so then return the cached changes as a form input and otherwise
	//return a form input with the inital values
	//----------------------------------------------------------------

	function loadCachedChanges(deviceName, defaultCache) {
		var cachedDevice = {};
		var hasCache = false;
		cachedDevices.devices.forEach((device) => {
			if (device.name === deviceName) {
				cachedDevice = device.cache;
				hasCache = true;
			}
		});
		if (hasCache) {
			setCachedChanges(cachedDevice);
		} else {
			setCachedChanges(defaultCache);
		}
	}

	//----------------------------------------------------------------
	//Test Section
	//
	//----------------------------------------------------------------
	const toggleEdit = () => {
		setIsEditable(!isEditable);
	};
	useEffect(() => {
		console.log("Program details edit: " + isEditable);
	}, [isEditable]);
	return (
		<div className="program_details_container">
			<button className="program_details_edit_btn" onClick={toggleEdit}>
				{svgs.pencilSVG()}
			</button>
			<div className="program_details_header">
				<h1 className="lightDesktopSubHeading">Program Info</h1>
				<h2 className="DesktopSubHeading">Program Name: {name}</h2>
				<div
					className="inline_content"
					style={{zIndex: "12", position: "relative"}}>
					<h2 className="DesktopSubHeading"> Versions</h2>
					<DropDown
						width="145"
						height="24"
						selected="version"
						onSelect={loadVersion}
						options={programVersions}
					/>
				</div>
			</div>
			<h1 className="lightDesktopSubHeading">Details</h1>
			<div className="program_details_detailsSection">
				<div className="inline_content">
					<h2 className="DesktopSubHeading">Devices In Program</h2>
					<DropDown
						width="145"
						height="24"
						selected="Device Name"
						options={deviceList}
						onSelect={selectDevice}
					/>
				</div>
				<div className="program_details_device_details_container">
					<InputForm
						initialStates={initialStates}
						isEditable={isEditable}
						cachedChanges={cachedChanges}
						setCachedChanges={setCachedChanges}
					/>
				</div>
			</div>
			<div className="program_details_program_notes">
				<h1>Program Notes:</h1>
				<div className="program_details_program_notes_container"></div>
			</div>
		</div>
	);
}

export default ProgramDetails;
