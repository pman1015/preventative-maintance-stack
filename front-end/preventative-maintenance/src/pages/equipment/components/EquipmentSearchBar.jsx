import {useEffect, useState} from "react";
import * as svgs from "./equipmentSVGs";

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
export default EquipmentSearchBar;
