import React from "react";
import {useNavigate} from "react-router-dom";
import "./Navbar.css";

function DesktopSideNavigation() {
	const navigate = useNavigate();
	return (
		<div className="sideNavContainer">
			<button
				onClick={() => {
					navigate("/buildings");
				}}>
				{/*buildings button*/}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="48"
					height="48"
					viewBox="0 0 48 48"
					fill="none">
					<path
						d="M12 44V8C12 6.93913 12.4214 5.92172 13.1716 5.17157C13.9217 4.42143 14.9391 4 16 4H32C33.0609 4 34.0783 4.42143 34.8284 5.17157C35.5786 5.92172 36 6.93913 36 8V44M12 44H36M12 44H8C6.93913 44 5.92172 43.5786 5.17157 42.8284C4.42143 42.0783 4 41.0609 4 40V28C4 26.9391 4.42143 25.9217 5.17157 25.1716C5.92172 24.4214 6.93913 24 8 24H12M36 44H40C41.0609 44 42.0783 43.5786 42.8284 42.8284C43.5786 42.0783 44 41.0609 44 40V22C44 20.9391 43.5786 19.9217 42.8284 19.1716C42.0783 18.4214 41.0609 18 40 18H36M20 12H28M20 20H28M20 28H28M20 36H28"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
			<button>
				{/* calander button*/}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="49"
					height="49"
					viewBox="0 0 49 49"
					fill="none">
					<path
						d="M32.6667 4.08333V12.25M16.3333 4.08333V12.25M6.125 20.4167H42.875M16.3333 28.5833H16.3538M24.5 28.5833H24.5204M32.6667 28.5833H32.6871M16.3333 36.75H16.3538M24.5 36.75H24.5204M32.6667 36.75H32.6871M10.2083 8.16666H38.7917C41.0468 8.16666 42.875 9.99483 42.875 12.25V40.8333C42.875 43.0885 41.0468 44.9167 38.7917 44.9167H10.2083C7.95317 44.9167 6.125 43.0885 6.125 40.8333V12.25C6.125 9.99483 7.95317 8.16666 10.2083 8.16666Z"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
			<button
				onClick={() => {
					navigate("/equipment");
				}}>
				{/*equipment button*/}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="48"
					height="48"
					viewBox="0 0 48 48"
					fill="none">
					<path
						d="M10 14L6 10M18 12V6M26 14L30 10M23.66 24H40C41.0609 24 42.0783 24.4214 42.8284 25.1716C43.5786 25.9217 44 26.9391 44 28V36C44 37.0609 43.5786 38.0783 42.8284 38.8284C42.0783 39.5786 41.0609 40 40 40H8C6.93913 40 5.92172 39.5786 5.17157 38.8284C4.42143 38.0783 4 37.0609 4 36V28C4 26.9391 4.42143 25.9217 5.17157 25.1716C5.92172 24.4214 6.93913 24 8 24H12.34M32 32H36M24 26C24 29.3137 21.3137 32 18 32C14.6863 32 12 29.3137 12 26C12 22.6863 14.6863 20 18 20C21.3137 20 24 22.6863 24 26Z"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
			<button>
				{/*users button*/}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="48"
					height="48"
					viewBox="0 0 48 48"
					fill="none">
					<path
						d="M32 36C32 33.8783 31.1571 31.8434 29.6569 30.3431C28.1566 28.8429 26.1217 28 24 28M24 28C21.8783 28 19.8434 28.8429 18.3431 30.3431C16.8429 31.8434 16 33.8783 16 36M24 28C27.3137 28 30 25.3137 30 22C30 18.6863 27.3137 16 24 16C20.6863 16 18 18.6863 18 22C18 25.3137 20.6863 28 24 28ZM16 4V8M32 4V8M10 8H38C40.2091 8 42 9.79086 42 12V40C42 42.2091 40.2091 44 38 44H10C7.79086 44 6 42.2091 6 40V12C6 9.79086 7.79086 8 10 8Z"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		</div>
	);
}
export default DesktopSideNavigation;
