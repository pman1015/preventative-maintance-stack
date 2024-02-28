import {useEffect, useRef, useState} from "react";
import InputForm from "../../../../../assets/components/form/form";
import "./StepEdit.css";

function StepEdit({selectedStep, setSelectedStep}) {
	const [editCache, setEditCache] = useState({});
	const [editConfig, setEditConfig] = useState({
		inputs: [
			{
				fieldName: "Step Name",
				type: "text",
			},
			{
				fieldName: "Required",
				type: "boolean",
			},
			{
				fieldName: "Information Label",
				type: "text",
			},
			{
				fieldName: "Information Type",
				type: "dropdown",
				styleClass: {width: "150", height: "20"},
				options: ["boolean", "text", "options"],
			},
			{},
			{
				fieldName: "Displayed Message",
				type: "textarea",
				styleClass: "user-message",
			},
		],
	});
	//When the selectedStep changes update the editCache with the new values from the selected step
	const step_id = useRef(0);

	useEffect(() => {
		try {
			if (
				typeof selectedStep.stepID === "undefined" ||
				step_id.current === selectedStep.stepID
			) {
				return;
			}

			console.log(selectedStep);
			let tempCache = {...editCache};
			translations.forEach((translation) => {
				tempCache = objectToCache(
					tempCache,
					selectedStep,
					translation[0],
					translation[1]
				);
			});
			setEditCache(tempCache);
			step_id.current = selectedStep.stepID;
		} catch (e) {
			console.log(e);
		}
	}, [selectedStep]);

	//When the editCache is updated update the selectedStep with the new values
	useEffect(() => {
		//Exit early if the selected step is undefined or if the selected step is changing - prevents runs mid update of the selected step
		if (
			typeof selectedStep.stepID === "undefined" ||
			step_id.current !== selectedStep.stepID
		) {
			return;
		}
		update_selected_step();
		let tempConfig = [...editConfig.inputs];
		tempConfig.splice(4, 1, updateTypeConfig(editCache));
		setEditConfig({inputs: tempConfig});
	}, [editCache]);

	//Arrow function to update the selected_step
	const update_selected_step = () => {
		let tempStep = {...selectedStep};
		translations.forEach((translation) => {
			tempStep = cacheToObject(
				editCache,
				translation[0],
				tempStep,
				translation[1]
			);
		});
		setSelectedStep(tempStep);
	};

	return (
		<div className="step-edit light-card">
			<InputForm
				isEditable={true}
				initialStates={editConfig}
				cachedChanges={editCache}
				setCachedChanges={setEditCache}
			/>
		</div>
	);
}
export default StepEdit;

function updateTypeConfig(cache) {
	try {
		const type_key = "Information Type";
		const type_index = cache.values.findIndex((obj) => obj.name === type_key);
		if (type_index === -1) {
			return {};
		}
		const type = cache.values[type_index].value;
		switch (type) {
			case "options":
				return {
					fieldName: "Options",
					type: "textList",
				};
			default:
				return {};
		}
	} catch (e) {
		return {};
	}
}

/**
 * This function applies translations from a cached object to a form cache.
 * -It returns a copy of cache updated with the new values
 * @date 2/22/2024 - 1:18:09 PM
 *
 * @param {Object} cache - InputForm cache to be updated
 * @param {Object} object - the object with the values to be set in the cache
 * @param {String} cacheKey - the name of the value in the cache
 * @param {String} ObjectKey - the key of the value in the Object
 * @returns {Object} - a copy of the cache with updated values **Note** - you still need to set the retrun of this functuion to the cache to update the cache useState
 */
function objectToCache(cache, object, cacheKey, ObjectKey) {
	try {
		let cache_copy = {...cache};

		let cache_index = cache.values.findIndex((obj) => obj.name === cacheKey);
		let value = object[ObjectKey];
		if (typeof value === "undefined") {
			value = "";
		}
		if (cache_index === -1) {
			cache_copy.values.push({name: cacheKey, value: value});

			return cache_copy;
		}

		cache_copy.values[cache_index].value = value;
		return cache_copy;
	} catch (e) {}
}

/**
 * This function applies translations from a form cache to an object.
 * - this function takes in an InputForm cahce and object along with the translation keys and returns a copy of the Object with its values from the cache set to their respective keys on the object.
 * @date 2/22/2024 - 1:22:05 PM
 *
 * @param {Object} cache - useState cache from an InputForm
 * @param {String} cacheKey - name of the value in the cache
 * @param {Object} object - the object to be updated
 * @param {String} ObjectKey - name of the key to be set in the object
 * @returns {Object} A copy of the object with the updated values from the cache set to their respective keys on the object
 *
 */
function cacheToObject(cache, cacheKey, object, ObjectKey) {
	try {
		let cache_index = cache.values.findIndex((obj) => obj.name === cacheKey);
		if (cache_index === -1) return object;
		let cached_value = cache.values[cache_index].value;

		let temp_object = {...object};
		temp_object[ObjectKey] = cached_value;
		return temp_object;
	} catch (e) {}
}

//Translations for the form cache to the Object **Note: Stored as ["Cache name" , "Object Key"] **
const translations = [
	["Step Name", "stepName"],
	["Required", "required"],
	["Information Label", "informationLabel"],
	["Information Type", "informationType"],
	["Displayed Message", "displayedMessage"],
	["Options", "possibleValues"],
];
