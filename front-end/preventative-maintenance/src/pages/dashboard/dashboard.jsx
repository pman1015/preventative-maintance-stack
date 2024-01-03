import React from "react";
import useIsMobile from "../../util/styleSelect";
import DashboardDesktop from "./dashboardDesktop/dashboardDesktop";
import DashboardMobile from "./dashboardMobile/dashboardMobile";

function DashboardPage() {
	const isMobile = useIsMobile();

	return <>{isMobile ? <DashboardMobile /> : <DashboardDesktop />}</>;
}
export default DashboardPage;
