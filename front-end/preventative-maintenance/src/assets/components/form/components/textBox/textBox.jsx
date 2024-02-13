import {useEffect, useState} from "react";
import "./textBox.css";
import updateCache from "../../util/updateCache";


function TextBox({
	label,
	cachedChanges,
	setCachedChanges,
	editable,
	styleClass,
	error,
	message,
}) {
	const [textForBox, setTextForBox] = useState("");

	useEffect(() => {
		if (
			typeof cachedChanges !== "undefined" &&
			typeof cachedChanges.values !== "undefined"
		) {
			for (let i = 0; i < cachedChanges.values.length; i++) {
				let item = cachedChanges.values[i];
				if (item.name === label) {
					if (typeof item.value !== "undefined") {
						setTextForBox(item.value);
					}

					break;
				}
			}
		} else {
			setTextForBox("");
		}
	}, [cachedChanges]);

	return (
		<div className={"text_box " + styleClass + " " + error}>
			{editable ? (
				<>
					<h1>{label}</h1>
					<textarea
						className="text_box_input"
						value={textForBox}
						onChange={(e) => {
							updateCache(label, e.target.value,cachedChanges,setCachedChanges);
						}}
					/>
				</>
			) : (
				<>
					<h1>{label}</h1>
					<div className="text_box_asText">
						<h2>{textForBox}</h2>
					</div>
				</>
			)}
		</div>
	);
}
export default TextBox;
