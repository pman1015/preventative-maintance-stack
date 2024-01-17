import {isEditable} from "@testing-library/user-event/dist/utils";
import {useEffect, useState} from "react";
import TextField from "../textEdit/textField";
import "./form.css";
//----------------------------------------------------------------
//This function returns a form that is used to display textFields
//and other input types as well as handel toggling between an edit
//and display information
//----------------------------------------------------------------

//----------------------------------------------------------------
//initialStates should be a json object structured as follows
// "inputs":[
//              {"fieldName":", "initialValue":"", "type":"text", "styleClass": ""},....
//  ]
// initalValue should store the initial value of the field
// type should select what type of input to display
// styleClass should store what style class you want the input to use
//----------------------------------------------------------------

function InputForm({
	initialStates,
	isEditable,
	cachedChanges,
	setCachedChanges,
}) {
	function updateCache(name, value) {
		var newCache = [];

		try {
			for (let i = 0; i < cachedChanges.values.length; i++) {
				var param = cachedChanges.values[i];
				if (param.name === name) {
					newCache.push({name: param.name, value: value});
				} else {
					newCache.push(param);
				}
			}

			setCachedChanges({values: newCache});
		} catch (e) {}
	}

	function GenerateField(type, name, styleClass) {
		return (
			<div className="form-field">
				<h2>{name}</h2>
				<TextField
					isEditable={isEditable}
					name={name}
					cachedChanges={cachedChanges}
					updateCache={updateCache}
					setCachedChanges={setCachedChanges}
					styleClass={styleClass}
				/>
			</div>
		);
	}
	
	useEffect(() => {
		console.log("enable edit: " + isEditable);
	}, [isEditable]);

	return (
		<>
			{typeof initialStates.inputs !== "undefined" &&
				initialStates.inputs.map((item) => {
					
					return GenerateField(item.type, item.fieldName, item.styleClass);
				})}
		</>
	);
}
export default InputForm;
