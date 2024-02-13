import {useEffect, useState} from "react";
//import toggleOption from "./ToggleOption";

/**
 * This function returns the OptionCard Compnent
 * it is used to select an option and add it to the selectd options cache
 * in the parent component.
 * @date 2/1/2024 - 3:06:17 PM
 *
 * @param {{ name: any; type: any; cache: any; setCache: any; }} param0
 * @param {string} param0.name - the name of the option
 * @param {string} param0.type - the type of information to be stored for the option
 * @param {Object} param0.cache - a useState storeing the cache from the parent as an Object
 * @param {function(Object) : void} param0.setCache - the function to set the cache
 * @returns {JSX.Element.OptionCard} - a component to display and select options
 */
function OptionCard({name, type, toggleOption, optionsCache}) {
	//Internal refrence for the state of the toggle
	const [toggleState, setToggleState] = useState(false);

	//Whenever the toggle state changes call the toggleOption function to update the data
	//Stored in the cache

	function updateToggle() {
		setToggleState(!toggleState);
		toggleOption(name, !toggleState, type);
	}

	useEffect(() => {
        if(typeof optionsCache.values === "undefined") return;
		let index = optionsCache.values.findIndex((option) => option.name === name);
		if (index !== -1) {
            let state = optionsCache.values[index].value
			setToggleState(state);
		} else {
			setToggleState(false);
		}
	}, []);

	return (
		<div className="OptionCard inline_content">
			<h1 className="lightText">{name}</h1>
			<button
				className={`toggleOption ${toggleState ? "active" : ""}`}
				onClick={() => {
					updateToggle();
				}}
			/>
		</div>
	);
}
export default OptionCard;
