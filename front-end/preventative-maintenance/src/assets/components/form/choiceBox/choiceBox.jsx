import {useEffect, useState} from "react";
import DropDown from "../../Dropdown/Dropdown";

function ChoiceBox({cachedChanges, setCachedChanges, editable, name, options}) {
	const [selectedValue, setSelectedValue] = useState("");
	useEffect(() => {
		if (typeof cachedChanges.values !== "undefined") {
			let tempCache = [];
			for (let i = 0; i < cachedChanges.values.length; i++) {
				let item = cachedChanges.values[i];
				if (item.name === name) {
					item.value = selectedValue;
				}
				tempCache.push(item);
			}
			setCachedChanges({values: tempCache});
		}
	}, [selectedValue, setSelectedValue]);

	return (
		<div className="choicebox_field" style={{width: "80%"}}>
			{editable ? (
				<DropDown
					width={200}
					height={24}
					options={options}
					selected={selectedValue}
					onSelect={setSelectedValue}
				/>
			) : (
				<h2>{selectedValue}</h2>
			)}
		</div>
	);
}

export default ChoiceBox;
