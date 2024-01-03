import React from 'react';
import { useState,useEffect } from 'react';
import {Navigate} from 'react-router-dom';
import LogoHeader from '../../logoHeader';
import DesktopSideNavigation from '../navbar/DesktopSideNav';
import "./DesktopContainer.css"


function DesktopContainer(props) {
	const [user, setUser] = useState({});
	const [jwt, setJwt] = useState({});
	// one time use effect on load
	const [mostReccent, setMostReccent] = useState({});
	useEffect(() => {
		console.log(localStorage.getItem("Authentication"));
		setJwt(JSON.parse(localStorage.getItem("Authentication")));
		setUser(localStorage.getItem("username"));
	}, []);

	return (
		<div className="BackgroundDesktop">
			{jwt === null && <Navigate to="/" replace={true} />}
			<div className="MainContainer">
				<div className="DesktopHeader">
					<LogoHeader />
					<div className="DesktopHeaderNavigation">
						<button>Home</button>
						<button>Account</button>
						<button>Help</button>
						<button>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="36"
								height="36"
								viewBox="0 0 36 36"
								fill="none">
								<path
									d="M9 10.5H16.5C16.8978 10.5 17.2794 10.658 17.5607 10.9393C17.842 11.2206 18 11.6022 18 12C18 12.3978 17.842 12.7794 17.5607 13.0607C17.2794 13.342 16.8978 13.5 16.5 13.5H9C8.60218 13.5 8.22064 13.342 7.93934 13.0607C7.65804 12.7794 7.5 12.3978 7.5 12C7.5 11.6022 7.65804 11.2206 7.93934 10.9393C8.22064 10.658 8.60218 10.5 9 10.5ZM19.5 22.5H27C27.3978 22.5 27.7794 22.658 28.0607 22.9393C28.342 23.2206 28.5 23.6022 28.5 24C28.5 24.3978 28.342 24.7794 28.0607 25.0607C27.7794 25.342 27.3978 25.5 27 25.5H19.5C19.1022 25.5 18.7206 25.342 18.4393 25.0607C18.158 24.7794 18 24.3978 18 24C18 23.6022 18.158 23.2206 18.4393 22.9393C18.7206 22.658 19.1022 22.5 19.5 22.5ZM9 16.5H27C27.3978 16.5 27.7794 16.658 28.0607 16.9393C28.342 17.2206 28.5 17.6022 28.5 18C28.5 18.3978 28.342 18.7794 28.0607 19.0607C27.7794 19.342 27.3978 19.5 27 19.5H9C8.60218 19.5 8.22064 19.342 7.93934 19.0607C7.65804 18.7794 7.5 18.3978 7.5 18C7.5 17.6022 7.65804 17.2206 7.93934 16.9393C8.22064 16.658 8.60218 16.5 9 16.5Z"
									fill="black"
								/>
							</svg>
						</button>
					</div>
				</div>
				<div className="SideNavigationDesktop">
					<DesktopSideNavigation />
				</div>
				<div className='DesktopCenterContent'>
					{props.content}
				</div>
				
			</div>
		</div>
	);
}
export default DesktopContainer;