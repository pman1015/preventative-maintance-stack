import {useEffect, useState} from "react";

function GetSVGByName(name, height, width) {
	switch (name) {
		case "minusCircle":
			return MinusCircle(height, width);
		case "plusCircle":
			return PlusCircle(height, width);
		default:
			return <></>;
	}
}
export default GetSVGByName;

//SVG consts
const MinusCircle = (height, width) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M6 9h6m4.5 0a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
				stroke="#fff"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
};

const PlusCircle = (height, width) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M6 9H12M9 6V12M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z"
				stroke="white"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
};
