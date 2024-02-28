import {useEffect, useState} from "react";
import PMProgressBar from "../../../../../assets/components/PM ProgressBar/PMProgress";
import InputForm from "../../../../../assets/components/form/form";
import "./Preview.css";
function Preview({selectedStep, deviceType, steps_count}) {
	function convertCamelCaseToNormalString(str) {
		return str
			.replace(/([a-z])([A-Z])/g, "$1 $2")
			.replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
			.toLowerCase()
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");
	}
	const [previewConfig, setPreviewConfig] = useState({});
	const [previewCache, setPreviewCache] = useState({});
	useEffect(() => {
		let type = "";
		switch (selectedStep.informationType) {
			case "option":
				type = "dropdown";
				break;
			default:
				type = selectedStep.informationType;
				break;
		}
		setPreviewConfig({
			inputs: [
				{
					fieldName: selectedStep.informationLabel,
					type: type,
					options: selectedStep.possibleValues,
					styleClass: {width: "140", height: "20"},
				},
			],
		});
	}, [selectedStep]);
	return (
		<div className="mobile-preview-container">
			<h1>{convertCamelCaseToNormalString(deviceType)} Maintance</h1>
			<PMProgressBar
				size={steps_count}
				index={selectedStep.index}
				label={`step ${selectedStep.index}`}
			/>
			<h1 className="preview-bold">Instructions:</h1>
			<h2 className="preview-normal">{selectedStep.displayedMessage}</h2>
			<h1 className="preview-bold"> Please Record: </h1>
			<InputForm
				isEditable={true}
				initialStates={previewConfig}
				cachedChanges={previewCache}
				setCachedChanges={setPreviewCache}
			/>
		</div>
	);
}
export default Preview;
