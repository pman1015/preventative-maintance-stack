import {useEffect, useState} from "react";
import EquipmentControlMenu from "../../components/EquipmentControlMenu";
import * as svgs from "../../components/equipmentSVGs";
import DeviceTypeSelect from "./components/DeviceTypeSelect";
import StepEdit from "./components/StepEdit";
import PMStepsList from "./components/StepsList";
import Preview from "./components/Preview";
import "./maintanceEditDesktop.css";
import ConfugureLogging from "./components/ConfigureLogging";
import { getDeviceOptionsByType } from "../../../../util/equipmentQueries";
function MaintanceEditDesktop() {
	//Cache to store the current selection for device type
	const [deviceSelectCache, setDeviceSelectCache] = useState({});
	const [selectedCard, setSelectedCard] = useState({});
	const [deviceOptions, setDeviceOptions] = useState([]);
	const [steps_count ,set_steps_count] = useState(0);
	const [deviceType, setDeviceType] = useState("");
	useEffect(()=> {
		if(typeof deviceSelectCache.values !== "undefined"){
			let typeIndex =deviceSelectCache.values.findIndex((obj)=> obj.name === "Device Type");
			if(typeIndex !== -1){
				setDeviceType(deviceSelectCache.values[typeIndex].value);
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
			<div className="left-side-page" style={{paddingRight:"32px"}}>
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
					set_steps_count = {set_steps_count}
				/>
			</div>
			<div className="left-side-page">
				<StepEdit selectedStep={selectedCard} setSelectedStep={setSelectedCard} />
				<ConfugureLogging selectedCard={selectedCard} setSelectedCard={setSelectedCard} deviceOptions = {deviceOptions}/>
			</div>
			<div className="left-side-page" style={{paddingRight:"0px"}}>
				<Preview selectedStep={selectedCard} deviceType={deviceType} steps_count={steps_count}/>

			</div>
		</>
	);
}

export default MaintanceEditDesktop;
