import {useEffect, useState} from "react";
import TextField from "../textEdit/textField";
//----------------------------------------------------------------
//This function returns a form that is used to display textFields
//and other input types as well as handel toggling between an edit
//and display information
//----------------------------------------------------------------

//----------------------------------------------------------------
//initialStates should be a json object structured as follows
// "inputs":[
//              {"initialValue":"", "type":"text", "styleClass": ""},....
//  ]
// initalValue should store the initial value of the field
// type should select what type of input to display
// styleClass should store what style class you want the input to use
//----------------------------------------------------------------

function InputForm({initialStates}) {
	const [inputs, setInputs] = useState([]);
	useEffect(() => {
		var tempInputs = [];
		initialStates.inputs.forEach((input) => {
			switch (input.type) {
				case "text":
					tempInputs.push(<TextField />);
			}
		});
	}, [initialStates]);
	return <>{inputs.map((input) => ({input}))}</>;
}
