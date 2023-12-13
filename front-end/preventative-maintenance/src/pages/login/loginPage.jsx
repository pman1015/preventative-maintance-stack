import "./../../index.css";
import "./loginPage.css";


function LoginPage(){
    
    return (
        <div className="backGround">
            <div className = "header">
                <svg xmlns="http://www.w3.org/2000/svg" width="393" height="285" viewBox="0 0 393 285" fill="none">
                    <path d="M0 16C0 7.16345 7.16344 0 16 0H377C385.837 0 393 7.16344 393 16V185L0 285V16Z" fill="#0C7C59" fill-opacity="0.7"/>
                </svg>
                <h1 className="heading whiteText">Welcome to the Preventative Maintaince Tool</h1> 
            </div>
            <div className = "loginContainer">
                <h2 className="subHeading whiteText">Please Login</h2>
                <p className="whiteText">Enter your login <br/> information as provided</p>
                <input className= "textField" name = "userName"/>
                <input className = "textField" name = "password"/>
                <button className="loginButton" >
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