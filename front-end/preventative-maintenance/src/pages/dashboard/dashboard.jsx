import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import Header from "../../assets/components/Header";
import NavBar from "../../assets/components/NavBar";
import ScrollContainer from "../../assets/components/scrollContainer/ScrollContainer";
import "./dashboard.css";

function DashboardPage() {
	const [user, setUser] = useState({});
	// one time use effect on load
	const [mostReccent, setMostReccent] = useState({});
	useEffect(() => {
		console.log(localStorage.getItem("Authentication"));
		setUser(JSON.parse(localStorage.getItem("Authentication")));
	}, []);

	return (
		<div className="background">
			<Header size="short" text={`Welcome ${user.username} `} />
			<NavBar />
			<div className="upcomming-work">
				<h1 className="gray-heading">Upcoming Work:</h1>
				<ScrollContainer />
			</div>
			<div className="lower-content">
				<div className="most-recent-task-card--wrapper">
				<h1 className="gray-heading">Most Recent Task</h1>
				<div className="most-recent-task-card--container">
					<h2 className="whiteText medium-text" style={{marginBottom  :"12px"}}>Task name here</h2>
					<h3 className="whiteText small-text">Preventative Maintance</h3>
					<h3 className="whiteText small-text">Progress</h3>
					<></>
					<h3 className="whiteText small-text"> Go To </h3>
					<svg></svg>
				</div>
			</div>
			<div className="messages--wrapper">
				<h1 className="gray-heading">Messages</h1>
				<div className="messages--container">

				</div>
			</div>
			</div>
			
		</div>
	);
}
export default DashboardPage;
