import {useState, useEffect} from "react";
import {Navigate} from "react-router-dom";
import useIsMobile from "../../../util/styleSelect";
import MaintanceEditDesktop from "./Desktop/maintanceEditDesktop";
import DesktopContainer from "../../../assets/components/DesktopContainer/DesktopMainContainer";

function MaintanceEdit() {
    const isMobile = useIsMobile();
    return (
        <>
            {isMobile && <Navigate to="/dashboard" replace={true} />}
            <DesktopContainer content={<MaintanceEditDesktop />} />
        </>
    );
}

export default MaintanceEdit;
