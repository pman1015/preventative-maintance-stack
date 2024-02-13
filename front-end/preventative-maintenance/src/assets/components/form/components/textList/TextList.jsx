import React, {useEffect, useState} from "react";
import ScrollPane from "../../../ScrollPane/ScrollPane";
import updateCache from "../../util/updateCache";
import TextField from "../textEdit/textField";
import {MinusCircle, PlusCircle} from "./svgs";

import "./TextList.css";
function TextList({cachedChanges, setCachedChanges, name, isEditable}) {
	const [textBoxes, setTextBoxes] = useState([]);
	const [localCache, setLocalCache] = useState({});

	useEffect(() => {
		try {
			const index = cachedChanges.values.findIndex((obj) => obj.name === name);
			if (index !== -1) {
				let options = cachedChanges.values[index].value;

				let tempLoacalCache = [];
				let update = false;
				if (typeof localCache.values === "undefined") update = true;
				for (let i = 0; i < options.length; i++) {
					if (update || options[i] === localCache.values[i].value) {
						update = true;
					}
					tempLoacalCache.push({name: i, value: options[i]});
				}
				if (update) {
					setLocalCache({values: tempLoacalCache});
				} else {
					console.log("no change");
				}
			}
		} catch (error) {
			console.error(error);
		}
	}, [cachedChanges, name]);

	useEffect(() => {
		try {
			let tempTextBoxes = [];
			let newValue = [];
			for (let i = 0; i < localCache.values.length; i++) {
				newValue.push(localCache.values[i].value);
				tempTextBoxes.push(
					<TextListEntry
						cache={localCache}
						setCache={setLocalCache}
						name={i}
						isEditable={isEditable}
					/>
				);
			}
			setTextBoxes(tempTextBoxes);
			if (newValue.length > 0) {
				updateCache(name, newValue, cachedChanges, setCachedChanges);
			}
		} catch (e) {
			console.error(e);
		}
	}, [localCache]);

	function addNewBox() {
		try {
			let size = typeof localCache.size === "undefined" ? 0 : localCache.size;
			let tempCache = [];
			if (typeof localCache.values !== "undefined") {
				tempCache = [...localCache.values];
			}
			tempCache.push({name: size, value: ""});
			setLocalCache({values: tempCache});
		} catch (e) {}
	}

	return (
		<div className="textList">
			<div className=" inline_content">
				<h1>{name}:</h1>
				<button
					style={{backgroundColor: "#008D30"}}
					onClick={() => {
						addNewBox();
					}}>
					{PlusCircle()}
				</button>
			</div>
			<ScrollPane cards={textBoxes} height={200} width={400} />
		</div>
	);
}
export default TextList;

function TextListEntry({cache, setCache, name, isEditable}) {
	function removeSelf() {
		let temp = [...cache.values];
		temp.splice(name, 1);
		setCache({values: temp});
	}

	return (
		<div className="listEntry">
			<TextField
				name={name}
				isEditable={isEditable}
				cachedChanges={cache}
				setCachedChanges={setCache}
			/>
			<button
				style={{backgroundColor: "#CA4343"}}
				onClick={() => {
					removeSelf();
				}}>
				{MinusCircle()}
			</button>
		</div>
	);
}
