import {useEffect, useState} from "react";
import DesktopContainer from "../../../assets/components/DesktopContainer/DesktopMainContainer";
import {getBuildings} from "../../../util/buildingQueries";
import BuildingList from "./components/BuildingList";
import EquipmentDetails from "./components/EquipmentDetails";
import RoomList from "./components/RoomList";
function BuildingPageDesktop() {
	return (
		<>
			<DesktopContainer content={BuildingPageContent()} />
		</>
	);
}

export default BuildingPageDesktop;

function BuildingPageContent() {
	const [buildingList, setBuildingList] = useState([]);
	const [activeBuilding, setActiveBuilding] = useState("");
	const [toggleEdit, setToggleEdit] = useState(false);
	const [activeEquipment, setActiveEquipment] = useState({});
	useEffect(() => {
		let response = getBuildings();
		if (response.status === 200) {
			setBuildingList(response.buildings);
		}
	}, []);
	return (
		<>
			<BuildingList
				buildingList={buildingList}
				setBuildingList={setBuildingList}
				toggleEdit={toggleEdit}
				setToggleEdit={setToggleEdit}
				activeBuilding={activeBuilding}
				setActiveBuilding={setActiveBuilding}
			/>
			<RoomList
				activeBuilding={activeBuilding}
				toggleEdit={toggleEdit}
				activeEquipment={activeEquipment}
				setActiveEquipment={setActiveEquipment}
			/>
			{Object.keys(activeEquipment).length > 0 && (
				<EquipmentDetails equipment={activeEquipment} editable={toggleEdit} />
			)}
		</>
	);
}
