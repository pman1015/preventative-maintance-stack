import {useEffect, useState} from "react";
import ScrollPane from "../../../../../assets/components/ScrollPane/ScrollPane";
import InputForm from "../../../../../assets/components/form/form";
import {getDeviceTypeOptions} from "../../../../../util/equipmentQueries";
import NewOptionForm from "./NewOptionForm";
import OptionCard from "./OptionCard";

function NewDeviceTypeForm({optionsCache, setOptionsCache}) {
	const [showNewOption, setShowNewOption] = useState(false);

	//----------------------------------------------------------------
	//initalize cache and form for new device type name
	//----------------------------------------------------------------
	const [typeNameCache, setTypeNameCache] = useState({});
	const initaldata = {
		inputs: [{fieldName: "Type Name", type: "text"}],
	};

	//----------------------------------------------------------------
	//Function calls the API to get all of the options availavle and
	//Genrates cards for them
	//----------------------------------------------------------------
	const [optionCards, setOptionCards] = useState([]);
	const [optionValues, setOptionValues] = useState([]);
	useEffect(() => {
		console.log(optionsCache);
		console.log(optionsCache.values);
	}, [optionsCache]);

	useEffect(() => {
		const tempOptionCards = optionValues.map((option) => {
			return (
				<OptionCard
					key={option.name}
					name={option.name}
					type={option.type}
					toggleOption={toggleOption}
					optionsCache={optionsCache}
				/>
			);
		});

		setOptionCards(tempOptionCards);
	}, [optionValues, optionsCache]);

	useEffect(() => {
		const response = getDeviceTypeOptions();
		if (response.status !== 200) return;
		setOptionValues(response.options);
	}, []);

	//----------------------------------------------------------------
	//
	//----------------------------------------------------------------
	function toggleOption(name, state, type) {
		let tempCache = [];
		let isAdded = false;

		try {
			tempCache = [...optionsCache.values]; // create a local copy of optionsCache

			tempCache = tempCache.map((value) => {
				if (value.name === name) {
					isAdded = true;
					return {name: name, value: state, type: type};
				} else {
					return value;
				}
			});
		} catch (e) {}

		if (!isAdded) {
			tempCache.push({name: name, value: state, type: type});
		}

		setOptionsCache({values: tempCache});
	}

	return (
		<>
			<div className="card newDeviceTypeForm">
				<h1 className="lightText">New Device Type</h1>
				<div style={{marginLeft: "16px"}}>
					<InputForm
						initialStates={initaldata}
						isEditable={true}
						cachedChanges={typeNameCache}
						setCachedChanges={setTypeNameCache}
					/>
					<div className="inline_content">
						<h1 className="lightText" style={{fontSize: "16px"}}>
							Options - select all that apply
						</h1>
						<button
							className="newOptionButton"
							onClick={() => {
								setShowNewOption(!showNewOption);
							}}>
							<h1>New Option</h1>
						</button>
					</div>
					<ScrollPane cards={optionCards} />
				</div>
			</div>
			{showNewOption && (
				<NewOptionForm
					setShowNewOption={setShowNewOption}
					optionValues={optionValues}
					setOptionValues={setOptionValues}
				/>
			)}
		</>
	);
}
export default NewDeviceTypeForm;
