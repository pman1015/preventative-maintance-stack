import {useState, useEffect} from "react";
import useIsMobile from "../../util/styleSelect";
import BuildingPageDesktop from "./desktop/BuildingsPageDesktop";

function BuildingsPage(){
    const isMobile = useIsMobile();

    return(
        <>{isMobile ? <></> : <BuildingPageDesktop /> }</>
    )
}
export default BuildingsPage;