import {useEffect, useRef, useState} from "react";
import ScrollPaneV2 from "../../../../assets/components/ScrollPanev2/ScrollPaneV2";
import InputForm from "../../../../assets/components/form/form";
import updateCache from "../../../../assets/components/form/util/updateCache";
import {getRoomInfo, getRooms} from "../../../../util/buildingQueries";
import SVGButton from "../../../../assets/components/svgButton/svgButton";
import "./RoomList.css";
function RoomList({
	activeBuilding,
	toggleEdit,
	activeEquipment,
	setActiveEquipment,
}) {
	const [buildingNameCache, setBuildingNameCache] = useState({});
	const [rooms, setRooms] = useState([]);
	useEffect(() => {
		updateCache(
			"Building Name",
			activeBuilding,
			buildingNameCache,
			setBuildingNameCache
		);
		let response = getRooms(activeBuilding);
		if (response.status !== 200) return;
		setRooms(response.rooms);
	}, [activeBuilding]);

	const selectedRoom = useRef(-1);
	const [activeRoomNumber, setActiveRoomNumber] = useState("");
	function loadRoom() {
		setActiveRoomNumber(rooms[selectedRoom.current]);
	}

	return (
		<div className="building_page_room_container">
			<div className="inline-container">
				<h1>Rooms</h1>
				<SVGButton
					name={"plusCircle"}
					width={24}
					height={24}
					color={"black"}
					className={"circle gray withShadow"}
					
				/>
			</div>
			<InputForm
				initialStates={buildingNameEdit}
				isEditable={toggleEdit}
				cachedChanges={buildingNameCache}
				setCachedChanges={setBuildingNameCache}
			/>
			<div className="room_config">
				<ScrollPaneV2
					cards={rooms.map((room, index) => {
						return (
							<div
								className={`building_page_room_card_container ${
									activeRoomNumber === room ? "active" : ""
								}`}
								onMouseEnter={() => {
									selectedRoom.current = index;
								}}
								onClick={() => {
									loadRoom();
								}}>
								<h2>{room}</h2>
							</div>
						);
					})}
				/>
				<RoomConfig
					roomName={activeRoomNumber}
					buildingName={activeBuilding}
					activeEquipment={activeEquipment}
					setAcitveEquipment={setActiveEquipment}
				/>
			</div>
		</div>
	);
}
export default RoomList;
const buildingNameEdit = {
	inputs: [{fieldName: "Building Name", type: "text"}],
};

function RoomConfig({
	roomName,
	buildingName,
	activeEquipment,
	setAcitveEquipment,
}) {
	const [roomInfo, setRoomInfo] = useState({});
	const [notesCache, setNotesCache] = useState({});
	const hoverIndex = useRef(-1);
	function selectEquipment() {
		setAcitveEquipment(roomInfo.equipment[hoverIndex.current]);
	}
	useEffect(() => {
		let response = getRoomInfo(buildingName, roomName);
		if (response.status !== 200) return;
		setRoomInfo(response.roomInfo);
	}, [roomName]);

	return (
		<div className="room_config_container">
			<h1>Room Number: {roomName}</h1>
			<h2>Equipment:</h2>
			{typeof roomInfo.equipment !== "undefined" && (
				<>
					<ScrollPaneV2
						header={EquipmentListHeader}
						cards={roomInfo.equipment.map((equipment, index) => {
							return (
								<div
									className="room_equipment_card inline-container"
									onMouseEnter={() => {
										hoverIndex.current = index;
									}}
									onClick={() => {
										selectEquipment();
									}}>
									<h2>{equipment.type}</h2>
									<h2>{equipment.name}</h2>
								</div>
							);
						})}
					/>
					<InputForm
						initialStates={roomNotesConfig}
						isEditable={true}
						cachedChanges={notesCache}
						setCachedChanges={setNotesCache}
					/>
				</>
			)}
		</div>
	);
}
const roomNotesConfig = {
	inputs: [{fieldName: "Room Notes:", type: "textarea"}],
};

const EquipmentListHeader = (
	<div className="room_equipment_card_header inline-container">
		<h2>Device Type</h2>
		<h2>Device Name</h2>
	</div>
);
