import React, { useEffect, useState, useCallback } from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { SortedData } from "../../dummyData";

export default function FeaturedInfo() {
	const totalRides = useSelector((state) => state.allRiders.totalRides);
	const totalRiders = useSelector((state) => state.allRiders.totalRiders);
	const totalDrivers = useSelector((state) => state.allDrivers.totalDrivers);
	const totalRequests = useSelector((state) => state.allRiders.totalRequests);
	const members = SortedData();
	let driverChange = 0;
	let riderChange = 0;
	let tripChange = 0;
	let requestChange = 0;

	const timeNow = new Date();

	const countChange = () => {
		let countd = driverChange;
		let countr = riderChange;
		members.forEach((member) => {
			if (timeNow - member.joiningDate < 86400000) {
				if (member.status) {
					countd = countd + 1;
				} else {
					countr = countr + 1;
				}
			}
		});

		return { countd, countr };
	};

	driverChange = countChange().countd;
	riderChange = countChange().countr;

	return (
		<div className="featured">
			<div className="featuredItem" style={{ backgroundColor: "#CDEAE5" }}>
				<span className="featuredTitle">Drivers</span>
				<div className="featuredMoneyContainer">
					<span className="featuredMoney">{totalDrivers}</span>
					<span className="featuredMoneyRate">
						{driverChange}{" "}
						{driverChange &&
							(driverChange > 0 ? (
								<ArrowUpward className="featuredIcon positive" />
							) : (
								<ArrowDownward className="featuredIcon negative" />
							))}
					</span>
				</div>
				<span className="featuredSub">Last 24 hours</span>
			</div>
			<div className="featuredItem" style={{ backgroundColor: "#D1E0DC" }}>
				<span className="featuredTitle">Customers</span>
				<div className="featuredMoneyContainer">
					<span className="featuredMoney">{totalRiders}</span>
					<span className="featuredMoneyRate">
						{riderChange &&
							(riderChange > 0 ? (
								<ArrowUpward className="featuredIcon positive" />
							) : (
								<ArrowDownward className="featuredIcon negative" />
							))}
					</span>
				</div>
				<span className="featuredSub">Last 24 hours</span>
			</div>
			<div className="featuredItem" style={{ backgroundColor: "#DDC2C0" }}>
				<span className="featuredTitle">Requests</span>
				<div className="featuredMoneyContainer">
					<span className="featuredMoney">{totalRequests}</span>
					<span className="featuredMoneyRate">
						{requestChange &&
							(requestChange > 0 ? (
								<ArrowUpward className="featuredIcon positive" />
							) : (
								<ArrowDownward className="featuredIcon negative" />
							))}
					</span>
				</div>
				<span className="featuredSub">Last 24 hours</span>
			</div>
			<div className="featuredItem" style={{ backgroundColor: "#EC9A9A" }}>
				<span className="featuredTitle">Trips</span>
				<div className="featuredMoneyContainer">
					<span className="featuredMoney">{totalRides}</span>
					<span className="featuredMoneyRate">
						{tripChange &&
							(tripChange > 0 ? (
								<ArrowUpward className="featuredIcon positive" />
							) : (
								<ArrowDownward className="featuredIcon negative" />
							))}
					</span>
				</div>
				<span className="featuredSub">Last 24 hours</span>
			</div>
		</div>
	);
}
