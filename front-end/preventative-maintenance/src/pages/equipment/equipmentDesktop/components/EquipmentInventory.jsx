import React, {useEffect, useState} from "react";
import DropDown from "../../../../assets/components/Dropdown/Dropdown";
import * as svgs from "./equipmentSVGs";

function EquipmentInventory() {
	const headerLabels = [
		"Equipment Type",
		"Equipment Name",
		"Location",
		"Serial Number",
	];
	const [activeSort, setActiveSort] = useState({label: "", state: ""});
	//Sample data to return from a DB call
	const inventory = require("../../../../assets/testData/equipmentData.json");
	return (
		<div className="equipment_page_inventory_container">
			<div className="equipment_page_inventory_header">
				{headerLabels.map((item) =>
					EquipmentSortCard(item, activeSort, setActiveSort)
				)}
			</div>
			<div className="equipment_page_inventory_scrollpane">
				{inventory.items.map((item) => EquipmentInventoryCard(item))}
			</div>
		</div>
	);
}
const EquipmentSortCard = (label, activeSort, setActiveSort) => {
	const [state, setState] = useState("ascend");
	const [svg, setSVG] = useState();
	const setAsActive = () => {
		setActiveSort({label: label, state: state});
	};
	useEffect(() => {
		if (activeSort.label !== label) {
			setState("");
		}
	}, [activeSort]);
	const incrementState = () => {
		switch (state) {
			case "ascend":
				setState("descend");
				break;
			case "descend":
				setState("");
				break;
			case "":
				setState("ascend");
				break;
		}
	};

	useEffect(() => {
		switch (state) {
			case "ascend":
				setSVG(svgs.aToZSVG);
				break;
			case "descend":
				setSVG(svgs.zToASVG);
				break;
			case "":
				setSVG(svgs.barSVG);
				break;
		}
	}, [state]);
	return (
		<div className="equipment_page_equipment_sort_container">
			<h1>{label}</h1>
			<button
				onClick={() => {
					incrementState();
					setAsActive();
				}}
				style={{height: "24px", width: "24px", marginLeft: "4px"}}
				className="svg_button">
				{svg}
			</button>
		</div>
	);
};

const EquipmentInventoryCard = (item) => {
	const expanded_card = (item) => {
		return (
			<div className="equipment_page_inventory_expanded">
				{loadProjectorInfo()}
			</div>
		);
	};
	const loadProjectorInfo = () => {
		const projector = {sunyTag: "someNumberHere"};
		const query_result = {
			normalHours: "1000",
			ecoHours: "12",
			totalHours: "1012",
			bulbCount: "1",
			availableResoultions: ["1920x1080", "1920X1200"],
			currentResolution: "1920x1080",
			input: "1",
			output: "4",
			controlType: "CrestronControl",
			hasScalar: "true",
		};

		return (
			<>
				<div className="equipment_card_column">
					<h1>Normal Hours: {query_result.normalHours}</h1>
					<h1>Eco Hours: {query_result.ecoHours}</h1>
					<h1>Total Hours: {query_result.totalHours}</h1>
					<h1>Bulb Count: {query_result.bulbCount}</h1>
				</div>
				<div className="equipment_card_column">
					<h1>Control Type: {query_result.controlType}</h1>
					<h1>Has Scalar: {query_result.hasScalar}</h1>
					<h1>SUNY Tag: {projector.sunyTag}</h1>
				</div>
				<div className="equipment_card_column">
					<div style={{display: "flex", alignItems: "flex-start"}}>
						<h1>Available Resolutions</h1>
						<div style={{position: "absolute", right: "170px", top: "70px"}}>
							<DropDown
								options={query_result.availableResoultions}
								width="120"
								height="24"
							/>
						</div>
					</div>
					<h1>Current Resolution: {query_result.currentResolution}</h1>
					<h1>Input used: {query_result.input}</h1>
					<h1>Output: {query_result.output}</h1>
				</div>
				{/* 
				
				*/}
			</>
		);
	};
	const [expanded, setExpaned] = useState(false);
	return (
		<div className="equipment_page_inventory_card" id="pointer">
			<div
				onClick={() => {
					setExpaned(!expanded);
				}}
				className="equipment_page_inventory_basic_info">
				<h1>{item.type}</h1>
				<h1>{item.name}</h1>
				<h1>{item.building + " " + item.room}</h1>
				<h1>{item.serialNumber}</h1>
			</div>
			{expanded ? expanded_card(item) : <></>}
		</div>
	);
};

export default EquipmentInventory;
