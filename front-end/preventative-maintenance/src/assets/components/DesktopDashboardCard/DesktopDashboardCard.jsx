import {useEffect, useState} from "react";
import updateEquipmentStats from "../../../util/loadEquipmentStats";
import DropDown from "../Dropdown/Dropdown";
import DesktopProgressBar from "./../progressBar/DesktopProgressBar";
import "./DashboardCard.css";

function DesktopDashboardCard(props) {
	const cardStyle = {
		width: `${props.width}`,
		height: `${props.height}`,
	};

	const selectCard = (type, props) => {
		var card;
		switch (type) {
			case "currentAssignment":
				card = CurrentAssignmentCard(props.assignment);
				break;
			case "warnings":
				console.log(props.warnings);
				card = WarningsCard(props.warnings);
				break;
			case "equipmentStats":
				card = EquipmentStatsCard(props.equipmentStats);
				break;
			default:
				card = <></>;
				break;
		}
		return card;
	};

	return (
		<div className="DesktopCard" style={cardStyle}>
			{selectCard(props.type, props)}
		</div>
	);
}
export default DesktopDashboardCard;

const CurrentAssignmentCard = (props) => {
	return (
		<>
			<h2 className="lightDesktopSubHeading"> Current Assignment</h2>
			<h1 className="darkDesktopHeading">{props.assignmentName}</h1>
			<p className="darkDesktopMediumText">{props.assignmentDescription}</p>
			<DesktopProgressBar props={props} />
			<button className="desktopTextButton">
				<p>Go to Assignment</p>
			</button>
		</>
	);
};
const WarningsCard = (props) => {
	const [warnings, setWarnings] = useState([]);

	const loadWarnings = () => {
		var newWarnings = [];
		props.warnings.forEach((warning) => {
			newWarnings = [...newWarnings, WarningItem(warning)];
		});
		setWarnings(newWarnings);
	};
	useEffect(() => loadWarnings(), [props]);
	return (
		<>
			<h1 className="darkDesktopHeading" style={{margin: "6px"}}>
				Warnings
			</h1>
			<div className="scrollPane">
				<ul>
					{warnings.map((warning) => (
						<li>{warning}</li>
					))}
				</ul>
			</div>
		</>
	);
};
const WarningItem = (props) => {
	return (
		<div className="warningCard">
			<h1 className="lightDesktopSubHeading">
				{props.buildingName} {props.roomNumber}
			</h1>
			<h3 className="darkDesktopMediumText">{props.warningMessage}</h3>
		</div>
	);
};
const EquipmentStatsCard = (props) => {
	const [itemNames, setItemNames] = useState([]);
	const [itemBars, setItemBars] = useState([]);
	const [equipmentStats, setEquipmentStats] = useState([]);

	useEffect(() => {
		try {
			var newItemNames = [];
			var newItemBars = [];
			const maxValue = equipmentStats.maxValue;
			equipmentStats.equipment.forEach((equipment) => {
				const percentFill = (equipment.count / maxValue) * 100;
				newItemNames = [...newItemNames, equipment.name];
				newItemBars = [
					...newItemBars,
					<li style={{width: `${percentFill}%`}}>{equipment.count}</li>,
				];
			});
			setItemNames(newItemNames);
			setItemBars(newItemBars);
		} catch (e) {
			console.log(e);
		}
	}, [equipmentStats]);

	const updateSelect = (selectedValue) => {
		const response = updateEquipmentStats(selectedValue);
		try {
			setEquipmentStats(response);
		} catch (e) {
			console.log(e);
		}
		console.log(response);
	};
	return (
		<div className="equipmentCard">
			<h1 className="lightDesktopSubHeading"> Equipment in the field </h1>
			<DropDown options={props.options} onSelect={updateSelect} />
			<div className="statCard">
				<h1 className="lightDesktopSubHeading">Model</h1>
				<div className="statList">
					<div className="itemNameList">
						<ul>
							{itemNames.map((item) => (
								<li>{item}</li>
							))}
						</ul>
					</div>
					<div className="itemGraph">
						<ul>{itemBars.map((item) => item)}</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
