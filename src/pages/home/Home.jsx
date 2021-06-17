import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { driverData, riderData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";

export default function Home() {
  return (
    <div className="home">
      {/* {console.log(serverDrivers)} */}
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
