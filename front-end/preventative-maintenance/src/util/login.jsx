import axios from "axios";

export function handelLogin(inputData,setResponseData){  
    if(inputData.username === "" || inputData.password === "")return;
    try{
       axios.post(
    'http://localhost:8080/api/validate',
     inputData,
     {headers : {
        'content-type': 'application/json',
        'Accept': '*/*'
     }}).then(response => {
        setResponseData(response);
    }) 
    }catch(e) {
        setResponseData(e);
    }
    
   
};
