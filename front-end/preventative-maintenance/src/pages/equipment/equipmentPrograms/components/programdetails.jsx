import {useEffect, useState} from "react";
import DropDown from "../../../../assets/components/Dropdown/Dropdown";
import InputForm from "../../../../assets/components/form/form";
import TextBox from "../../../../assets/components/form/components/textBox/textBox";
import {getProgramDetails} from "../../../../util/equipmentQueries";
import * as svgs from "../../components/equipmentSVGs";
import AddNewDevice from "./addDevice/addDevice";
import ChangeLog from "./changeLog";

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
	const [notesCache, setNotesCache] = useState({
		values: [{name: "Program Notes:", value: ""}],
	});
	const [changeLog, setChangeLog] = useState({});
	const [showAddDevice, setShowAddDevice] = useState(false);
	const [selectedVersion, setSelectedVersion] = useState("");

	//----------------------------------------------------------------
	//useEffect uses an API call whenever the prgram name changes
	//----------------------------------------------------------------
	useEffect(() => {
		var query_result = getProgramDetails(name);
		if (query_result.status !== 200) return;

		setProgramVersions(query_result.versions);
		setProgramQuery(query_result.version_details);
		setNotesCache({
			values: [{name: "Program Notes:", value: query_result.program_notes}],
		});
		generateChangeLog(query_result);
	}, [name]);

	//----------------------------------------------------------------
	//generates the changelog based on the api response
	//----------------------------------------------------------------
	function generateChangeLog(query_result) {
		var tempChangeLogs = [];
		query_result.version_details.forEach((versionDetails) => {
			tempChangeLogs.push({
				programVersions: versionDetails.version_number,
				changes: versionDetails.change_notes,
			});
		});
		console.log("log: " + tempChangeLogs);
		setChangeLog({versions: tempChangeLogs});
	}
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
				setSelectedVersion(selectedVersion);
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
	const [selectedDeviceName, setSelectedDeviceName] = useState("");
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
	//This function initalizes the cache for the selected device
	//The testForm object stores a list of fields that will be added to
	//the form
	//Return: (cache: "Default cache based on the API call for the selected device")
	//  	  (initialData: "The structure for the form to be layed out in")
	//---------------------------------------------------------------
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
					type: "textarea",
					initialValue: selectedDevice.notes,
					styleClass: "device-notes",
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
	//----------------------------------------------------------------
	//This useEffect listenes for a change in the selected device and
	//and sets the form fields to default and loads or sets a blank
	//cache
	//----------------------------------------------------------------
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
	//Toggles the editable state based on the button press
	//----------------------------------------------------------------
	const toggleEdit = () => {
		setIsEditable(!isEditable);
	};

	return (
		<>
			{showAddDevice && (
				<AddNewDevice
					setVisibility={setShowAddDevice}
					deviceList={deviceList}
					setDeviceList={setDeviceList}
					devices={devices}
					setDevices={setDevices}
					setSelectedDevice={setSelectedDevice}
					setSelectedDeviceName={setSelectedDeviceName}
				/>
			)}
			<div className="program_details_container">
				<button className="program_details_edit_btn" onClick={toggleEdit}>
					{isEditable ? svgs.saveSVG() : svgs.pencilSVG()}
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
							selected={selectedVersion}
							onSelect={loadVersion}
							options={programVersions}
						/>
					</div>
				</div>
				{selectedVersion !== "" && (
					<>
						<div className="inline_content">
							<h1 className="lightDesktopSubHeading">Details</h1>
							<button
								className="text_button"
								onClick={() => {
									setShowAddDevice(!showAddDevice);
								}}>
								<h2>Add New Device</h2>
							</button>
						</div>

						<div className="program_details_detailsSection">
							<div className="inline_content">
								<h2 className="DesktopSubHeading">Devices In Program</h2>
								<DropDown
									width="145"
									height="24"
									selected={selectedDeviceName}
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
						<InputForm
							initialStates={{
								inputs: [
									{
										fieldName: "Program Notes:",
										type: "textarea",
										initialValue: "",
										styleClass: "program_notes",
									},
								],
							}}
							cachedChanges={notesCache}
							setCachedChanges={setNotesCache}
							isEditable={isEditable}
						/>
					</>
				)}
			</div>
			<ChangeLog setChangeLog={setChangeLog} changeLog={changeLog} />
		</>
	);
}

export default ProgramDetails;
