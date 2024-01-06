import React, {useEffect, useState} from "react";
import DesktopContainer from "../../../assets/components/DesktopContainer/DesktopMainContainer";
import "./equipmentDesktop.css";
import * as svgs from "./equipmentSVGs";
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
		</>
	);
}

function EquipmentSearchBar() {
	const dimentions = {
		width: "525px",
		height: "64px",
	};

	const searchBys = ["Equipment Type", "Equipment Name", "Serial Number"];
	const [toggleButtons, setToggleButtons] = useState([]);
	const [searchType, setSearchType] = useState("");

	useEffect(() => {
		loadToggleOptions();
	}, [searchType]);

	const loadToggleOptions = () => {
		var newToggleOptions = [];
		searchBys.forEach((value) => {
			newToggleOptions.push(
				SearchToggleButton(value, searchType, setSearchType)
			);
		});
		setToggleButtons(newToggleOptions);
	};

	return (
		<div className="equipment_page_container" style={dimentions}>
			<div className="search_section">
				<button className="svg_button" style={{height: "32px", width: "32px"}}>
					{svgs.searchIcon()}
				</button>
				<div className="search_input">
					<input type="text" />
				</div>
				<div className="search_options_container">
					<h3 style={{marginRight: "4px", height: "22px"}}>search type:</h3>
					{toggleButtons.map((toggle) => toggle)}
				</div>
			</div>

			<button style={{height: "58px"}} className="svg_button">
				{svgs.filterIcon()}
			</button>
		</div>
	);
}
const SearchToggleButton = (value, searchType, setSearchType) => {
	return (
		<button
            key={value}
			className="toggleContainer"
			onClick={() => {
				setSearchType(value);
			}}>
			{value === searchType ? (
				<div className="toggle_select selected" />
			) : (
				<div className="toggle_select" />
			)}

			<h3 className="toggle_label">{value}</h3>
		</button>
	);
};

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
