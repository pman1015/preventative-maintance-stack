import {useEffect, useState} from "react";
import InputForm from "../../../../../assets/components/form/form";
import {
	getDeviceNames,
	getDeviceTypes,
} from "../../../../../util/equipmentQueries";

/**
 * This function generates the new device from component for the add equipment page
 * @date 2/1/2024 - 2:37:48 PM
 *
 * @returns {JSX.Element.NewDeviceForm}
 */
function NewDeviceForm({optionsCache, setOptionsCache}) {
	const [newDeviceInitial, setNewDeviceInitial] = useState({});
	const [deviceTypeCache, setDeviceTypeCache] = useState({});
	const [deviceTypeInitial, setDeviceTypeInitial] = useState({});
	const [newDeviceCache, setNewDeviceCache] = useState({});
	//----------------------------------------------------------------
	//This useEffect is to initalise the inital data for the from field
	//----------------------------------------------------------------
	const [nameToggle, setNameToggle] = useState(true);

	useEffect(() => {
		var types = loadTypes();
		setDeviceTypeInitial({
			inputs: [
				{
					fieldName: "Type Name",
					type: "textChoiceBox",
					options: types,
				},
			],
		});
	}, []);
	/**
	 * Loads all currently available types (names) from the database
	 * @returns {string[]} - The list of avaiable types
	 */
	function loadTypes() {
		var deviceTypes = getDeviceTypes();
		if (deviceTypes.status !== 200) return [];
		return deviceTypes.deviceTypes;
	}

	/**
	 *
	 * @param {string} selectedType -takes in the name of the selected device type
	 * @returns {string[]} - The list of avaiable device names for the selected device type
	 */
	function loadNames(selectedType) {
		var names = getDeviceNames(selectedType);
		if (names.status !== 200) return [];
		return names.names;
	}
	/**
	 * Automatically looks for the selected device type from the stored cache and returns
	 * all of the avaible names for the selected device type as a list of strings
	 * @returns {string[]}
	 */
	function getNames() {
		let name = "";
		if (
			typeof deviceTypeCache.values !== "undefined" &&
			deviceTypeCache.values.length > 0
		) {
			deviceTypeCache.values.forEach((value) => {
				if (value.name === "Type Name") {
					name = value.value;
				}
			});
		}
		return loadNames(name);
	}
	/**
	 * This useEffect runs ona change to the name toggle or on a change to the type selected
	 * The function updates the form field by either setting the device name to a textChoice field or
	 * a textField depending on the toggle it also updates the values for the choicebox whenever the
	 * selected type changes.
	 */
	useEffect(() => {
		var tempInputs = [];
		tempInputs.push({
			fieldName: "Serial Number",
			type: "text",
		});
		tempInputs.push({
			fieldName: "SUNY Tag",
			type: "text",
		});
		if (nameToggle) {
			tempInputs.push({
				fieldName: "Name",
				type: "textChoiceBox",
				options: getNames(),
			});
		} else {
			tempInputs.push({
				fieldName: "Name",
				type: "text",
			});
		}
		setNewDeviceInitial({inputs: tempInputs});
	}, [deviceTypeCache, nameToggle]);

	return (
		<div className="card newDeviceForm">
			<h1 style={{width: "180px", marginLeft: "8px"}} className="lightText">
				Add New Device
			</h1>
			<div style={{marginLeft: "12px", gap: "0px", width: "80%"}}>
				<div style={{zIndex: 10, position: "relative"}}>
					<InputForm
						initialStates={deviceTypeInitial}
						isEditable={true}
						cachedChanges={deviceTypeCache}
						setCachedChanges={setDeviceTypeCache}
					/>
				</div>

				<InputForm
					initialStates={newDeviceInitial}
					isEditable={true}
					cachedChanges={newDeviceCache}
					setCachedChanges={setNewDeviceCache}
				/>
				<div
					className="inline_content"
					style={{marginLeft: "calc( 50% - 48px)", marginTop: "-16px"}}>
					<h1 className="lightText" style={{fontSize: "16px"}}>
						New Name
					</h1>
					<button
						className="nameToggle"
						onClick={() => {
							setNameToggle(!nameToggle);
						}}>
						<div className={"left " + nameToggle} />

						<div className={"right " + !nameToggle} />
					</button>
				</div>
			</div>
		</div>
	);
}
export default NewDeviceForm;
