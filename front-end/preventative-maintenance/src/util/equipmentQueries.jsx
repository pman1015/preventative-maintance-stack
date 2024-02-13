import { Axios } from "axios";
import {useState, useEffect} from "react"
import equipmentProgramQuery from "../assets/testData/equipmentData/equipmentProgramsQuery.json"
import programSampleQuery from "../assets/testData/equipmentData/programSampleQuery.json";
import equipmentTypes from "../assets/testData/equipmentData/equipmentTypes.json";
import equipmentNames from "../assets/testData/equipmentData/equipmentNames.json";
import equipmentTypeOptions from "../assets/testData/equipmentData/equipmentTypeOptions.json";
//----------------------------------------------------------------
//Set devMode to true to use the stored data rather than live from 
//the database
//----------------------------------------------------------------
const devMode = true;

export function getProgramList(){
    var apiResponse ={};
    if(devMode) apiResponse = equipmentProgramQuery;
    return apiResponse;
}

export function getProgramDetails(programName) {
    var apiResponse = {};
    if(devMode) apiResponse = programSampleQuery;
    return apiResponse;
}
export function getDeviceTypes(){
    var apiResponse = {};
    if(devMode) apiResponse = equipmentTypes;
    return apiResponse;

}
export function getDeviceNames(type){
    var apiResponse = {};
    if(devMode) apiResponse = equipmentNames;
    return apiResponse;

}
export function getDeviceTypeOptions(){
    var apiResponse = {};
    if(devMode) apiResponse = equipmentTypeOptions;
    return apiResponse;
}