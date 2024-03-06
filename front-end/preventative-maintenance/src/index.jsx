import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./index.css";
import DashboardPage from "./pages/dashboard/dashboard";
import EquipmentPage from "./pages/equipment/equipment";
import EquipmentProgramsPage from "./pages/equipment/equipmentPrograms/equipmentProgramsPageDesktop";
import LoginPage from "./pages/login/login";
import AddEquipmentPage from "./pages/equipment/addEquipment/addEquipment";
import MaintanceEdit from "./pages/equipment/maintanceEdit/maintanceEdit";
import BuildingsPage from "./pages/buildings/BuildingsPage";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<LoginPage />} />
			<Route path="/dashboard" element={<DashboardPage />} />
			<Route path="/equipment" element={<EquipmentPage />} />
			<Route path="/equipment/programs" element={<EquipmentProgramsPage />} />
			<Route path ="/equipment/addEquipment" element ={<AddEquipmentPage />} />
			<Route path = "/equipment/maintanceEdit" element={<MaintanceEdit />} />
			<Route path = "/buildings" element={<BuildingsPage />} />
		</Routes>
	</BrowserRouter>
);
