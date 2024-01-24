import {useEffect, useState} from "react";
import "./textField.css";
//----------------------------------------------------------------
//This functuin takes in the following:
//	isEditable: A useState that stores the edit state of the form
//	cacheChanges: is a useState that stores an object with a list name value pairs
// 	updateCache: is a function in the form that updates a cached value based on name and value
//  name: is the name of the field
//  styleClass: is an optional CSS class for the field
//----------------------------------------------------------------
function TextField({
	isEditable,
	cachedChanges,
	setCachedChanges,
	updateCache,
	name,
	styleClass,
}) {

	//----------------------------------------------------------------
	//This use effect listens for changes to cached changes
	//When a change occurs it updates the text value for the text field
	//----------------------------------------------------------------
	const [textValue, setTextValue] = useState("");
	useEffect(() => {
		console.log("fieldChange: " + cachedChanges);
		if (typeof cachedChanges.values === "undefined") return;
		for (let i = 0; i < cachedChanges.values.length; i++) {
			let item = cachedChanges.values[i];
			if (item.name === name) {
				console.log("value: "+ item.value)
				setTextValue(item.value);
				break;
			}
		}
	}, [cachedChanges, setCachedChanges]);
	
	return (
		<>
			{isEditable ? (
				<div className="text-field">
					<input
						className="text-input"
						type="text"
						value={textValue}
						onChange={(e) => {
							updateCache(name, e.target.value);
							
						}}
					/>
				</div>
			) : (
				<h2 className={styleClass}>{textValue}</h2>
			)}
		</>
	);
}

export default TextField;
