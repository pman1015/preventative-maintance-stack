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
			{
				fieldName: "Displayed Message",
				type: "textarea",
				styleClass: "user-message",
			},
		],
	});
	const step_id = useRef(0);
	useEffect(() => {
		try {
			if (
				typeof selectedStep.stepID === "undefined" ||
				step_id.current === selectedStep.stepID
			)
				return;

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

	useEffect(() => {
		if (
			typeof selectedStep.stepID === "undefined" ||
			step_id.current !== selectedStep.stepID
		)
			return;
		console.log(selectedStep);
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
	}, [editCache]);

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

function objectToCache(cache, object, cacheKey, ObjectKey) {
	try {
		let cache_copy = {...cache};

		let cache_index = cache.values.findIndex((obj) => obj.name === cacheKey);
		let value = object[ObjectKey];
		if (typeof value === "undefined"){
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
const translations = [
	["Step Name", "stepName"],
	["Required", "required"],
	["Information Label", "informationLabel"],
	["Information Type", "informantionType"],
	["Displayed Message", "displayedMessage"],
];
