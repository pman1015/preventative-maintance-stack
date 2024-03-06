import {useRef, useState} from "react";
import ScrollPaneV2 from "../../../../assets/components/ScrollPanev2/ScrollPaneV2";
import SVGButton from "../../../../assets/components/svgButton/svgButton";
import "./BuildingList.css";
function BuildingList({
	buildingList,
	setBuildingList,
	setActiveBuilding,
	activeBuilding,
	toggleEdit,
	setToggleEdit,
}) {
	const hover_index = useRef(-1);
	function setActive() {
		try {
			let selectedName = buildingList[hover_index.current];
			if (selectedName !== "") {
				setActiveBuilding(selectedName);
			}
		} catch (e) {}
	}
	function newBuilding() {
		let newBuilding = "new Building";
		if (buildingList.findIndex((obj) => obj === newBuilding) === -1) {
			setBuildingList([...buildingList, newBuilding]);
		}
	}
	function toggleEditMode() {
		setToggleEdit(!toggleEdit);
	}
	return (
		<div className="building_list">
			<h1>Buildings</h1>
			<div className="building_list_control">
				<SVGButton
					name={toggleEdit ? "save" : "pencil"}
					width={24}
					height={24}
					color={"black"}
					className={"circle gray withShadow"}
					onClickFunction={toggleEditMode}
				/>
				<SVGButton
					name={"plusCircle"}
					width={24}
					height={24}
					color={"black"}
					className={"circle gray withShadow"}
					onClickFunction={newBuilding}
				/>
			</div>
			<ScrollPaneV2
				cards={buildingList.map((building, index) => {
					return (
						<div
							className={`building_page_building_card ${
								activeBuilding === building ? "active" : ""
							} `}
							onMouseEnter={() => {
								hover_index.current = index;
							}}
							onClick={() => {
								setActive();
							}}>
							<h2>{building}</h2>
						</div>
					);
				})}
			/>
		</div>
	);
}
export default BuildingList;
