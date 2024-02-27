import {useEffect, useState} from "react";
import "./PMProgress.css";
function PMProgressBar({size, index, label, style}) {
	const defaultStyle = {height:"24px"};
	const [innerStyle, setInnerStyle] = useState({width: "20%"});
	useEffect(() => {
		setInnerStyle({width: `${(index / size) * 100}%`});
	}, [index]);
	return (
		<div
			className="bar"
			style={typeof style === "undefined" ? defaultStyle : style}>
			<h2 className="bar-label">{label}:</h2>
			<div className="progress_bar">
				<div className="progress_bar_fill" style={innerStyle} />
			</div>
		</div>
	);
}
export default PMProgressBar;
