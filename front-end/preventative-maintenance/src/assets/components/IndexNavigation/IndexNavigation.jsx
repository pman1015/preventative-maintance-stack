import {useEffect, useState} from "react";
import "./IndexNavigation.css";
function IndexNavigation({size, selectedIndex, setSelectedIndex}) {
	const [navigationButtons, setNavigationButtons] = useState([]);

	const [showState, setShowState] = useState("");
	const maxShownSize = 5;
	useEffect(() => {
		//Toggle navigation state based on if there are more than 5 options
		if (size > maxShownSize) {
			setShowState("elpsies");
		} else setShowState("normal");
	}, [size]);

	useEffect(() => {
		let newButtons = [];
		if (showState === "normal") {
			for (let i = 0; i < size; i++) {
				newButtons.push(
					<NavigationIconButton
						key={i}
						index={i}
						selectedIndex={selectedIndex}
						setSelectedIndex={setSelectedIndex}
					/>
				);
			}
		} else {
			for (let i = 0; i < Math.floor(maxShownSize / 2); i++) {
				newButtons.push(
					<NavigationIconButton
						key={i}
						index={i}
						selectedIndex={selectedIndex}
						setSelectedIndex={setSelectedIndex}
					/>
				);
			}

			newButtons.push(elepsiesSVG());
			for (let i = size - Math.floor(maxShownSize / 2); i < size; i++) {
				newButtons.push(
					<NavigationIconButton
						key={i}
						index={i}
						selectedIndex={selectedIndex}
						setSelectedIndex={setSelectedIndex}
					/>
				);
			}
		}
		setNavigationButtons(newButtons);
	}, [showState, size, selectedIndex]);
	useEffect(() => {
		if(size === 0) return;
		if (selectedIndex > size - 1) {
			setSelectedIndex(size - 1);
		} else {
			if (selectedIndex < 0) {
				setSelectedIndex(0);
			}
		}
		console.log("Selected Index " + selectedIndex);
	}, [selectedIndex]);

	return (
		<div className="indexNav">
			<button
				className="cheveron-button"
				onClick={() => {
					setSelectedIndex(selectedIndex - 1);
				}}>
				{left_cheveron()}
			</button>
			<div className="index-buttons">
				{navigationButtons.map((button) => button)}
			</div>

			<button
				className="cheveron-button"
				onClick={() => {
					setSelectedIndex(selectedIndex + 1);
				}}>
				{right_cheveron()}
			</button>
		</div>
	);
}
export default IndexNavigation;

function NavigationIconButton({index, selectedIndex, setSelectedIndex}) {
	const [isSelected, setIsSelected] = useState(false);

	useEffect(() => {
		setIsSelected(index === selectedIndex);
	}, [index, selectedIndex]);

	return (
		<button
			className={isSelected ? `selected` : ""}
			onClick={() => {
				setSelectedIndex(index);
			}}>
			<h1>{index + 1}</h1>
		</button>
	);
}

const elepsiesSVG = () => {
	return (
		<svg
			style={{marginTop: "auto", marginBottom: "auto"}}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none">
			<path
				d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
				stroke="black"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
				stroke="black"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
				stroke="black"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
};
const left_cheveron = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none">
			<path
				d="M15 18L9 12L15 6"
				stroke="black"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
};
const right_cheveron = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none">
			<path
				d="M9 18L15 12L9 6"
				stroke="black"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
};
