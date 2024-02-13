import {useEffect, useState} from "react";
import TextChoiceBox from "../../../textChoiceBox/textChoiceBox";
import updateCache from "../../util/updateCache";
import "./textChoiceBoxField.css";

/**
 * A Dropdown with a text box to refine the displayed options for use by the InputForm
 * @date 2/2/2024 - 11:11:00 AM
 *
 * @param {{ isEditable: boolean; cachedChanges: Object; setCachedChanges: React.Dispatch<React.SetStateAction<Object>>; name: string; styleClass: string; allOptions: string[]; }} param0
 * @param {boolean} param0.isEditable -If the field can be edited
 * @param {Object} param0.cachedChanges - Object soring the selection as a cache where {name:"fieldName", value:"selectedValue"}
 * @param {function(Object)} param0.setCachedChanges - function to update the cahce
 * @param {string} param0.name - the name of the field
 * @param {string} param0.styleClass - CSS class to be appleid to the field
 * @param {string[]} param0.allOptions - a list of options for the dropdown
 * @returns {JSX.Element.TextChoiceBoxField} the
 */
function TextChoiceBoxField({
	isEditable,
	cachedChanges,
	setCachedChanges,
	name,
	styleClass,
	allOptions,
}) {
	const [selected, setSelected] = useState("");

	function onSelect(selected) {
		updateCache(name, selected,cachedChanges,setCachedChanges);
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
