import {useEffect, useState} from "react";

import DesktopContainer from "../../../assets/components/DesktopContainer/DesktopMainContainer";
import DropDown from "../../../assets/components/Dropdown/Dropdown";
import ScrollPane from "../../../assets/components/ScrollPane/ScrollPane";
import {getProgramList} from "../../../util/equipmentQueries";
import EquipmentControlMenu from "../components/EquipmentControlMenu";
import * as svgs from "../components/equipmentSVGs";
import ProgramDetails from "./components/programdetails";
import "./equipmentPrograms.css";

//----------------------------------------------------------------
//Fucntion to return the program page
//----------------------------------------------------------------
function EquipmentProgramsPage() {
	return <DesktopContainer content={LoadProgramPage()} />;
}
export default EquipmentProgramsPage;

//----------------------------------------------------------------
//Load the programs from a datase query
// This function loads from a query and then stores the list of results in
// the program list
// The loaded program is the currentl selected program from the program list
//----------------------------------------------------------------
function LoadProgramPage() {
	const [loadedProgram, setLoadedProgram] = useState("");
	const [programs, setPrograms] = useState([]);

	//----------------------------------------------------------------
	//On initial load run the getProgramList function to run the database query
	//----------------------------------------------------------------
	useEffect(() => {
		var query_result = getProgramList();
		if (query_result.status === 200) {
			setPrograms(query_result.programs);
		}
	}, []);
	
	useEffect(() => {
		console.log(loadedProgram);
		if (loadedProgram !== "") {
		} else {
			console.log("null");
		}
	}, [loadedProgram, setLoadedProgram]);

	return (
		<>
			<div className="equipment_page_header">
				<EquipmentControlMenu />
				<div className="equipment_page_label">
					{svgs.equipmentHeader()}
					<h1>Programs</h1>
				</div>
			</div>
			<ProgramsList
				setLoadedProgram={setLoadedProgram}
				programsToLoad= {programs}
			/>
			{loadedProgram !== "" ? <ProgramDetails name={loadedProgram} /> : <></>}
		</>
	);
}

//----------------------------------------------------------------
//This function manages the stored programs as a scrollable list
//Once a program is selected it sets the loaded program to the name
//of the program selected
//The cards state stores the card that wil be loaded in the scroll pane
//
//Inputs: setLoadedProgram -> a useState to set the loaded program in parent component
//        programsToLoad -> the response from the database query
//----------------------------------------------------------------

function ProgramsList({setLoadedProgram ,programsToLoad}) {
	const programs = ["standard", "test", "next", "first"];

	const [cards, setCards] = useState([]);

	useEffect(() => {
		console.log(programsToLoad);
		let cardsToAdd = [];
		programsToLoad.forEach((returned) => {
			cardsToAdd = [
				...cardsToAdd,
				<ProgramListCard
					name={returned.name}
					addedDate={returned.addedDate}
					setLoadedProgram={setLoadedProgram}
				/>,
			];
		});
		console.log(cardsToAdd);
		setCards(cardsToAdd);
	}, [programsToLoad]);
	return (
		<div className="programs_list_container">
			<div className="programs_list_header">
				<h1 className="lightDesktopSubHeading">Current Programs</h1>
				<button
					onClick={() => {
						setLoadedProgram({});
					}}>
					{svgs.squareAdd()}
				</button>
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

function ProgramListCard({name, addedDate, setLoadedProgram}) {
	return (
		<div
			className="program_list_scroll_card"
			onClick={() => {
				setLoadedProgram(name);
			}}>
			<h1>{name}</h1>
			<h1>{addedDate}</h1>
		</div>
	);
}
