import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import DesktopContainer from "../../../assets/components/DesktopContainer/DesktopMainContainer";
import useIsMobile from "../../../util/styleSelect";
import AddEquipmentDesktop from "./addEquipmentDesktop/addEuipmentDesktop";

function AddEquipmentPage() {
	const isMobile = useIsMobile();

	return (
		<>
			{isMobile && <Navigate to="/dashboard" replace={true} />}
			<DesktopContainer content={<AddEquipmentDesktop />} />
		</>
	);
}
export default AddEquipmentPage;
