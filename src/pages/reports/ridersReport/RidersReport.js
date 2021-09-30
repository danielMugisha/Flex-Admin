import React from "react";
import { RiderData } from "../../../dummyData";
import Chart from "../../../components/chart/Chart";
import { Button } from "@material-ui/core";
const RidersReport = () => {
	const data = RiderData();
	return (
		<div>
			<Chart
				data={data}
				title="Riders Analytics"
				grid
				dataKey="Active Riders"
			/>
		</div>
	);
};

export default RidersReport;
