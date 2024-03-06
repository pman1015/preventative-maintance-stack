import {Axios} from "axios";
import buildingResponse from "../assets/testData/buildingData/getBuildingsResponse.json";
import roomInfo from "../assets/testData/buildingData/getRoomInfo.json";
import roomList from "../assets/testData/buildingData/getRooms.json";
//----------------------------------------------------------------
//Set devMode to true to use stored data rather than live
//----------------------------------------------------------------
const devMode = true;

export function getBuildings() {
	var apiResponse = {};
	if (devMode) apiResponse = buildingResponse;
	return apiResponse;
}

export function getRooms(buildingName) {
	var apiResponse = {};
	if (devMode) apiResponse = roomList;
	return apiResponse;
}

export function getRoomInfo(buildingName, roomNumber) {
	var apiResponse = {};
	if (devMode) apiResponse = roomInfo;
	return apiResponse;
}
