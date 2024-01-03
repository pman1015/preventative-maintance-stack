import React, {useEffect, useState} from "react";
import DesktopContainer from "../../../assets/components/DesktopContainer/DesktopMainContainer";
import DesktopDashboardCard from "../../../assets/components/DesktopDashboardCard/DesktopDashboardCard";
import "./dashboardDesktop.css";

function DashboardDesktop() {
	const props = {
		assignment: {
			assignmentName: "Winter 2023 PM",
			assignmentDescription:
				"Preforme prevantative maintenance for the whole campus ",
			building: "Lanigan",
			room: "102",
			progress: "90",
		},
		warnings: {
			warnings: [
				{
					buildingName: "lanigan",
					roomNumber: "36",
					warningMessage: "lamp error",
				},
				{
					buildingName: "lanigan",
					roomNumber: "36",
					warningMessage: "lamp error",
				},
			],
		},
		equipmentStats: {
			options: ["projector", "processors", "webCameras"],
		},
	};
	return (
		<>
			<DesktopContainer content={DashboardDesktopContent(props)} />
		</>
	);
}

function DashboardDesktopContent(props) {
	return (
		<>
			<div>
				<DesktopDashboardCard
					width="360px"
					height="222px"
					assignment={props.assignment}
					type="currentAssignment"
				/>
				<DesktopDashboardCard
					width="360px"
					height="232px"
					warnings={props.warnings}
					type="warnings"
				/>
			</div>

			<DesktopDashboardCard
				width="480px"
				height="485px"
				equipmentStats={props.equipmentStats}
				type="equipmentStats"
			/>
		</>
	);
}
export default DashboardDesktop;
