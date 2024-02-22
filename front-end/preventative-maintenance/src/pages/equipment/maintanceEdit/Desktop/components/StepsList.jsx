import {useEffect, useRef, useState} from "react";
import SVGButton from "../../../../../assets/components/svgButton/svgButton";
import {getPMSteps} from "../../../../../util/pmQueries";
import "./StepList.css";


/**
 * Functional component to load and update steps based on a selected device type.
 * @date 2/22/2024 - 1:10:16 PM
 *
 * @param {{ deviceTypeCache: Object; selectedCard: Object; setSelectedCard: function(Object); }} param0
 * @param {Object} param0.deviceTypeCache - Cache generated by an Input from with device type stored as "Device Type" used to get the selected type of device and make an api call
 * @param {Object} param0.selectedCard - useState to store the selected card passed from parent so that it can be sent to other components for updating 
 * @param {function(Object)} param0.setSelectedCard - function to set the value of the selected card
 * @returns {JSX.Element.PMStepsList} - returns a functional component to select and reorder PM Steps
 */
function PMStepsList({deviceTypeCache, selectedCard, setSelectedCard}) {

	//Use Effect and use state to set the device type locally when the device type cache is updated
	const [deviceType, setDeviceType] = useState("");
	useEffect(() => {
		try {
			const index = deviceTypeCache.values.findIndex(
				(obj) => obj.name === "Device Type"
			);
			if (index !== -1) setDeviceType(deviceTypeCache.values[index].value);
		} catch (e) {
			console.error(e);
		}
	}, [deviceTypeCache]);

	//When the device type is updated run an API call to update the steps cache
	const [stepsCache, setStepsCache] = useState([]);
	useEffect(() => {
		try {
			let response = getPMSteps(deviceType);
			if (response.status !== 200) return;
			setStepsCache(response.steps);
		} catch (e) {
			console.log(e);
		}
	}, [deviceType]);


	//When the steps cache is updated if the active card has changed update the old card in the cache and set the new active card as selectedCard
	useEffect(() => {
		const active_index = stepsCache.findIndex((step) => step.isActive);
		if (active_index === -1) return;
		if (
			typeof selectedCard.stepID === "undefined" ||
			stepsCache[active_index].stepID !== selectedCard.stepID
		) {
			setSelectedCard(stepsCache[active_index]);
			updateStepCache(selectedCard, stepsCache, setStepsCache);
		}
	}, [stepsCache]);


	
	return (
		<div className="steps-container">
			<div className="inline-container">
				<h1>Steps</h1>
				<SVGButton
					name="plusCircle"
					width="24px"
					height="24px"
					onClickFunction={newStep}
					className={"green circle"}
				/>
			</div>
			<div className="outer-scroll-container">
				<ScrollArea stepsCache={stepsCache} setStepsCache={setStepsCache} />
			</div>
		</div>
	);
}

export default PMStepsList;


/**
 * This function takes in a step and the cache and updates the cache with the old step at it index.
 * @date 2/22/2024 - 1:07:21 PM
 *
 * @param {Object} step - the new step to be updated
 * @param {Object} stepsCache - the steps cache
 * @param {function(Object)} setStepsCache - function to update the cache useState
 */
function updateStepCache(step, stepsCache, setStepsCache) {
	//If the step is undefined or has no ID exit early
	if (typeof step === "undefined" || typeof step.stepID === "undefined") return;
	//Get the inded of the step based in its ID 
	let update_index = stepsCache.findIndex((obj) => obj.stepID === step.stepID);
	//If the step is not in the cache exit as there is no step to update
	if (update_index === -1) return;
	//Force the updated step to be inactive
	step.isActive = false;
	//Copy and update the cache
	let tempSteps = [...stepsCache];
	tempSteps.splice(update_index, 1, step);
	setStepsCache(tempSteps);
}

//TODO: Implement the newStep function to create a new step when the plus button is clicked
function newStep() {}



/**
 * A Functional component that displays the step information 
 * @date 2/22/2024 - 1:04:53 PM
 *
 * @param {{ step: Object; removeStep: Functuon(); }} param0
 * @param {Object} param0.step - the step information
 * @param {Function()} param0.removeStep - function to be called when the remove button is clicked
 * @returns {JSX.Element.ScrollCard} - functional component to display step information
 */
function ScrollCard({step, removeStep}) {
	return (
		<>
			<h1>{step.stepName}</h1>
			<SVGButton
				onClickFunction={removeStep}
				name="minusCircle"
				width="24px"
				height="24px"
				className={"red circle"}
			/>
		</>
	);
}

/**
 * A Functional component that stores and displays ScrollCard components based on the stepsCache
 * It also allows these cards to be reordered by dragging and updates the cache when this happens
 * Finally it allows for the removal of step cards and the setting of the active step
 * @date 2/22/2024 - 12:58:42 PM
 *
 * @param {{ stepsCache: Object; setStepsCache: Function(Object); }} param0
 * @param {useState(Object)} param0.stepsCache - the cache that stores the steps
 * @param {function(Object)} param0.setStepsCache - function to update the steps cache
 * @returns {JSX.Element.ScrollArea}
 */
function ScrollArea({stepsCache, setStepsCache}) {
	const draggedIndex = useRef(0);
	const overLappedIndex = useRef(0);
	const hoverIndex = useRef(0);

	//Prevents Active from firing if a removal has been triggered but not completed
	let pendingRemoval = false;
	useEffect(() => {
		if (pendingRemoval) pendingRemoval = false;
		return;
	}, [stepsCache]);

	//Updates the active step to the last hovered step
	function setActive() {
		if (pendingRemoval) return;
		let updatedSteps = [];
		stepsCache.forEach((step, index) => {
			if (index === hoverIndex.current) {
				step.isActive = true;
			} else {
				step.isActive = false;
			}
			updatedSteps.push(step);
		});
		setStepsCache(updatedSteps);
	}

	//Reorders the cache on a drag
	function sort() {
		const draggedStep = stepsCache[draggedIndex.current];
		const updatedSteps = [...stepsCache];
		updatedSteps.splice(draggedIndex.current, 1);
		updatedSteps.splice(overLappedIndex.current, 0, draggedStep);
		setStepsCache(updatedSteps);
	}

	//Removes the last hovered step when a minus button is clicked
	function removeStep() {
		let updatedSteps = [...stepsCache];
		updatedSteps.splice(hoverIndex.current, 1);
		setStepsCache(updatedSteps);
		pendingRemoval = true;
	}

	return (
		<div className="ScrollArea">
			{stepsCache.map((step, index) => {
				return (
					<div
						className={`stepCard inline-container ${
							step.isActive ? "active" : "inactive"
						}`}
						key={index}
						draggable
						onDragStart={() => (draggedIndex.current = index)}
						onDragEnter={() => (overLappedIndex.current = index)}
						onDragEnd={sort}
						onMouseOver={() => (hoverIndex.current = index)}
						onClick={setActive}>
						<ScrollCard step={step} removeStep={removeStep} />
					</div>
				);
			})}
		</div>
	);
}
