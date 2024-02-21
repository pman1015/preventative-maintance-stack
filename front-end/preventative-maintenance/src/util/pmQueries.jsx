import { Axios } from "axios";
import { useEffect, useState } from "react"; 
import equipmentPMSteps from "../assets/testData/equipmentData/equipmentPMSteps.json";
//----------------------------------------------------------------
//Set devMode to true to use the stored data rather than live from
//the database
//----------------------------------------------------------------
const devMode = true;



/**
 * This function takes in a device type as a string and returns an array of objects
 * containing the PM steps for that device type
 * @date 2/20/2024 - 1:21:57 PM
 *
 * @export
 * @param {String} deviceType
 * @returns {
 * status :
 *     { 
 *          200 - suscess,
 *          404 - method not found,
 *          500 - internal error
 *     }
 *   steps : [{"stepName":"String"}]
 * }
 */
export function getPMSteps(deviceType){
    var apiResponse = {};
    if (devMode) apiResponse = equipmentPMSteps;
    return apiResponse;
}