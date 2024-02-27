import {useEffect, useState} from "react";
import EquipmentControlMenu from "../../components/EquipmentControlMenu";
import * as svgs from "../../components/equipmentSVGs";
import DeviceTypeSelect from "./components/DeviceTypeSelect";
import StepEdit from "./components/StepEdit";
import PMStepsList from "./components/StepsList";
import "./maintanceEditDesktop.css";
import ConfugureLogging from "./components/ConfigureLogging";
function MaintanceEditDesktop() {
	//Cache to store the current selection for device type
	const [deviceSelectCache, setDeviceSelectCache] = useState({});
	const [selectedCard, setSelectedCard] = useState({});

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
				<ConfugureLogging selectedCard={selectedCard} setSelectedCard={setSelectedCard}/>
			</div>
		</>
	);
}

export default MaintanceEditDesktop;
