import {useEffect, useState} from "react";
import DropDown from "../../../Dropdown/Dropdown";
import updateCache from "../../util/updateCache";



/**
 * A DropDown option for an InputForm that takes in a list of options and updates the cacehe with the selected option
 * @date 2/2/2024 - 11:07:02 AM
 *
 * @param {{ cachedChanges: Object; setCachedChanges: React.Dispatch<React.SetStateAction<Object>>; editable: boolean; name: string; options: string[]; styleClass: string; }} param0
 * @param {Object} param0.cachedChanges - cached changes where selected option is stored as an Object with {name:fieldName, value: "selected"}
 * @param {function(Object)} param0.setCachedChanges - function to update cache
 * @param {boolean} param0.editable - boolean indicating if the option is editable
 * @param {string} param0.name - the name of the field
 * @param {string[]} param0.options - list of options to be displayed
 * @param {string} param0.styleClass - CSS class to be applied to the component
 * @returns {JSX.Element.ChoiceBox} 
 */
function ChoiceBox({
	cachedChanges,
	setCachedChanges,
	editable,
	name,
	options,
	styleClass,
}) {
	const [selectedValue, setSelectedValue] = useState("");
	useEffect(() => {
		updateCache(name, selectedValue,cachedChanges,setCachedChanges);
	}, [selectedValue, setSelectedValue]);
	const [styledWidth, setStyledWidth] = useState(200);
	const [styledHeight, setStyledHeight] = useState(24);
	useEffect(() => {
		if (
			typeof styleClass !== "undefined" &&
			Object.keys(styleClass).length > 0
		) {
			try {
				setStyledWidth(styleClass.width);
				setStyledHeight(styleClass.height);
			} catch (e) {}
		}
	}, [styleClass]);

	return (
		<div className={"choicebox_field "} style={{maxWidth: "80%", minWidth: "50%"}}>
			{editable ? (
				<DropDown
					width={styledWidth}
					height={styledHeight}
					options={options}
					selected={selectedValue}
					onSelect={setSelectedValue}
				/>
			) : (
				<h2>{selectedValue}</h2>
			)}
		</div>
	);
}

export default ChoiceBox;
