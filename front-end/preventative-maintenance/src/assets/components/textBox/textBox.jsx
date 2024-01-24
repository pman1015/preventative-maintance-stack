import {useEffect, useState} from "react";
import "./textBox.css";

//----------------------------------------------------------------
//The TextBox component is used to store and edit text and toggle to allow
//the editable to toggle the commonent to allow the user to edit the text
//----------------------------------------------------------------

//----------------------------------------------------------------
// label: The name to be displayed for the text box.
// cache: a useState to store the current value of the text box as value
// editable: useState to toggle from the parent component weather to display text or input
// height / width: optional numaric values for the height and width of the textBox
//----------------------------------------------------------------

function TextBox({label, cache, setCache, editable, height, width}) {
	const [textForBox, setTextForBox] = useState("");

	useEffect(() => {
		if (typeof cache.value !== "undefined") {
			setTextForBox(cache.value);
		}
	}, [cache]);

	function updateCacheValue(input) {
		setCache({value: input});
	}
	useEffect(() => {}, [height, width]);

	return (
		<div className="text_box">
			{editable ? (
				<>
					<h1>{label}</h1>
					<textarea
						className="text_box_input"
						value={textForBox}
						onChange={(e) => {
							updateCacheValue(e.target.value);
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
