import React, { useState } from "react";
import DriversReport from "./driversReport/DriversReport";
import RidersReport from "./ridersReport/RidersReport";
import { Button } from "@material-ui/core";

const Reports = () => {
	const [step, setStep] = useState(1);
	const navigateToDrivers = () => {
		setStep(1);
	};
	const navigateToRiders = () => {
		setStep(2);
	};
	return (
		<div>
			<div className="reportsHeader">
				<Button onClick={navigateToDrivers}>Drivers</Button>
				<Button onClick={navigateToRiders}>Riders</Button>
			</div>
			{step == 1 ? <DriversReport /> : ""}
			{step == 2 ? <RidersReport /> : ""}
		</div>
	);
};

export default Reports;
