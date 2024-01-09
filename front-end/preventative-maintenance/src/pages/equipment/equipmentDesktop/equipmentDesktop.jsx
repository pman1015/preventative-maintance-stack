import React, {useEffect, useState} from "react";
import DesktopContainer from "../../../assets/components/DesktopContainer/DesktopMainContainer";
import EquipmentControlMenu from "../components/EquipmentControlMenu";
import EquipmentInventory from "../components/EquipmentInventory";
import EquipmentSearchBar from "../components/EquipmentSearchBar";
import * as svgs from "../components/equipmentSVGs";
import "./equipmentDesktop.css";
function EquipmentDesktop() {
	return (
		<>
			<DesktopContainer content={EquipmentContent()} />
		</>
	);
}

export default EquipmentDesktop;

function EquipmentContent(props) {
	return (
		<>
			<div className="equipment_page_header">
				{EquipmentControlMenu()}
				<div className="equipment_page_label">
					{svgs.equipmentHeader()}
					<h1>Equipment</h1>
				</div>
				{EquipmentSearchBar()}
			</div>
			<EquipmentInventory />
		</>
	);
}
