import {useEffect, useRef, useState} from "react";
import InputForm from "../../../../../assets/components/form/form";
import updateCache from "../../../../../assets/components/form/util/updateCache";
import "./ConfigureLogging.css";
function ConfigureLogging({selectedCard, setSelectedCard, deviceOptions}) {
	const [configCache, setConfigCache] = useState({});

	useEffect(() => {
		//update the field to update
		if (typeof selectedCard.fieldToUpdate === "undefined") {
			setSelectedCard((prevState) => ({...prevState, fieldToUpdate: "none"}));
		} else {
			updateCache(
				"Field to Update",
				selectedCard.fieldToUpdate,
				configCache,
				setConfigCache
			);
		}
		//Case: no problemOptions but selected information type
		if (typeof selectedCard.problemOptions === "undefined") {
			console.log("no problemOptions");
			if (
				typeof selectedCard.informationType === "undefined" ||
				selectedCard.informationType === ""
			) {
				updateCache("problemOptions", [], configCache, setConfigCache);
				return;
			}
			defaultLoad();
		} else {
			try {
				if (selectedCard.informationType !== selectedCard.configType) {
					defaultLoad();
				} else {
					updateExitingOptions();
				}
			} catch (e) {
				console.log(e);
			}
		}
	}, [selectedCard]);
	function updateExitingOptions() {
		console.log("updateExitingOptions");
		let tempOptions = [...selectedCard.problemOptions];

		if (
			selectedCard.configType === "boolean" ||
			selectedCard.configType === "text"
		) {
			updateCache("problemOptions", tempOptions, configCache, setConfigCache);
		} else {
			if (selectedCard.configType === "options") {
				let updatedOptions = [];
				let stored_possibleValues = [...selectedCard.possibleValues];

				//remove options no longer in the possible values
				for (let i = 0; i < tempOptions.length; i++) {
					let found_index = stored_possibleValues.findIndex(
						(obj) => obj === tempOptions[i].name
					);
					if (found_index !== -1) {
						updatedOptions.push(tempOptions[i]);
						stored_possibleValues.splice(found_index, 1);
					} else {
					}
				}
				//add new values
				for (let i = 0; i < stored_possibleValues.length; i++) {
					updatedOptions.push({
						name: stored_possibleValues[i],
						selected: false,
					});
				}
				if (
					JSON.stringify(selectedCard.problemOptions) !==
					JSON.stringify(updatedOptions)
				) {
					let tempCard = {...selectedCard};
					tempCard.problemOptions = updatedOptions;
					tempCard.configType = selectedCard.informationType;
					setSelectedCard(tempCard);
				}

				updateCache(
					"problemOptions",
					updatedOptions,
					configCache,
					setConfigCache
				);
			}
		}
	}

	//load and set the problem options either setting or overiding the existing problem options
	function defaultLoad() {
		console.log("default options");
		if (selectedCard.informationType === "options") {
			if (
				typeof selectedCard.possibleValues !== "undefined" &&
				Array.isArray(selectedCard.possibleValues)
			) {
				let newOptions = [];
				selectedCard.possibleValues.forEach((value) => {
					newOptions.push({name: value, selected: false});
				});
				let tempCard = {...selectedCard};
				tempCard.problemOptions = newOptions;
				tempCard.configType = selectedCard.informationType;
				setSelectedCard(tempCard);
				updateCache("problemOptions", newOptions, configCache, setConfigCache);
			}
		} else {
			let tempCard = {...selectedCard};
			let newOptions = [];
			if (selectedCard.informationType === "boolean") {
				newOptions = [
					{name: "true", selected: false},
					{name: "false", selected: false},
				];
				tempCard.problemOptions = newOptions;
				tempCard.configType = selectedCard.informationType;
				setSelectedCard(tempCard);
				updateCache("problemOptions", newOptions, configCache, setConfigCache);
			} else {
				if (selectedCard.informationType === "text") {
					newOptions = [{name: "always", selected: false}];
					tempCard.problemOptions = newOptions;
					tempCard.configType = selectedCard.informationType;
					setSelectedCard(tempCard);
					updateCache(
						"problemOptions",
						newOptions,
						configCache,
						setConfigCache
					);
				}
			}
		}
	}
	const [dropdownConfig, setDropdownConfig] = useState({
		inputs: [
			{
				fieldName: "Field to Update",
				type: "dropdown",
				styleClass: {width: "170", height: "20"},
				options: [],
			},
		],
	});
	useEffect(() => {
		let options = [...deviceOptions, "none"];
		setDropdownConfig({
			inputs: [
				{
					fieldName: "Field to Update",
					type: "dropdown",
					styleClass: {width: "170", height: "20"},
					options: options,
				},
			],
		});
	}, [deviceOptions]);
	return (
		<div className="configure-logging light-card">
			<h2>Select any options that should generate a problem.</h2>
			<InputForm
				initialStates={logConfig}
				cachedChanges={configCache}
				setCachedChanges={setConfigCache}
				isEditable={true}
			/>
			<h2>What value should be updated?</h2>
			<InputForm
				initialStates={dropdownConfig}
				cachedChanges={configCache}
				setCachedChanges={setConfigCache}
				isEditable={true}
			/>
		</div>
	);
}
export default ConfigureLogging;
const logConfig = {
	inputs: [
		{
			fieldName: "problemOptions",
			type: "toggleList",
		},
	],
};
