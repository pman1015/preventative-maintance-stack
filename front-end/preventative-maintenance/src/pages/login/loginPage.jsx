import axios from "axios";
import { useState } from "react";
import { handelLogin } from "../../util/login.jsx";
import "./../../index.css";
import "./loginPage.css";

function LoginPage(){
   const [inputData, setInputData] = useState({username:'',password:''});
   const [login,setLogin] = useState(false);
   

   function loginOnDB(event){
    
        handelLogin(inputData);
    
   
   };
    return (
        <div className="backGround">
            <div className = "header">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="10 10 383 275"   fill="none">
                    <path d="M0 16C0 7.16345 7.16344 0 16 0H377C385.837 0 393 7.16344 393 16V185L0 285V16Z" fill="#0C7C59" fill-opacity="0.7"/>
                </svg>
                <h1 className="heading whiteText">Welcome to the Preventative Maintaince Tool</h1> 
            </div>
            <div className = "loginContainer">
                <h2 className="subHeading whiteText">Please Login</h2>
                <p className="whiteText">Enter your login <br/> information as provided</p>
                <input 
                    type = "text" 
                    className= "textField" 
                    name = "userName"
                    onChange={e => setInputData({...inputData,username: e.target.value})}/>
                <input
                    type = "password" 
                    className = "textField" 
                    name = "password"
                    onChange = {e => setInputData({...inputData,password:e.target.value})}/>
                <button className="loginButton" onClick={event => {loginOnDB(event)}}>
                    <h2 className="WhiteText">Login</h2>
                </button>
            </div>

            <div className="footer">
                <p className="whiteText">Designed and developed by Pierce Hurd</p>

            </div>
           
        </div>
    )
}
    

export default LoginPage;