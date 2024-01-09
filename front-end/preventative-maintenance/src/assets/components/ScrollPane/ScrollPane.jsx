import React, {useEffect, useState} from "react";
import "./ScrollPane.css";

function ScrollPane(props) {
	const [containerStyle, setContainerStyle] = useState({});
	useEffect(() => {
		try {
			setContainerStyle({
				width: props.width + "px",
				height: props.height + "px",
			});
		} catch (e) {
			console.log(e);
		}
	}, [props]);
	return (
		<div style={containerStyle} className="scroll_pane_container">
			<div className="header">{props.header}</div>

			<div className="scroll_pane_scroll">
				{props.cards.map((card) => card)}
			</div>
		</div>
	);
}
export default ScrollPane;
