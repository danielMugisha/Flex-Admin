import React from "react";
import { DriverData } from "../../../dummyData";
import Chart from "../../../components/chart/Chart";
const DriversReport = () => {
	const data = DriverData();
	return (
		<div>
			<Chart
				data={data}
				title="Drivers Analytics"
				grid
				dataKey="Active Drivers"
			/>
		</div>
	);
};

export default DriversReport;
