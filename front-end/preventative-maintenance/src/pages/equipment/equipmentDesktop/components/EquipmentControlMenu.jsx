import {useEffect, useState} from "react";
import * as svgs from "./equipmentSVGs";
function EquipmentControlMenu() {
	const [expanded, setExpanded] = useState(false);
	return (
		<div style={{position: "static"}}>
			{/*Center button */}
			<button
				className="CenterButton"
				onClick={() => {
					setExpanded(!expanded);
				}}>
				{expanded ? svgs.menuSVG() : svgs.closeSVG()}
			</button>
			{expanded ? expandedMenu() : <></>}
		</div>
	);
}
const expandedMenu = () => {
	return (
		<div className="equipment_control_options">
			<button style={{top: "-85px", left: "58px"}}>
				{svgs.projectorSVG()}
			</button>
			<button style={{top: "-49px", left: "38px"}}>{svgs.programSVG()}</button>
			<button style={{top: "-16px", left: "-6px"}}>{svgs.addSVG()}</button>
			<button style={{top: "3px", left: "-71px"}}>{svgs.editSVG()}</button>
		</div>
	);
};
export default EquipmentControlMenu;
