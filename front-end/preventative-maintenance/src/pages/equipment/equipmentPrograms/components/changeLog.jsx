import {useEffect, useState} from "react";
import ScrollPane from "../../../../assets/components/ScrollPane/ScrollPane";
import InputForm from "../../../../assets/components/form/form";
import * as svgs from "../../../../pages/equipment/components/equipmentSVGs";

function ChangeLog({changeLog, setChangeLog}) {
	const [versions, setVersions] = useState([]);
	const [editable, setEditable] = useState(false);
	useEffect(() => {
		console.log(changeLog);
		if (typeof changeLog.versions !== "undefined") {
			var tempLog = [];
			changeLog.versions.forEach((entry) => {
				tempLog.push({
					programVersion: entry.programVersions,
					changes: entry.changes,
				});
			});
			console.log(tempLog);
			setVersions(tempLog);
		} else {
			console.log(
				(typeof changeLog.versions).toString +
					" versionsData: " +
					changeLog.versions
			);
		}
	}, [changeLog]);

	return (
		<div className="change_log_container">
			<div className="inline_content">
				<h1>Change Log: </h1>
				<button
					onClick={() => {
						setEditable(!editable);
					}}>
					{svgs.pencilSVG()}
				</button>
			</div>
			<div className="versions_container">
				{versions.map((version) => (
					<LogEntry
						log={version}
						editable={editable}
						changeLog={changeLog}
						setChangeLog={setChangeLog}
					/>
				))}
			</div>
		</div>
	);
}
export default ChangeLog;

function LogEntry({log, editable, changelog, setChangeLog}) {
	const [versionCache, setVersionCache] = useState({values: []});
	const [formSettings, setFormSettings] = useState({});
	useEffect(() => {
		if (typeof log.changes !== "undefined") {
			let changes = [];
			let initialInputs = [];
			log.changes.forEach((change) => {
				changes.push({
					name: changes.length,
					value: change,
				});
				initialInputs.push({
					type: "text",
					fieldName: changes.length - 1,
					styelClass: "",
				});
			});
			setVersionCache({values: changes});
			setFormSettings({inputs: initialInputs});
		}
	}, [log]);
	return (
		<div className="change_log_entry">
			<h1>{log.programVersion}</h1>
			{typeof versionCache.values !== "undefined" &&
				versionCache.values.length > 0 && (
					<InputForm
						initialStates={formSettings}
						isEditable={editable}
						cachedChanges={versionCache}
						setCachedChanges={setVersionCache}
					/>
				)}
		</div>
	);
}
