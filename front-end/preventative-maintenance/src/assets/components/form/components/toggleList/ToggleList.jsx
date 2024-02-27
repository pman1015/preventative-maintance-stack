import { useEffect, useRef, useState } from "react";
import ScrollPaneV2 from "../../../ScrollPanev2/ScrollPaneV2";
import SVGButton from "../../../svgButton/svgButton";
import updateCache from "../../util/updateCache";
import "./ToggleList.css";
function ToggleList({
	isEditable,
	cachedChanges,
	setCachedChanges,
	name,
	styleClass,
}) {
	const selected_index = useRef(-1);
	const [style, setStyle] = useState({
		minHeight: "30px",
		maxHeight: "50px",
	});

	function updateSelected() {
        if(selected_index < 0 || selected_index.current >= options.length) return;
        let tempOptions = [...options];
        let tempOption = options[selected_index.current];
        if(typeof tempOption !== "undefined"){
            tempOption.selected = !tempOption.selected;
        }else tempOption.selected = true;
        tempOptions.splice(selected_index.current, 1,tempOption);
        updateCache(name,tempOptions,cachedChanges,setCachedChanges);
    }
	const [options, setOptions] = useState([{name : "works" , selected : false}]);
	
	
	useEffect(() => {
		let cached_index = -2;
		try {
			if (typeof cachedChanges.values !== "undefined") {
				cached_index = cachedChanges.values.findIndex(
					(obj) => obj.name === name
				);
			}
		} catch (e) {}
		switch (cached_index) {
			//No Cache has been initialized
			case -2:
				setCachedChanges({values: []});
				return;
			// Cache exists but has no value for the selected field
			case -1:
				let tempCache = [...cachedChanges.values];
				tempCache.push({name: name, value: options});
				setCachedChanges({
					values: tempCache,
				});
				return;
			//Cahce exists and a value is set and needs to be updated pulled
			default:
				setOptions(cachedChanges.values[cached_index].value);
				return;
		}
	}, [cachedChanges]);

	return (
		<div className="toggle_list_container">
			<h2>{name}</h2>
			<ScrollPaneV2
				style={style}
				cards={options.map((option, index) => {
					return (
						<div
							className="toggle_card inline_content"
							onMouseOver={()=>{selected_index.current = index}}>
							<ToggleCard option={option} updateSelect={updateSelected} />
						</div>
					);
				})}
			/>
		</div>
	);
}

export default ToggleList;

function ToggleCard({option, updateSelect}) {
	return (
		<>
			<h2>{option.name}</h2>
			<SVGButton
				name={
					(typeof option.selected !== "undefined" && option.selected)
						? "minusCircle"
						: "plusCircle"
				}
				width="20px"
				height="20px"
				onClickFunction={updateSelect}
				className={
					(typeof option.selected !== "undefined" && option.selected)
						? "red circle"
						: "green circle"
				}
			/>
		</>
	);
}
