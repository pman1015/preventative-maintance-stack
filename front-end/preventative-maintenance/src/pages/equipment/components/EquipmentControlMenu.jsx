import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import * as svgs from "./equipmentSVGs";

function EquipmentControlMenu() {
	const [expanded, setExpanded] = useState(false);
	const [navigationDiv, setNavigationDiv] = useState(<></>);
	const [toNavigate, setToNavigate] = useState("");
	useEffect(() => {
		setNavigationDiv(<Navigate to={toNavigate} replace={true} />);
	}, [toNavigate]);
	return (
		<div style={{position: "static"}}>
			{navigationDiv}
			{/*Center button */}
			<button
				className="CenterButton"
				onClick={() => {
					setExpanded(!expanded);
				}}>
				{expanded ? svgs.menuSVG() : svgs.closeSVG()}
			</button>
			{expanded ? ExpandedMenu({setToNavigate}) : <></>}
		</div>
	);
}
const ExpandedMenu = (props) => {
	return (
		<div style={{position:"absolute"}}>
			<div className="equipment_control_options">
			<button
				onClick={() => {
					props.setToNavigate("/equipment");
				}}
				style={{top: "-85px", left: "58px"}}>
				{svgs.projectorSVG()}
			</button>
			<button
				onClick={() => {
					props.setToNavigate("/equipment/programs");
				}}
				style={{top: "-49px", left: "38px"}}>
				{svgs.programSVG()}
			</button>
			<button
				onClick={() => {
					props.setToNavigate("/equipment/addEquipment");
				}}
				style={{top: "-16px", left: "-6px"}}>
				{svgs.addSVG()}
			</button>
			<button
				onClick={() => {
					props.setToNavigate("/equipment/maintanceEdit");
				}}
				style={{top: "3px", left: "-71px"}}>
				{svgs.editSVG()}
			</button>
		</div>
		</div>
		
	);
};
export default EquipmentControlMenu;
