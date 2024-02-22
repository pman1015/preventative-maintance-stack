import React, {useEffect, useState} from "react";
import InputForm from "../../../../../../assets/components/form/form";

const FieldForm = ({cache, setCache}) => {
	const [selectedType, setSelectedType] = useState("");
	const [formCache, setFormCache] = useState({});
	const [formConfig, setFormConfig] = useState(null);

	useEffect(() => {
		if (typeof cache !== "undefined" && typeof cache.values !== "undefined") {
			setSelectedType(cache.values.type);
			if (typeof cache.values.formCache !== "undefined") {
				setFormCache(cache.values.formCache);
			} else {
				setFormCache({});
			}
		}
	}, [cache]);

	useEffect(() => {
		if (typeof cache !== "undefined" && typeof cache.values !== "undefined") {
			setSelectedType(cache.values.type);
			if (typeof cache.values.formCache !== "undefined") {
				setFormCache(cache.values.formCache);
			} else {
				setFormCache({});
			}
		}
	}, [cache]);

	useEffect(() => {
		try {
			setCache((prevCache) => ({
				...prevCache,
				values: {
					...prevCache.values,
					formCache: formCache,
				},
			}));
		} catch (e) {
			console.log(e);
		}
	}, [formCache]);

	useEffect(() => {
		switch (selectedType) {
			case "options":
				setFormConfig(defaultDropdownConfig);
				break;
			case "text":
				setFormConfig(defaultTextFieldConfig);
				break;
			case "boolean":
				setFormConfig(defaultBoolean);
				break;
			default:
				break;
		}
	}, [selectedType]);

	return (
		<div>
			<h1>Options:</h1>
			{formConfig !== null && (
				<InputForm
					initialStates={formConfig}
					cachedChanges={formCache}
					setCachedChanges={setFormCache}
					isEditable={true}
				/>
			)}
		</div>
	);
};

export default FieldForm;

const defaultDropdownConfig = {
	inputs: [
		{
			fieldName: "Possible Values",
			type: "textList",
			styleClass: {minHeight: "150px", maxHeight: "150px"},
		},
	],
};
const defaultTextFieldConfig = {
	inputs: [{fieldName: "default value", type: "text"}],
};
const defaultBoolean = {
	inputs: [
		{fieldName: "default value", type: "boolean"},
		{fieldName: "default label", type: "text"},
	],
};
