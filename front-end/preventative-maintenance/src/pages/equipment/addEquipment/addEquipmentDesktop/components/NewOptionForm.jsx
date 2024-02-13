import {useEffect, useState} from "react";
import InputForm from "../../../../../assets/components/form/form";
import * as svgs from "../../../components/equipmentSVGs";
/**
 * Returns a component that allows the user to create a new option for a device type
 * @date 2/1/2024 - 2:03:47 PM
 *
 * @param {{ setShowNewOption: any; optionValues: any; setOptionValues: any; }} param0
 * @param {boolean} param0.setShowNewOption
 * @param {string[]} param0.optionValues
 * @param {React.Dispatch<React.SetStateAction<string[]>>} param0.setOptionValues
 * @returns {JSX.Element}
 */
function NewOptionForm({setShowNewOption, optionValues, setOptionValues}) {
	const [newOptionCache, setNewOptionsCache] = useState({});
	const initialStates = {
		inputs: [
			{
				fieldName: "Option Name",
				type: "text",
			},
			{
				fieldName: "Option Type",
				type: "dropdown",
				styleClass: {height: 24, width: 180},
				options: ["text", "dropdown", "boolean"],
			},
			{fieldName: "Single Use", type: "boolean"},
		],
	};

	/**
	 * Function to update the options useState based on what is cached
	 * @date 2/1/2024 - 2:11:11 PM
	 */
	function updateOptions() {
		if (
			typeof newOptionCache === "undefined" ||
			newOptionCache.values.length < 3
		) {
			console.log(newOptionCache);
			return;
		}

		var tempOption = {};
		var addToPermenant = false;
		newOptionCache.values.forEach((value) => {
			switch (value.name) {
				case "Option Name":
					tempOption.name = value.value;
					break;
				case "Option Type":
					tempOption.type = value.value;
					break;
				case "One off option":
					addToPermenant = value.value;
					break;
			}
		});
		tempOption.state = true;
		setOptionValues([...optionValues, tempOption]);
		console.log("Added new option: ", tempOption);
		setShowNewOption(false);
	}

	return (
		<div className="NewOptionForm card">
			<div className="inline_content">
				<h1 className="lightText">New Option Form</h1>
				<button
					className="exit_button"
					onClick={() => {
						setShowNewOption(false);
					}}>
					{svgs.circleXSVG()}
				</button>
			</div>
			<InputForm
				initialStates={initialStates}
				isEditable={true}
				cachedChanges={newOptionCache}
				setCachedChanges={setNewOptionsCache}
			/>
			<button
				className="save_equipment"
				onClick={() => {
					updateOptions();
				}}
				style={{marginLeft: "auto", marginRight: "auto", marginTop: "12px"}}>
				<h1
					style={{
						fontSize: "24px",
						color: " #FFF",
						fontStyle: "normal",
						fontWeight: "400",
					}}>
					Add
				</h1>
			</button>
		</div>
	);
}
export default NewOptionForm;
