import {useEffect, useState} from "react";
import "./textField.css";
function TextField({
	isEditable,
	cachedChanges,
	setCachedChanges,
	updateCache,
	name,
	styleClass,
}) {
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
	useEffect(() => {
		console.log("edit In textField updated: " + isEditable);
	}, [isEditable]);

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
