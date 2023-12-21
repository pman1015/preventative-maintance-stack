import axios from "axios";

const local = 'http://localhost';
const remote = 'http://hurd1999-andes.nord'
const isremote = true;

export function handelLogin(inputData,setResponseData){  
    if(inputData.username === "" || inputData.password === "")return;
    try{
       axios.post(
    `${isremote ? remote : local}:8080/userAPI/generateToken `,
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
