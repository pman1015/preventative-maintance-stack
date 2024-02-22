import {useEffect, useRef, useState} from "react";
import SVGButton from "../../../../../assets/components/svgButton/svgButton";
import {getPMSteps} from "../../../../../util/pmQueries";
import "./StepList.css";
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

	//Update active index
	const [active_id,set_active_id] = useState(0);
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
	}, [active_id]);

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
				<ScrollArea
					stepsCache={stepsCache}
					setStepsCache={setStepsCache}
					set_active_id={set_active_id}
				/>
			</div>
		</div>
	);
}

export default PMStepsList;

//Update the steps cache before changing the active step
function updateStepCache(step, stepsCache, setStepsCache) {
	if (typeof step === "undefined" || typeof step.stepID === "undefined") return;
	let update_index = stepsCache.findIndex((obj) => obj.stepID === step.stepID);
	if (update_index === -1) return;
	step.isActive = false;
	let tempSteps = [...stepsCache];
	tempSteps.splice(update_index, 1, step);
	setStepsCache(tempSteps);
}

function newStep() {}

function ScrollCard({step, removeStep, index}) {
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

function ScrollArea({stepsCache, setStepsCache, set_active_id}) {
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
				set_active_id(step.stepID); 
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
						<ScrollCard step={step} removeStep={removeStep} index={index} />
					</div>
				);
			})}
		</div>
	);
}