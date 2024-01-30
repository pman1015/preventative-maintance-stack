import {useEffect, useState} from "react";
import TextChoiceBox from "../../textChoiceBox/textChoiceBox";
import "./textChoiceBoxField.css";
function TextChoiceBoxField({
	isEditable,
	cachedChages,
	setCachedChanges,
	updateCache,
	name,
	styleClass,
	allOptions,
}) {
	const [selected, setSelected] = useState("");

	function onSelect(selected) {
		updateCache(name, selected);
	}
	

	return (
		<div className="textChoiceBox_field">
			<TextChoiceBox
				options={allOptions}
				selected={selected}
				setSelected={setSelected}
				onSelect={onSelect}
			/>
		</div>
	);
}
export default TextChoiceBoxField;
