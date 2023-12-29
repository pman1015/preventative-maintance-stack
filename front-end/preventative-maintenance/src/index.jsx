import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./index.css";
import DashboardPage from "./pages/dashboard/dashboard";
import LoginPage from "./pages/login/login";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<LoginPage />} />
			<Route path="/dashboard" element={<DashboardPage />} />
		</Routes>
	</BrowserRouter>
);
