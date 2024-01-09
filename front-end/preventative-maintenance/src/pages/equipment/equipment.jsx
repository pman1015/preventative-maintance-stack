import React from "react";
import {Navigate} from "react-router-dom";
import useIsMobile from "../../util/styleSelect";
import EquipmentDesktop from "./equipmentDesktop/equipmentDesktop";

function EquipmentPage() {
	const isMobile = useIsMobile();

	return <>{isMobile ? <></> : <EquipmentDesktop />}</>;
}
export default EquipmentPage;
