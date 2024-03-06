import {useEffect, useState} from "react";
import ScrollPaneV2 from "../../../../assets/components/ScrollPanev2/ScrollPaneV2";
import InputForm from "../../../../assets/components/form/form";
import updateCache from "../../../../assets/components/form/util/updateCache";
import {getDeviceOptionsByType} from "../../../../util/equipmentQueries";
import "./EquipmentDetails.css";
function EquipmentDetails({equipment, editable}) {
	const [editDetails, setEditDetails] = useState(false);

	useEffect(() => {}, [equipment]);
	return (
		<div className="equipment-details-container">
			<h1>Equipment Details</h1>
			{editable ? (
				<EditEquipment equipment={equipment} isEditable={editable} />
			) : (
				<ScrollPaneV2
					cards={Object.keys(equipment).map((key) => {
						return (
							<div className="equipment-details-card inline-container">
								<h2>{key}:</h2>
								<p>{equipment[key]}</p>
							</div>
						);
					})}
				/>
			)}
		</div>
	);
}
export default EquipmentDetails;

function loadOptions(equipment) {
	let type = equipment.type;
	if (typeof type === "undefined") return;
	let response = getDeviceOptionsByType(type);
	if (response.status !== 200) return;
	return response.options;
}

function EditEquipment({equipment, isEditable}) {
	const [options, setOptions] = useState([]);
	useEffect(() => {
		setOptions(loadOptions(equipment));
	}, [equipment]);

	const [InitialForm, setInititialForm] = useState({});
	const [cachedChanges, setCachedChanges] = useState([]);
	useEffect(() => {
		let newform = [];
		let newValues = [];
		options.forEach((option) => {
			newform.push({
				fieldName: option.name,
				type: option.type,
				options: option.options,
				styleClass: option.type === "options" ?  {width: "120", height: "20"} : "",
			});
		});
		setInititialForm({inputs: newform});
	}, [options, setOptions]);

	useEffect(() => {
		let newCache = [];
		Object.keys(equipment).forEach((key) => {
			newCache.push({name: key, value: equipment[key]});
		});
		setCachedChanges({values: newCache});
	}, [InitialForm, setInititialForm]);
	return (
		<InputForm
			isEditable={isEditable}
			cachedChanges={cachedChanges}
			setCachedChanges={setCachedChanges}
			initialStates={InitialForm}
		/>
	);
}
