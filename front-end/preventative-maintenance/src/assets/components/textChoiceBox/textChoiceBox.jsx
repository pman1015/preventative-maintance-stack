import {useEffect, useState} from "react";
import "./textChoiceBox.css";
function TextChoiceBox({
	options,
	selected,
	setSelected,
	
	onSelect,
	
}) {
	const [typed, setTyped] = useState("");
	const [expanded, setExpanded] = useState(false);
	const [availableOptions, setAvailableOptions] = useState([]);

	//----------------------------------------------------------------
	//Use Effect to update the availabel options when the options prop is changed
	//----------------------------------------------------------------
	useEffect(() => {
		setAvailableOptions(options);
	}, [options]);

	//----------------------------------------------------------------
	//This use effect sets the text input when the selected value is changed
	// it also trys to run the onSelect and updateCache function if avaiable
	//----------------------------------------------------------------
	useEffect(() => {
		setTyped(selected);
        setExpanded(false);
		try {
			onSelect(selected);
		} catch (e) {}

		
	}, [selected]);

	//----------------------------------------------------------------
	// This use effect filters the available options to only include
	// thoes that contain the typed value
	//----------------------------------------------------------------
	useEffect(() => {
		var tempList = [];
		var lowercaseInput = typed.toLowerCase();
		options.forEach((option) => {
			if (option.toLowerCase().includes(lowercaseInput)) {
				tempList.push(option);
			}
		});
		setAvailableOptions(tempList);
	}, [typed]);

	return (
		<div className="text_choice_box">
			<input
				className="text_input_field"
				type="text"
				value={typed}
				onChange={(e) => {
					setTyped(e.target.value);
				}}
			/>
			<button
				className="expand_button"
				onClick={() => {
					setExpanded(!expanded);
				}}>
				{expanded ? upChevron : downChevron}
			</button>
			{expanded && (
				<div className="dropdown-menu">
					<ul>
						{availableOptions.map((option) => (
							<li
								onClick={() => {
									setSelected(option);
								}}>
								<h2>{option}</h2>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
export default TextChoiceBox;
const downChevron = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none">
		<path
			d="M6 9L12 15L18 9"
			stroke="black"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
);
const upChevron = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		style={{transform: "rotate(180deg)"}}
		fill="none">
		<path
			d="M6 9L12 15L18 9"
			stroke="black"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
);
