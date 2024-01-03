import React, {useEffect, useState} from "react";
import "./ProgressBar.css";

function DesktopProgressBar(props) {
	return (
		<div className="DesktopProgressBar">
			<h3 className="DesktopProgressBarLabel">
				{props.props.building} : {props.props.room}
			</h3>
			<progress value={props.props.progress} max={100} />
		</div>
	);
}

export default DesktopProgressBar;
