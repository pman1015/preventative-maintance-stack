import {useEffect, useState} from "react";
import "./Dropdown.css";
function DropDown(props) {
	const [expanded, setExpanded] = useState(false);
	const [menuState, setMenuState] = useState("");
	const [selected, setSelected] = useState("selectedText");
	const [options, setOptions] = useState([]);

	const test = ["1", "test2", "test3", "test4"];

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
			console.log(props.width);
			const width = props.width;
			const height = props.height;
			setMenuProps({top: "-" + 1.5 * height + "px", width: width - 35 + "px"});
			setPropDimentions({width: width + "px", height: height + "px"});
		} catch (e) {}
	}, [props]);
	useEffect(() => {
		console.log(propDimentions);
		console.log(menuProps);
	}, [propDimentions]);
	return (
		<div>
			<div style={propDimentions} className={"dropdown-container " + menuState}>
				<h1 className="selected-Text">{selected}</h1>
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
