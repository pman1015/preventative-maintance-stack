import { Axios } from "axios";
import {useState, useEffect} from "react"
import equipmentProgramQuery from "../assets/testData/equipmentData/equipmentProgramsQuery.json"
import programSampleQuery from "../assets/testData/equipmentData/programSampleQuery.json";

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
