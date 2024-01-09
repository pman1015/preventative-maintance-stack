import {useEffect, useState} from "react";

import DesktopContainer from "../../../assets/components/DesktopContainer/DesktopMainContainer";
import DropDown from "../../../assets/components/Dropdown/Dropdown";
import ScrollPane from "../../../assets/components/ScrollPane/ScrollPane";
import EquipmentControlMenu from "../components/EquipmentControlMenu";
import * as svgs from "../components/equipmentSVGs";
import "./equipmentPrograms.css";
function EquipmentProgramsPage() {
	return <DesktopContainer content={loadProgramPage()} />;
}

export default EquipmentProgramsPage;

function loadProgramPage() {
	return (
		<>
			<div className="equipment_page_header">
				{EquipmentControlMenu()}
				<div className="equipment_page_label">
					{svgs.equipmentHeader()}
					<h1>Programs</h1>
				</div>
			</div>
			{ProgramsList()}
		</>
	);
}
function ProgramsList() {
	const programs = ["standard", "test", "next", "first"];

	const [cards, setCards] = useState([]);

	useEffect(() => {
		let cardsToAdd = [];
		query_result.forEach((returned) => {
			cardsToAdd = [
				...cardsToAdd,
				ProgramListCard(returned.name, returned.addedDate),
			];
		});
		console.log(cardsToAdd);
		setCards(cardsToAdd);
	}, []);
	return (
		<div className="programs_list_container">
			<div className="programs_list_header">
				<h1 className="lightDesktopSubHeading">Current Programs</h1>
				<button>{svgs.squareAdd()}</button>
			</div>
			<div className="programs_list_processor_select">
				<h1 className="darkDesktopSubHeading"> Processor </h1>
				<DropDown width="196" height="28" options={programs} />
			</div>
			<ScrollPane
				width="370"
				height="285"
				cards={cards}
				header={programListHeader}
			/>
		</div>
	);
}
const programListHeader = (
	<div className="program_list_scroll_header">
		<h1>Name</h1>
		<h1>Added</h1>
	</div>
);

function ProgramListCard(name, addedDate) {
	return (
		<div className="program_list_scroll_card">
			<h1>{name}</h1>
			<h1>{addedDate}</h1>
		</div>
	);
}
const query_result = [
	{name: "standard", addedDate: "11-30-2010"},
	{name: "standard", addedDate: "11-30-2010"},
	{name: "standard", addedDate: "11-30-2010"},
	{name: "standard", addedDate: "11-30-2010"},
	{name: "standard", addedDate: "11-30-2010"},
	{name: "standard", addedDate: "11-30-2010"},
	{name: "standard", addedDate: "11-30-2010"},
	{name: "standard", addedDate: "11-30-2010"},
	{name: "standard", addedDate: "11-30-2010"},
	{name: "standard", addedDate: "11-30-2010"},
];
