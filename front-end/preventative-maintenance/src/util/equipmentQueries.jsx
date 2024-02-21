import {Axios} from "axios";
import {useEffect, useState} from "react";
import equipmentNames from "../assets/testData/equipmentData/equipmentNames.json";
import equipmentProgramQuery from "../assets/testData/equipmentData/equipmentProgramsQuery.json";
import equipmentTypeOptions from "../assets/testData/equipmentData/equipmentTypeOptions.json";
import equipmentTypes from "../assets/testData/equipmentData/equipmentTypes.json";
import programSampleQuery from "../assets/testData/equipmentData/programSampleQuery.json";
import getDeviceOptionsByTypeSample from "../assets/testData/equipmentData/deviceOptionsByType.json";
//----------------------------------------------------------------
//Set devMode to true to use the stored data rather than live from
//the database
//----------------------------------------------------------------
const devMode = true;

/**
 *This function returns a list of avaliable programs from the database
 *
 * @export
 * @return {
 *  status :
 *      200 - suscess,
 *      404 - method not found,
 *      500 - internal error
 * }
 */
export function getProgramList() {
	var apiResponse = {};
	if (devMode) apiResponse = equipmentProgramQuery;
	return apiResponse;
}
/**
 *This function returns a list of avaliable programs from the database
 *
 * @export
 * @return {
 *  status :
 *     { 200 - suscess,
 *      404 - method not found,
 *      500 - internal error}
 *   program : [{name:"program name",addedDate:"dateAdded"}] - a list of programs available
 * }
 */
export function getProgramDetails(programName) {
	var apiResponse = {};
	if (devMode) apiResponse = programSampleQuery;
	return apiResponse;
}
/**
 *This function returns a list of avaliable device types from the database
 *
 * @export
 * @return {
 *  status :
 *      {200 - suscess,
 *      404 - method not found,
 *      500 - internal error}
 * deviceTypes : ["deviceType"] - a list of device types available
 * }
 */
export function getDeviceTypes() {
	var apiResponse = {};
	if (devMode) apiResponse = equipmentTypes;
	return apiResponse;
}
/**
 *This function returns a list of all added names for the given device type
 *
 * @export
 * @return {
 *  status :
 *      {200 - suscess,
 *      404 - method not found,
 *      500 - internal error}
 *  names : ["deviceName"] - a list of avaiable device names
 * }
 *
 */
export function getDeviceNames(type) {
	var apiResponse = {};
	if (devMode) apiResponse = equipmentNames;
	return apiResponse;
}
/**
 *This function returns a list of avaliable options for new devices
 *
 * @export
 * @return {
 *  status :
 *     { 200 - suscess,
 *      404 - method not found,
 *      500 - internal error}
 *  options : [{name: "option name" , type: "option type"}] - a list of options available
 *
 * }
 */
export function getDeviceTypeOptions() {
	var apiResponse = {};
	if (devMode) apiResponse = equipmentTypeOptions;
	return apiResponse;
}

export function getDeviceOptionsByType(type){
    var apiResponse = {};
    if(devMode ) apiResponse = getDeviceOptionsByTypeSample;
    return apiResponse;

}


