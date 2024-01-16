import {useEffect, useState} from "react";
import DropDown from "../../../../assets/components/Dropdown/Dropdown";
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

    //----------------------------------------------------------------
    //useEffect uses an API call whenever the prgram name changes
    //----------------------------------------------------------------
	useEffect(() => {
		var query_result = getProgramDetails(name);
		console.log(query_result);
		if (query_result.status !== 200) return;

		setProgramVersions(query_result.versions);
		setProgramQuery(query_result.version_detais);
	}, [name]);

    //---------------------------------------------------------------
    //load verion function takes the selected program version
    //and loads the appropriate devices for the program version 
    //---------------------------------------------------------------
	const loadVersion = (selectedVersion) => {
		//get the version details for the selected program version
		programQuery.forEach((version) => {
			if (version.version_number === selectedVersion) {
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
		console.log("Devices:" + tempDeviceList);
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
				setSelectedDevice(device);
			}
		});
	};

	return (
		<div className="program_details_container">
			<button className="program_details_edit_btn">{svgs.pencilSVG()}</button>
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
					<h2>Device Name: {selectedDevice.name}</h2>
					<h2>IPID: {selectedDevice.ipid}</h2>
					<h2>Program: {selectedDevice.deviceProgram}</h2>
					<div className="inline_content" style={{alignItems: "flex-start"}}>
						<h2>Notes: </h2> <p>{selectedDevice.notes}</p>
					</div>
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
