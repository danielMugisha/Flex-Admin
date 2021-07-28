import Chart from "../../../components/chart/Chart";
import FeaturedInfo from "../../../components/featuredInfo/FeaturedInfo";
import "./helpDesk.css";
import { driverData, riderData } from "../../../dummyData";
import WidgetSm from "../../../components/widgetSm/WidgetSm";
import WidgetLg from "../../../components/widgetLg/WidgetLg";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import MapContainer from "../../../components/mapContainer/MapContainer";

export default function HelpDesk() {
	const user = useSelector((state) => state.firebase.auth);

	if (!user.uid) return <Redirect to="/login" />;
	return (
		<div className="home">
			<MapContainer />
		</div>
	);
}
