import {useEffect, useState} from "react";
import "./Dropdown.css";

//----------------------------------------------------------------
// DropDown component is used to display and select from a list of options
// this functuin takes in the following options
//	(Required) options -> a list of text options
//	(optional) selected -> the inital value to display as selected
//	(optional) onSelect -> a function that will recieve the selected value on selection
//	(optional) height -> the height of the dropdown container
//	(optional) width -> the width of the dropdown containeer
//----------------------------------------------------------------
function DropDown(props) {
	//----------------------------------------------------------------
	// expaned: boolean if the dropdown is expanded
	//----------------------------------------------------------------
	const [expanded, setExpanded] = useState(false);
	const [menuState, setMenuState] = useState("");
	const [selected, setSelected] = useState("selectedText");
	const [options, setOptions] = useState([]);
	const [textSize, setTextSize] = useState({});

	useEffect(() => {
		if (expanded) {
			setMenuState("expanded");
		} else {
			setMenuState("");
		}
	}, [expanded]);

	useEffect(() => {
		updateOptions();
	}, [selected]);
	const updateOptions = () => {
		try {
			var newOptions = [];
			props.options.forEach((option) => {
				if (!(option === selected)) {
					newOptions = [...newOptions, option];
				}
			});
			setOptions(newOptions);
		} catch (e) {
			console.log(e);
		}
	};
	const [propDimentions, setPropDimentions] = useState({width: "280px"});
	const [menuProps, setMenuProps] = useState();
	useEffect(() => {
		try {
			setSelected(props.selected);
			props.onSelect(props.selected);
		} catch (e) {}
	}, [props.selected]);
	useEffect(() => {
		try {
			const width = props.width;
			const height = props.height;
			setTextSize({fontSize: height - 8 + "px"});
			setMenuProps({width: width - 35 + "px"});
			setPropDimentions({width: width + "px", height: height + "px"});
		} catch (e) {}
	}, [props]);

	return (
		<div style={propDimentions}>
			<div style={propDimentions} className={"dropdown-container " + menuState}>
				<h1 className="selected-Text" style={textSize}>
					{selected}
				</h1>
				<button
					className="dropdown-Button"
					onClick={(event) => {
						updateOptions();
						setExpanded(!expanded);
					}}>
					{!expanded ? downChevron : upChevron}
				</button>
			</div>
			{!expanded ? (
				<></>
			) : (
				<div className="dropdown-menu " style={menuProps}>
					<ul
						style={{paddingTop: 0.75 * props.height + "px"}}
						className="dropdown-options">
						{options.map((entry) => (
							<li
								key={entry}
								onClick={(event) => {
									setSelected(entry);
									setExpanded(!expanded);
									try {
										props.onSelect(entry);
									} catch (e) {
										console.log(e);
									}
								}}>
								{entry}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
export default DropDown;

//----------------------------------------------------------------
//Cheverons are the svg's that display on the dropdown button
//----------------------------------------------------------------

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
