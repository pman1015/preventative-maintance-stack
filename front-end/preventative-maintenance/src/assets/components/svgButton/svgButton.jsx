import {useEffect, useState} from "react";
import "./svgButton.css";
import GetSVGByName from "./svgs";

function SVGButton({name, width, height, onClickFunction, className, color}) {
	const [svg, setSVG] = useState(<></>);
	useEffect(() => {
		setSVG(GetSVGByName(name, width, height, color));
	}, [name]);

	return (
		<button
			className={`${className} svgButton`}
			style={{width: width, height: height}}
			onClick={() => {
				onClickFunction();
			}}>
			{svg}
		</button>
	);
}
export default SVGButton;
