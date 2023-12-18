import axios from "axios";

export function handelLogin(inputData){  
    console.log(inputData);
    axios.post(
    'http://localhost:8080/api/validate',
     inputData,
     {headers : {
        'content-type': 'application/json',
        'Accept': '*/*'
     }}).then(response => {
    console.log(response);
    if(response.statusCode === 200){
        console.log("success");
        console.log(response.d)
    }  
    })
   
};
