import {useEffect, useState} from "react";
import "./ScrollPaneV2.css";

function ScrollPaneV2({cards, style, header}) {
	const [parsedStyles, setParsedStyles] = useState({});
	const [partentStyleClass, setParentStyleClass] = useState("");

	useEffect(() => {
		if (typeof style !== "undefined" && Object.keys(style).length > 0) {
			let keySet = Object.keys(style);
			let tempStyle = {};
			for (let i = 0; i < keySet.length; i++) {
				let key = keySet[i];
				if (key === "styleClass") {
					setParentStyleClass(style[key]);
				} else {
					tempStyle[key] = style[key];
				}
			}
			setParsedStyles(tempStyle);
		}
	}, [style]);

	return (
		<div className="scrollable_outer_container">
			{typeof header !== "undefined" && header}
			<div
				className={`scrollable_container ${partentStyleClass}`}
				style={parsedStyles}>
				{cards.map((card) => card)}
			</div>
		</div>
	);
}
export default ScrollPaneV2;
