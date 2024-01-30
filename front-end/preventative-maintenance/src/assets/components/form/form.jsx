import {isEditable} from "@testing-library/user-event/dist/utils";
import {useEffect, useState} from "react";
import ChoiceBox from "./choiceBox/choiceBox";
import "./form.css";
import TextBox from "./textBox/textBox";
import TextChoiceBoxField from "./textChoiceBox/textChoiceBoxField";
import TextField from "./textEdit/textField";
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
	runCheck,
	setRunCheck,
}) {
	//----------------------------------------------------------------
	//This function takes in the name of a field and the value you want to update
	//The function then updates the cache with the new value
	//----------------------------------------------------------------
	function updateCache(name, value) {
		var newCache = [];
		try {
			if (
				typeof cachedChanges === "undefined" ||
				typeof cachedChanges.values === "undefined" ||
				cachedChanges.values.length < 1
			) {
				newCache.push({name: name, value: value});
			} else {
				let newValue = true;
				for (let i = 0; i < cachedChanges.values.length; i++) {
					var param = cachedChanges.values[i];
					if (param.name === name) {
						newValue = false;
						newCache.push({name: param.name, value: value});
					} else {
						newCache.push(param);
					}
				}
				if (newValue) {
					newCache.push({name: name, value: value});
				}
			}

			setCachedChanges({values: newCache});
		} catch (e) {}
	}
	//----------------------------------------------------------------
	//
	//----------------------------------------------------------------
	function ValidateField(criteria, value) {
		const validate = (rule) => {
			switch (rule) {
				case "notNull":
					return value.length > 0;
				default:
					return true;
			}
		};

		let invalid = false;
		if (typeof criteria !== "undefined") {
			criteria.forEach((rule) => {
				invalid = invalid || validate(rule, value);
			});
		}

		return invalid;
	}
	
	//------------------------------------------------------------------
	//This function generates a field by taking in the field name and
	//Type of field to be genrated
	//It then applies the style class
	//------------------------------------------------------------------
	function GenerateField(type, name, styleClass, options, error, message) {
		const fieldType = (type) => {
			switch (type) {
				case "text":
					return (
						<>
							<h2>{name}</h2>
							<TextField
								isEditable={isEditable}
								name={name}
								cachedChanges={cachedChanges}
								updateCache={updateCache}
								setCachedChanges={setCachedChanges}
								styleClass={styleClass}
								error = {error}
								message = {message}
							/>
						</>
					);
				case "textarea":
					return (
						<TextBox
							label={name}
							editable={isEditable}
							styleClass={styleClass}
							cachedChanges={cachedChanges}
							setCachedChanges={setCachedChanges}
							updateCache={updateCache}
							error = {error}
							message = {message}
							
						/>
					);
				case "dropdown":
					return (
						<>
							<h2>{name}</h2>
							<ChoiceBox
								cachedChanges={cachedChanges}
								setCachedChanges={setCachedChanges}
								editable={isEditable}
								name={name}
								options={options}
								error = {error}
							message = {message}
							/>
						</>
					);
				case "textChoiceBox":
					return (
						<>
							<h2>{name}</h2>
							<TextChoiceBoxField
								isEditable={isEditable}
								cachedChages={cachedChanges}
								setCachedChanges={setCachedChanges}
								updateCache={updateCache}
								name={name}
								styleClass={styleClass}
								allOptions={options}
								error = {error}
							message = {message}
							/>
						</>
					);
			}
		};
		return <div className="form-field">{fieldType(type)}</div>;
	}

	//----------------------------------------------------------------
	//This returns a blank div with a list of all of the fields generated
	//by generate function for each field in the initial state
	//------------------------------------------------------------------
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
						item.message
					);
				})}
		</>
	);
}
export default InputForm;
