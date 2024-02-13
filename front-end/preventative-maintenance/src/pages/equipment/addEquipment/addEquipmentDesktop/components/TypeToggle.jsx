import {useState, useEffect} from "react"


/**
 * This function return the component to toggle the types between new device and new device type
 * @date 2/1/2024 - 2:14:23 PM
 *
 * @param {React.useState(boolean)} param0.newTypeSelected - boolean to store if the toggle is in the state of the new device or new device type
 * @param {React.Dispatch<React.SetStateAction<boolean>>} param0.setNewTypeSelcted - set function for the selected state
 * @param {string} param0.leftText - Text displayed on the  left button
 * @param {string} param0.rightText - Text displayed on the right button
 * @param {string} param0.leftClass - CSS classname for the left button
 * @param {string} param0.rightClass - CSS classname for the right button
 * @returns {JSX.Element.TypeToggle}
 */
function TypeToggle({
	newTypeSelected,
	setNewTypeSelcted,
	leftText,
	rightText,
	leftClass,
	rightClass,
}) {
	const [leftButtonState, setLeftButtonState] = useState("");
	const [rightButtonState, setRightButtonState] = useState("inactive");

	const inactive = "inactive";
	const active = "";

	useEffect(() => {
		setLeftButtonState(newTypeSelected ? active : inactive);
		setRightButtonState(newTypeSelected ? inactive : active);
	}, [newTypeSelected, setNewTypeSelcted]);

	return (
		<div className="DeviceTypeToggle">
			<ToggleButton
				state={leftButtonState}
				className={leftClass}
				toggleState={newTypeSelected}
				setToggleState={setNewTypeSelcted}
				text={leftText}
			/>
			<ToggleButton
				state={rightButtonState}
				className={rightClass}
				toggleState={newTypeSelected}
				setToggleState={setNewTypeSelcted}
				text={rightText}
			/>
		</div>
	);
}

/**
 * Functional component for the individual toggle buttons
 * @date 2/1/2024 - 2:19:13 PM
 *
 * @param {{ state: any; className: any; toggleState: any; setToggleState: any; text: any; }} param0
 * @param {React.useState(string)} param0.state - stores the active or inactive class name
 * @param {string} param0.className - stores the style class name for the button
 * @param {React.useState(boolean)} param0.toggleState - stores the state of the toggle
 * @param {React.Dispatch<React.SetStateAction<boolean>>} param0.setToggleState - sets the toggle stae
 * @param {string} param0.text - stores the text for the toggle button
 * @returns {JSX.Element.ToggleButton} - return a toggle button compnent
 */
function ToggleButton({state, className, toggleState, setToggleState, text}) {
	return (
		<>
			<button
				className={className + " " + state}
				onClick={() => {
					setToggleState(!toggleState);
				}}>
				<h1>{text}</h1>
			</button>
		</>
	);
}
export default TypeToggle;