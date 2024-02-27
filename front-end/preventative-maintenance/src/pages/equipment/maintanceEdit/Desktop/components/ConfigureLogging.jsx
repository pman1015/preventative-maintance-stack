import {useEffect, useRef, useState} from "react";
import InputForm from "../../../../../assets/components/form/form";
import updateCache from "../../../../../assets/components/form/util/updateCache";
import "./ConfigureLogging.css";
function ConfugureLogging({selectedCard, setSelectedCard}) {
	const [logsCache, setLogsCache] = useState({});
	const [updateFieldConfig, setUpdateFieldConfig] = useState({});

	const current_card_id = useRef(-1);
	const current_information_type = useRef("");

	//On update to the selected card get the states for fields
	useEffect(() => {
		try {
			if (
				typeof selectedCard.informationType !== "undefined" &&
				selectedCard.informationType !== ""
			) {
				problemOptions(selectedCard.stepID, selectedCard.informationType);
			}
			current_card_id.current = selectedCard.stepID;
			current_information_type.current = selectedCard.informationType;
		} catch (e) {}
	}, [selectedCard]);
	function problemOptions(new_id, new_type) {
		//If new card load from card
		if (new_id !== current_card_id.current) {
			if (typeof selectedCard.problemOptions !== "undefined") {
				updateCache("problemOptions", selectedCard, logsCache, setLogsCache);
				return;
			}
			loadDefaultOptions(new_type);
			return;
		} else {
			if (current_information_type.current !== new_type) {
				loadDefaultOptions(new_type);
				return;
			}
			if (new_type === "options") {
			}
		}
	}
	function loadDefaultOptions(type) {
		switch (type) {
			case "boolean":
				updateCache(
					"problemOptions",
					[
						{name: "true", selected: false},
						{name: "false", selected: false},
					],
					logsCache,
					setLogsCache
				);
				return;
			case "text":
				return;
			case "options":
				try {
					let options = selectedCard.possibleValues;
					if (typeof options !== "undefined" && options.length > 0) {
						for (let i = 0; i < options.length; i++) {
							let temp = {name: options[i], selected: false};
							options.splice(i, 1, temp);
						}
						updateCache("problemOptions", options, logsCache, setLogsCache);
					}
				} catch (e) {}
				return;
		}
	}

	useEffect(() => {
		try {
			let tempCache = {...selectedCard};
			for (let i = 0; i < logsCache.values.length; i++) {
				tempCache[logsCache.values[i].name] = logsCache.values[i].value;
			}
			setSelectedCard(tempCache);
		} catch (e) {
			console.error(e);
		}
	}, [logsCache]);
	return (
		<div className="configure-logging light-card">
			<InputForm
				initialStates={problemToggle}
				cachedChanges={logsCache}
				setCachedChanges={setLogsCache}
				isEditable={true}
			/>
			<InputForm
				initialStates={addOptionsConfig}
				cachedChanges={logsCache}
				setCachedChanges={setLogsCache}
				isEditable={true}
			/>
			<InputForm
				initialStates={updateInfo}
				cachedChanges={logsCache}
				setCachedChanges={setLogsCache}
				isEditable={true}
			/>
			<InputForm
				initialStates={updateFieldConfig}
				cachedChanges={logsCache}
				setCachedChanges={setLogsCache}
				isEditable={true}
			/>
		</div>
	);
}
export default ConfugureLogging;

const problemToggle = {
	inputs: [
		{
			fieldName: "Should ths step generate a problem?",
			type: "boolean",
		},
	],
};
const updateInfo = {
	inputs: [
		{
			fieldName: "Should this information update a device field?",
			type: "boolean",
		},
	],
};
const addOptionsConfig = {
	inputs: [
		{
			fieldName: "problemOptions",
			type: "toggleList",
		},
	],
};
