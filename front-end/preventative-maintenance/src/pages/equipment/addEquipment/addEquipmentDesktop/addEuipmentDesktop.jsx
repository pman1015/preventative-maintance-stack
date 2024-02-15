import {useEffect, useState} from "react";
import EquipmentControlMenu from "../../components/EquipmentControlMenu";
import * as svgs from "../../components/equipmentSVGs";
import "./addEquipmentDesktop.css";
import AddDeviceInfo from "./components/AddDeviceInfo";
import FieldConfiguration from "./components/FieldConfiguration";
import NewDeviceForm from "./components/NewDeviceForm";
import NewDeviceTypeForm from "./components/NewDeviceTypeForm";
import OptionCard from "./components/OptionCard";
import TypeToggle from "./components/TypeToggle";
function AddEquipmentDesktop() {
	const [newTypeSelected, setNewTypeSelcted] = useState(false);
	const [optionsCache, setOptionsCache] = useState({});
	const [fieldCache, setFieldCache] = useState({});
	const [deviceTypeCache, setDeviceTypeCache] = useState({});
	const [deviceType, setDeviceType] = useState("");

	useEffect(() => {
		try {
			const typeIndex = deviceTypeCache.values.findIndex(
				(value) => value.name === "Type Name"
			);
			if (typeIndex !== -1) {
				setDeviceType(deviceTypeCache.values[typeIndex].value);
			}
		} catch (e) {
			console.error(e);
		}
	}, [deviceTypeCache]);
	useEffect(() => {
		try {
			let tempCache = [];
			optionsCache.values.forEach((value) => {
				if (value.value) {
					tempCache.push(value);
				}
			});
			setFieldCache({values: tempCache});
		} catch (e) {}
	}, [optionsCache]);

	useEffect(() => {
		console.log(optionsCache);
	}, [optionsCache]);
	return (
		<>
			<div className="left_column_add_equipment">
				<div className="equipment_page_header">
					<EquipmentControlMenu />
					<div className="equipment_page_label">
						{svgs.equipmentHeader()}
						<h1 style={{top: "18px", fontSize: "24px"}}>Add Equipment</h1>
					</div>
				</div>
				<div className="add_equipment_buttons inline_content">
					<TypeToggle
						newTypeSelected={newTypeSelected}
						setNewTypeSelcted={setNewTypeSelcted}
						leftText="Add Device Type"
						leftClass="newDeviceType"
						rightText="Add Device"
						rightClass="newDevice"
					/>
					<button className="save_equipment">
						<h1 style={{fontSize: "24px"}}>Save</h1>
					</button>
				</div>
				{newTypeSelected ? (
					<NewDeviceTypeForm
						optionsCache={optionsCache}
						setOptionsCache={setOptionsCache}
					/>
				) : (
					<NewDeviceForm
						deviceTypeCache={deviceTypeCache}
						setDeviceTypeCache={setDeviceTypeCache}
					/>
				)}
			</div>
			<div className="right_column_add_equipment">
				{newTypeSelected ? (
					<FieldConfiguration
						fieldCache={fieldCache}
						setFieldCache={setFieldCache}
					/>
				) : (
					<AddDeviceInfo deviceName={deviceType} />
				)}
			</div>
		</>
	);
}
export default AddEquipmentDesktop;
