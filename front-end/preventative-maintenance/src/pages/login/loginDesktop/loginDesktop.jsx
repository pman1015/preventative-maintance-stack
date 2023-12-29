import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import LogoHeader from "../../../assets/logoHeader";
import {handelLogin} from "../../../util/login.jsx";
import "./loginDesktop.css";
function LoginPageDesktop() {
	const [inputData, setInputData] = useState({username: "", password: ""});
	const [responseData, setResponseData] = useState({});
	useEffect(() => {
		if (responseData.status === 200) {
			console.log("Success");
			console.log(responseData);
			localStorage.setItem("Authentication", JSON.stringify(responseData.data));
			localStorage.setItem("username", inputData.username);
		} else if (responseData.status !== undefined) {
			console.log("Error");
			console.log(responseData);
		}
	}, [responseData]);

	function loginOnDB(event) {
		handelLogin(inputData, setResponseData);
	}
	return (
		<div className="BackgroundDesktop">
			{responseData.status === 200 && (
				<Navigate to="/dashboard" replace={true} />
			)}
			<div className="loginCardDesktop">
				<div className=" logo">
					<LogoHeader />
				</div>
				<button className="helpButtonDesktop">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="37"
						height="37"
						viewBox="0 0 37 37"
						fill="none">
						<path
							d="M13.7712 13.6251C14.1532 12.5391 14.9073 11.6233 15.8999 11.04C16.8924 10.4566 18.0594 10.2434 19.1941 10.438C20.3288 10.6327 21.358 11.2226 22.0995 12.1034C22.8409 12.9841 23.2467 14.0989 23.245 15.2501C23.245 18.5001 18.37 20.1251 18.37 20.1251M18.5 26.625H18.5163M34.75 18.5C34.75 27.4746 27.4746 34.75 18.5 34.75C9.52538 34.75 2.25 27.4746 2.25 18.5C2.25 9.52538 9.52538 2.25 18.5 2.25C27.4746 2.25 34.75 9.52538 34.75 18.5Z"
							stroke="white"
							stroke-width="4"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
				<div className="loginContainerDesktop">
					<h2 className="lightHeadingDesktop">
						Please Enter Your Provided Login Info
					</h2>
					<input
						type="text"
						className="textFieldDesktop"
						name="userName"
						onChange={(e) =>
							setInputData({...inputData, username: e.target.value})
						}
					/>
					<input
						type="password"
						className="textFieldDesktop"
						name="userName"
						onChange={(e) =>
							setInputData({...inputData, password: e.target.value})
						}
					/>
				</div>
				<button
					className="loginButtonDesktop"
					onClick={(event) => {
						loginOnDB(event);
					}}>
					<h2 className="loginButtonTextDesktop">Login</h2>
				</button>
			</div>
		</div>
	);
}
export default LoginPageDesktop;
