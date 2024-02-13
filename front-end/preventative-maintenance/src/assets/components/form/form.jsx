import React from "react";
import "./form.css";
import GenerateField from "./util/GenerateFields";

/**
 * This is a configrable form component that takes in an initial structure and a cache and allows
 * information to be filled out updated and retrieved
 * @date 2/2/2024 - 10:50:06 AM
 *
 * @param {{ initialStates: Object; isEditable: boolean; cachedChanges: Object; setCachedChanges: React.Dispatch<React.SetStateAction<Object>> }} param0
 * @param {Object} param0.initialStates - the initial State of the form as an object structured as follows
 * {
 * 	inputs:
 * 		[
 * 			{
 * 				fieldName: "name of field",
 * 				type:"type of input",
 * 				styleClass:"any css class to be applied"
 * 				options: ["a list of options if the field is a dropdown"],
 * 				error:"boolean  for if the field has an errror",
 *              message: "an error message to be displayed below the input"
 * 			},]
 * }
 * @param {boolean} param0.isEditable - useState(boolean) to toggle the fields edit state
 * @param {Object} param0.cachedChanges - an object to store the cached changes stored as a list of "values" as objects like {name:"fieldName", value:"the current value"}
 * @param {function(Object)} param0.setCachedChanges - setFunction for the cache
 * @returns {JSX.Element.InputForm} - a configurable form that updates its information in the form of a cache
 */
function InputForm({
	initialStates,
	isEditable,
	cachedChanges,
	setCachedChanges,
})
 {
	
	return (
		<>
			{typeof initialStates.inputs !== "undefined" &&
				initialStates.inputs.map((item) => {
					return GenerateField(
						item.type,
						item.fieldName,
						item.styleClass,
						item.options,
						item.error,
						item.message,
						isEditable,
						setCachedChanges,
						cachedChanges
					);
				})}
		</>
	);
}
export default InputForm;
