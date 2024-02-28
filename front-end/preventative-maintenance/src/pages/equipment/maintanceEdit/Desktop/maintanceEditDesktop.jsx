import {useEffect, useState} from "react";
import TextButton from "../../../../assets/components/TextButton/TextButton"
import {getDeviceOptionsByType} from "../../../../util/equipmentQueries";
import EquipmentControlMenu from "../../components/EquipmentControlMenu";
import * as svgs from "../../components/equipmentSVGs";
import ConfugureLogging from "./components/ConfigureLogging";
import DeviceTypeSelect from "./components/DeviceTypeSelect";
import Preview from "./components/Preview";
import StepEdit from "./components/StepEdit";
import PMStepsList from "./components/StepsList";
import "./maintanceEditDesktop.css";
function MaintanceEditDesktop() {
	//Cache to store the current selection for device type
	const [deviceSelectCache, setDeviceSelectCache] = useState({});
	const [selectedCard, setSelectedCard] = useState({});
	const [deviceOptions, setDeviceOptions] = useState([]);
	const [steps_count, set_steps_count] = useState(0);
	const [deviceType, setDeviceType] = useState("");
	const [toggleSave, setToggleSave] = useState(false);
	useEffect(() => {
		if (typeof deviceSelectCache.values !== "undefined") {
			let typeIndex = deviceSelectCache.values.findIndex(
				(obj) => obj.name === "Device Type"
			);
			if (typeIndex !== -1) {
				if (deviceSelectCache.values[typeIndex].value !== deviceType)
					setToggleSave(true);
				setDeviceType(deviceSelectCache.values[typeIndex].value);
				let response = getDeviceOptionsByType(
					deviceSelectCache.values[typeIndex].value
				);
				let options = [];
				if (response.status === 200) {
					response.options.forEach((option) => {
						options.push(option.name);
					});
				}
				setDeviceOptions(options);
			}
		}
	}, [deviceSelectCache]);

	function ClearChanges() {
		setDeviceType("");
		setDeviceSelectCache({});
		setToggleSave(false);
	}
	return (
		<>
			<div
				className="left-side-page"
				style={{paddingRight: "32px", minWidth: "260px"}}>
				<div className="equipment_page_header">
					<EquipmentControlMenu />
					<div className="equipment_page_label">
						{svgs.equipmentHeader()}
						<h1 style={{top: "18px", fontSize: "24px"}}>PM Check List</h1>
					</div>
				</div>
				{toggleSave ? (
					<div
						className="inline-container"
						style={{gap: "16px", marginTop: "24px"}}>
						<TextButton label="Save" width="120px" />
						<TextButton
							label="Cancel"
							width="120px"
							onClickFunction={ClearChanges}
						/>
					</div>
				) : (
					<DeviceTypeSelect
						deviceSelectCache={deviceSelectCache}
						setDeviceSelectCache={setDeviceSelectCache}
					/>
				)}
				<PMStepsList
					deviceTypeCache={deviceSelectCache}
					selectedCard={selectedCard}
					setSelectedCard={setSelectedCard}
					set_steps_count={set_steps_count}
				/>
			</div>
			<div className="left-side-page">
				<StepEdit
					selectedStep={selectedCard}
					setSelectedStep={setSelectedCard}
				/>
				<ConfugureLogging
					selectedCard={selectedCard}
					setSelectedCard={setSelectedCard}
					deviceOptions={deviceOptions}
				/>
			</div>
			<div className="left-side-page" style={{paddingRight: "0px"}}>
				<Preview
					selectedStep={selectedCard}
					deviceType={deviceType}
					steps_count={steps_count}
				/>
			</div>
		</>
	);
}

export default MaintanceEditDesktop;
