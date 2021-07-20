import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { driverData, riderData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

export default function Home() {
	const user = useSelector((state) => state.firebase.auth);

	if (!user.uid) return <Redirect to="/login" />;
	return (
		<div className="home">
			<FeaturedInfo />
			<Chart
				data={driverData}
				title="Drivers Analytics"
				grid
				dataKey="Active Drivers"
			/>
			<Chart
				data={riderData}
				title="Riders Analytics"
				grid
				dataKey="Active Riders"
			/>
			<div className="homeWidgets">
				<WidgetSm />
				<WidgetLg />
			</div>
		</div>
	);
}
