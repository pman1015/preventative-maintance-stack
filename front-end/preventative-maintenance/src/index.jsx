import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./index.css";
import DashboardPage from "./pages/dashboard/dashboard";
import LoginPage from "./pages/login/login";
import EquipmentPage from "./pages/equipment/equipment";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<LoginPage />} />
			<Route path="/dashboard" element={<DashboardPage />} />
			<Route path="/equipment" element={<EquipmentPage />} />
		</Routes>
	</BrowserRouter>
);
