import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useSelector } from "react-redux";

export default function FeaturedInfo() {
	const totalRides = useSelector((state) => state.allRiders.totalRides);
	const totalRiders = useSelector((state) => state.allRiders.totalRiders);
	const totalDrivers = useSelector((state) => state.allDrivers.totalDrivers);
	const totalRequests = useSelector((state) => state.allRiders.totalRequests);
	return (
		<div className="featured">
			<div className="featuredItem">
				<span className="featuredTitle">Drivers</span>
				<div className="featuredMoneyContainer">
					<span className="featuredMoney">{totalDrivers}</span>
					<span className="featuredMoneyRate">
						3 <ArrowUpward className="featuredIcon positive" />
					</span>
				</div>
				<span className="featuredSub">Last 2 hours</span>
			</div>
			<div className="featuredItem">
				<span className="featuredTitle">Customers</span>
				<div className="featuredMoneyContainer">
					<span className="featuredMoney">{totalRiders}</span>
					<span className="featuredMoneyRate">
						+6 <ArrowUpward className="featuredIcon positive" />
					</span>
				</div>
				<span className="featuredSub">Last 2 hours</span>
			</div>
			<div className="featuredItem">
				<span className="featuredTitle">Requests</span>
				<div className="featuredMoneyContainer">
					<span className="featuredMoney">{totalRequests}</span>
					<span className="featuredMoneyRate">
						-2 <ArrowDownward className="featuredIcon" />
					</span>
				</div>
				<span className="featuredSub">Last 2 hours</span>
			</div>
			<div className="featuredItem">
				<span className="featuredTitle">Trips</span>
				<div className="featuredMoneyContainer">
					<span className="featuredMoney">{totalRides}</span>
					<span className="featuredMoneyRate">
						+3 <ArrowUpward className="featuredIcon" />
					</span>
				</div>
				<span className="featuredSub">Last 2 hours</span>
			</div>
		</div>
	);
}
