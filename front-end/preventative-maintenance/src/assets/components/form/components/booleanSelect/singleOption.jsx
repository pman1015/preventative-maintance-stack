import {useEffect, useState} from "react";
import updateCache from "../../util/updateCache";
import "./singleOption.css";

/**
 * A Single Option Input for an InputForm that allows the state of the option to be toggled
 * between true and false.
 *
 * @date 2/2/2024 - 11:02:45 AM
 *
 * @param {{ isEditable: boolean; cachedChanges: Object; setCachedChanges: React.Dispatch<React.SetStateAction<Object>>; name: string; styleClass: string }} param0
 * @param {boolean} param0.isEditable - boolean indicating if the option should be edited
 * @param {Object} param0.cachedChanges - Object containing cached changes
 * @param {function(Object)} param0.setCachedChanges - Function to update the cached changes
 * @param {string} param0.name - string name of the option
 * @param {string} param0.styleClass - string of style class to be applied
 * @returns {JSX.Element.SingleOption}
 */
function SingleOption({
	isEditable,
	cachedChages,
	setCachedChanges,
	name,
	styleClass,
}) {
	const [selected, setSelected] = useState(false);

	useEffect(() => {
		updateCache(name, selected, cachedChages, setCachedChanges);
	}, [selected]);

	return (
		<div className={` singleOption_field + ${styleClass} `}>
			<h2>{name}</h2>
			<button
				className={`singleOptionButton  + ${selected ? "active" : ""}`}
				onClick={() => {
					if (isEditable) setSelected(!selected);
				}}
			/>
		</div>
	);
}
export default SingleOption;
