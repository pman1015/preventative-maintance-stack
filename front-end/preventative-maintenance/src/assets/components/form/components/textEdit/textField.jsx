import {useEffect, useState} from "react";
import updateCache from "../../util/updateCache";
import "./textField.css";



/**
 * Text field component for the InputForm used to display and modify a text value
 * @date 2/2/2024 - 11:19:55 AM
 *
 * @param {{ isEditable: boolean; cachedChanges: Object; setCachedChanges: React.Dispatch<React.SetStateAction<Object>>; name: string; styleClass: string; error: boolean; message: string; }} param0
 * @param {boolean} param0.isEditable - boolean indicating whether the field shoudl display or edit text
 * @param {Object} param0.cachedChanges - Object containing cached changes as object {name:"fieldName", value:":value}
 * @param {function(Object)} param0.setCachedChanges - function to set the cached changes
 * @param {string} param0.name - name of the field
 * @param {string} param0.styleClass - CSS class to be applied to the field 
 * @param {boolean} param0.error -boolean indicating whether the field is in error state
 * @param {string} param0.message - message to display if in error
 * @returns {JSX.Element.TextField} 
 */
function TextField({
	isEditable,
	cachedChanges,
	setCachedChanges,
	name,
	styleClass,
	error,
	message,
}) {
	const [textValue, setTextValue] = useState("");
	//Function updates the text value whenever the cache is updated.
	useEffect(() => {
		console.log("fieldChange: " + cachedChanges);
		if (
			typeof cachedChanges === "undefined" ||
			typeof cachedChanges.values === "undefined"
		) {
			setTextValue("");
			return;
		}

		for (let i = 0; i < cachedChanges.values.length; i++) {
			let item = cachedChanges.values[i];
			if (item.name === name) {
				console.log("value: " + item.value);
				setTextValue(item.value);
				break;
			}
		}
	}, [cachedChanges, setCachedChanges]);

	return (
		<>
			{isEditable ? (
				<div className={"text-field " + error}>
					<input
						className="text-input"
						type="text"
						value={textValue}
						onChange={(e) => {
							updateCache(
								name,
								e.target.value,
								cachedChanges,
								setCachedChanges
							);
						}}
					/>
					<p>{message}</p>
				</div>
			) : (
				<h2 className={styleClass}>{textValue}</h2>
			)}
		</>
	);
}

export default TextField;
