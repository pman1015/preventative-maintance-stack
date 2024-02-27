import {useEffect, useState} from "react";
import EquipmentControlMenu from "../../components/EquipmentControlMenu";
import * as svgs from "../../components/equipmentSVGs";
import DeviceTypeSelect from "./components/DeviceTypeSelect";
import StepEdit from "./components/StepEdit";
import PMStepsList from "./components/StepsList";
import "./maintanceEditDesktop.css";
import ConfugureLogging from "./components/ConfigureLogging";
import { getDeviceOptionsByType } from "../../../../util/equipmentQueries";
function MaintanceEditDesktop() {
	//Cache to store the current selection for device type
	const [deviceSelectCache, setDeviceSelectCache] = useState({});
	const [selectedCard, setSelectedCard] = useState({});
	const [deviceOptions, setDeviceOptions] = useState([]);
	useEffect(()=> {
		if(typeof deviceSelectCache.values !== "undefined"){
			let typeIndex =deviceSelectCache.values.findIndex((obj)=> obj.name === "Device Type");
			if(typeIndex !== -1){
				let response = getDeviceOptionsByType(deviceSelectCache.values[typeIndex].value);
				let options = [];
				if(response.status === 200){
					response.options.forEach(option => {
						options.push(option.name);
					});
				}
				setDeviceOptions(options);
			}
		}
	},[deviceSelectCache])

	return (
		<>
			<div className="left-side-page">
				<div className="equipment_page_header">
					<EquipmentControlMenu />
					<div className="equipment_page_label">
						{svgs.equipmentHeader()}
						<h1 style={{top: "18px", fontSize: "24px"}}>PM Check List</h1>
					</div>
				</div>

				<DeviceTypeSelect
					deviceSelectCache={deviceSelectCache}
					setDeviceSelectCache={setDeviceSelectCache}
				/>
				<PMStepsList
					deviceTypeCache={deviceSelectCache}
					selectedCard={selectedCard}
					setSelectedCard={setSelectedCard}
				/>
			</div>
			<div className="left-side-page">
				<StepEdit selectedStep={selectedCard} setSelectedStep={setSelectedCard} />
				<ConfugureLogging selectedCard={selectedCard} setSelectedCard={setSelectedCard} deviceOptions = {deviceOptions}/>
			</div>
		</>
	);
}

export default MaintanceEditDesktop;
