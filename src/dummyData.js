import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export const DriverData = () => {
	const drivers = useSelector((state) => state.allDrivers.drivers);

	const monthlyDrivers = {
		jan: 0,
		feb: 0,
		mar: 0,
		apr: 0,
		may: 0,
		jun: 0,
		jul: 0,
		aug: 0,
		sep: 0,
		oct: 0,
		nov: 0,
		dec: 0,
	};

	let driverData = [
		{
			name: "Jan",
			"Active Drivers": 0,
		},
		{
			name: "Feb",
			"Active Drivers": 0,
		},
		{
			name: "Mar",
			"Active Drivers": 0,
		},
		{
			name: "Apr",
			"Active Drivers": 0,
		},
		{
			name: "May",
			"Active Drivers": 0,
		},
		{
			name: "Jun",
			"Active Drivers": 0,
		},
		{
			name: "Jul",
			"Active Drivers": 0,
		},
		{
			name: "Agu",
			"Active Drivers": 0,
		},
		{
			name: "Sep",
			"Active Drivers": 0,
		},
		{
			name: "Oct",
			"Active Drivers": 0,
		},
		{
			name: "Nov",
			"Active Drivers": 0,
		},
		{
			name: "Dec",
			"Active Drivers": 0,
		},
	];

	drivers.map((driver) => {
		let month = 0;
		if (driver.created) {
			month = new Date(
				driver.created._seconds * 1000 + driver.created._nanoseconds / 1000000
			)
				.getMonth()
				.toLocaleString("default", { month: "long" });
		} else {
			month = -1;
		}

		if (month == 0) {
			monthlyDrivers.jan = monthlyDrivers.jan + 1;
			driverData[0]["Active Drivers"] = monthlyDrivers.jan;

			driverData.forEach((d) => {
				if (driverData.indexOf(d) > month)
					d["Active Drivers"] = driverData[0]["Active Drivers"];
			});
		}

		if (month == 1) {
			monthlyDrivers.feb = monthlyDrivers.feb + 1;
			driverData[1]["Active Drivers"] =
				driverData[0]["Active Drivers"] + monthlyDrivers.feb;

			driverData.forEach((d) => {
				if (driverData.indexOf(d) > month)
					d["Active Drivers"] = driverData[1]["Active Drivers"];
			});
		}

		if (month == 2) {
			monthlyDrivers.mar = monthlyDrivers.mar + 1;
			driverData[2]["Active Drivers"] =
				driverData[1]["Active Drivers"] + monthlyDrivers.mar;

			driverData.forEach((d) => {
				if (driverData.indexOf(d) > month)
					d["Active Drivers"] = driverData[2]["Active Drivers"];
			});
		}

		if (month == 3) {
			monthlyDrivers.apr = monthlyDrivers.apr + 1;
			driverData[3]["Active Drivers"] =
				driverData[2]["Active Drivers"] + monthlyDrivers.apr;

			driverData.forEach((d) => {
				if (driverData.indexOf(d) > month)
					d["Active Drivers"] = driverData[3]["Active Drivers"];
			});
		}

		if (month == 4) {
			monthlyDrivers.may = monthlyDrivers.may + 1;
			driverData[4]["Active Drivers"] =
				driverData[3]["Active Drivers"] + monthlyDrivers.may;

			driverData.forEach((d) => {
				if (driverData.indexOf(d) > month)
					d["Active Drivers"] = driverData[4]["Active Drivers"];
			});
		}

		if (month == 5) {
			monthlyDrivers.jun = monthlyDrivers.jun + 1;
			driverData[5]["Active Drivers"] =
				driverData[4]["Active Drivers"] + monthlyDrivers.jun;

			driverData.forEach((d) => {
				if (driverData.indexOf(d) > month)
					d["Active Drivers"] = driverData[5]["Active Drivers"];
			});
		}

		if (month == 6) {
			monthlyDrivers.jul = monthlyDrivers.jul + 1;
			driverData[6]["Active Drivers"] =
				driverData[5]["Active Drivers"] + monthlyDrivers.jul;

			driverData.forEach((d) => {
				if (driverData.indexOf(d) > month)
					d["Active Drivers"] = driverData[6]["Active Drivers"];
			});
		}

		if (month == 7) {
			monthlyDrivers.aug = monthlyDrivers.aug + 1;
			driverData[7]["Active Drivers"] =
				driverData[6]["Active Drivers"] + monthlyDrivers.aug;

			driverData.forEach((d) => {
				if (driverData.indexOf(d) > month)
					d["Active Drivers"] = driverData[7]["Active Drivers"];
			});
		}

		if (month == 8) {
			monthlyDrivers.sep = monthlyDrivers.sep + 1;
			driverData[8]["Active Drivers"] =
				driverData[7]["Active Drivers"] + monthlyDrivers.sep;

			driverData.forEach((d) => {
				if (driverData.indexOf(d) > month)
					d["Active Drivers"] = driverData[8]["Active Drivers"];
			});
		}

		if (month == 9) {
			monthlyDrivers.oct = monthlyDrivers.oct + 1;
			driverData[9]["Active Drivers"] =
				driverData[8]["Active Drivers"] + monthlyDrivers.oct;

			driverData.forEach((d) => {
				if (driverData.indexOf(d) > month)
					d["Active Drivers"] = driverData[9]["Active Drivers"];
			});
		}

		if (month == 10) {
			monthlyDrivers.nov = monthlyDrivers.nov + 1;
			driverData[10]["Active Drivers"] =
				driverData[9]["Active Drivers"] + monthlyDrivers.nov;

			driverData.forEach((d) => {
				if (driverData.indexOf(d) > month)
					d["Active Drivers"] = driverData[10]["Active Drivers"];
			});
		}

		if (month == 11) {
			monthlyDrivers.dec = monthlyDrivers.dec + 1;
			driverData[11]["Active Drivers"] =
				driverData[10]["Active Drivers"] + monthlyDrivers.dec;

			driverData.forEach((d) => {
				if (driverData.indexOf(d) > month)
					d["Active Drivers"] = driverData[11]["Active Drivers"];
			});
		}
	});

	return driverData;
};

export const RiderData = () => {
	const riders = useSelector((state) => state.allRiders.riders);
	const monthlyRiders = {
		jan: 0,
		feb: 0,
		mar: 0,
		apr: 0,
		may: 0,
		jun: 0,
		jul: 0,
		aug: 0,
		sep: 0,
		oct: 0,
		nov: 0,
		dec: 0,
	};

	let riderData = [
		{
			name: "Jan",
			"Active Riders": 0,
		},
		{
			name: "Feb",
			"Active Riders": 0,
		},
		{
			name: "Mar",
			"Active Riders": 0,
		},
		{
			name: "Apr",
			"Active Riders": 0,
		},
		{
			name: "May",
			"Active Riders": 0,
		},
		{
			name: "Jun",
			"Active Riders": 0,
		},
		{
			name: "Jul",
			"Active Riders": 0,
		},
		{
			name: "Agu",
			"Active Riders": 0,
		},
		{
			name: "Sep",
			"Active Riders": 0,
		},
		{
			name: "Oct",
			"Active Riders": 0,
		},
		{
			name: "Nov",
			"Active Riders": 0,
		},
		{
			name: "Dec",
			"Active Riders": 0,
		},
	];

	riders.map((rider) => {
		let month = 0;
		if (rider.joined) {
			month = new Date(
				rider.joined._seconds * 1000 + rider.joined._nanoseconds / 1000000
			)
				.getMonth()
				.toLocaleString("default", { month: "long" });
		} else {
			month = -1;
		}

		if (month == 0) {
			monthlyRiders.jan = monthlyRiders.jan + 1;
			riderData[0]["Active Riders"] = monthlyRiders.jan;

			riderData.forEach((d) => {
				if (riderData.indexOf(d) > month)
					d["Active Riders"] = riderData[0]["Active Riders"];
			});
		}

		if (month == 1) {
			monthlyRiders.feb = monthlyRiders.feb + 1;
			riderData[1]["Active Riders"] =
				riderData[0]["Active Riders"] + monthlyRiders.feb;

			riderData.forEach((d) => {
				if (riderData.indexOf(d) > month)
					d["Active Riders"] = riderData[1]["Active Riders"];
			});
		}

		if (month == 2) {
			monthlyRiders.mar = monthlyRiders.mar + 1;
			riderData[2]["Active Riders"] =
				riderData[1]["Active Riders"] + monthlyRiders.mar;

			riderData.forEach((d) => {
				if (riderData.indexOf(d) > month)
					d["Active Riders"] = riderData[2]["Active Riders"];
			});
		}

		if (month == 3) {
			monthlyRiders.apr = monthlyRiders.apr + 1;
			riderData[3]["Active Riders"] =
				riderData[2]["Active Riders"] + monthlyRiders.apr;

			riderData.forEach((d) => {
				if (riderData.indexOf(d) > month)
					d["Active Riders"] = riderData[3]["Active Riders"];
			});
		}

		if (month == 4) {
			monthlyRiders.may = monthlyRiders.may + 1;
			riderData[4]["Active Riders"] =
				riderData[3]["Active Riders"] + monthlyRiders.may;

			riderData.forEach((d) => {
				if (riderData.indexOf(d) > month)
					d["Active Riders"] = riderData[4]["Active Riders"];
			});
		}

		if (month == 5) {
			monthlyRiders.jun = monthlyRiders.jun + 1;
			riderData[5]["Active Riders"] =
				riderData[4]["Active Riders"] + monthlyRiders.jun;

			riderData.forEach((d) => {
				if (riderData.indexOf(d) > month)
					d["Active Riders"] = riderData[5]["Active Riders"];
			});
		}

		if (month == 6) {
			monthlyRiders.jul = monthlyRiders.jul + 1;
			riderData[6]["Active Riders"] =
				riderData[5]["Active Riders"] + monthlyRiders.jul;

			riderData.forEach((d) => {
				if (riderData.indexOf(d) > month)
					d["Active Riders"] = riderData[6]["Active Riders"];
			});
		}

		if (month == 7) {
			monthlyRiders.aug = monthlyRiders.aug + 1;
			riderData[7]["Active Riders"] =
				riderData[6]["Active Riders"] + monthlyRiders.aug;

			riderData.forEach((d) => {
				if (riderData.indexOf(d) > month)
					d["Active Riders"] = riderData[7]["Active Riders"];
			});
		}

		if (month == 8) {
			monthlyRiders.sep = monthlyRiders.sep + 1;
			riderData[8]["Active Riders"] =
				riderData[7]["Active Riders"] + monthlyRiders.sep;

			riderData.forEach((d) => {
				if (riderData.indexOf(d) > month)
					d["Active Riders"] = riderData[8]["Active Riders"];
			});
		}

		if (month == 9) {
			monthlyRiders.oct = monthlyRiders.oct + 1;
			riderData[9]["Active Riders"] =
				riderData[8]["Active Riders"] + monthlyRiders.oct;

			riderData.forEach((d) => {
				if (riderData.indexOf(d) > month)
					d["Active Riders"] = riderData[9]["Active Riders"];
			});
		}

		if (month == 10) {
			monthlyRiders.nov = monthlyRiders.nov + 1;
			riderData[10]["Active Riders"] =
				riderData[9]["Active Riders"] + monthlyRiders.nov;

			riderData.forEach((d) => {
				if (riderData.indexOf(d) > month)
					d["Active Riders"] = riderData[10]["Active Riders"];
			});
		}

		if (month == 11) {
			monthlyRiders.dec = monthlyRiders.dec + 1;
			riderData[11]["Active Riders"] =
				riderData[10]["Active Riders"] + monthlyRiders.dec;

			riderData.forEach((d) => {
				if (riderData.indexOf(d) > month)
					d["Active Riders"] = riderData[11]["Active Riders"];
			});
		}
	});

	return riderData;
};

export const SortedData = () => {
	const drivers = useSelector((state) => state.allDrivers.drivers);
	const riders = useSelector((state) => state.allRiders.riders);
	let sortedDrivers = [];
	drivers.forEach((d) => {
		if (d.created) {
			d.joiningDate = new Date(
				d.created._seconds * 1000 + d.created._nanoseconds / 1000000
			);
			sortedDrivers.push(d);
		}
	});
	sortedDrivers.sort((a, b) => {
		if (a.created && b.created) {
			return (
				new Date(b.created._seconds * 1000 + b.created._nanoseconds / 1000000) -
				new Date(a.created._seconds * 1000 + a.created._nanoseconds / 1000000)
			);
		}
	});

	let sortedRiders = [];
	riders.forEach((r) => {
		if (r.joined) {
			r.joiningDate = new Date(
				r.joined._seconds * 1000 + r.joined._nanoseconds / 1000000
			);
			sortedRiders.push(r);
		}
	});
	sortedRiders.sort((a, b) => {
		return (
			new Date(b.joined._seconds * 1000 + b.joined._nanoseconds / 1000000) -
			new Date(a.joined._seconds * 1000 + a.joined._nanoseconds / 1000000)
		);
	});

	const newMembers = [...sortedDrivers, ...sortedRiders];
	newMembers.sort((a, b) => {
		return b.joiningDate - a.joiningDate;
	});

	return newMembers;
};

export const productData = [
	{
		name: "Jan",
		Sales: 4000,
	},
	{
		name: "Feb",
		Sales: 3000,
	},
	{
		name: "Mar",
		Sales: 5000,
	},
];

export const dummydrivers = [
	{
		id: 1,
		username: "Jon Snow",
		avatar:
			"https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
		email: "jon@gmail.com",
		status: "active",
		rating: "5",
	},
	{
		id: 2,
		username: "Jon Snow",
		avatar:
			"https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
		email: "jon@gmail.com",
		status: "active",
		rating: "5",
	},
	{
		id: 3,
		username: "Jon Snow",
		avatar:
			"https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
		email: "jon@gmail.com",
		status: "active",
		rating: "5",
	},
	{
		id: 4,
		username: "Jon Snow",
		avatar:
			"https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
		email: "jon@gmail.com",
		status: "active",
		rating: "5",
	},
	{
		id: 5,
		username: "Jon Snow",
		avatar:
			"https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
		email: "jon@gmail.com",
		status: "active",
		rating: "5",
	},
	{
		id: 6,
		username: "Jon Snow",
		avatar:
			"https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
		email: "jon@gmail.com",
		status: "active",
		rating: "5",
	},
	{
		id: 7,
		username: "Jon Snow",
		avatar:
			"https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
		email: "jon@gmail.com",
		status: "active",
		rating: "5",
	},
	{
		id: 8,
		username: "Jon Snow",
		avatar:
			"https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
		email: "jon@gmail.com",
		status: "active",
		rating: "5",
	},
];

// const getDrivers = async () => {
//   var serverDrivers = [];
//   const res = await axios.get(API_URL);
//   console.log("response data", res);
//   const data = res.data;
//   console.log("data", data);
//   var count = 1;
//   data.forEach((d) => {
//     var driver = {
//       id: count++,
//       username: d.lname + " " + d.fname,
//       avatar:
//         "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//       email: d.email,
//       status: d.status,
//       rating: "5",
//     };
//     serverDrivers.push(driver);
//   });
//   drivers = [...serverDrivers];
//   console.log(drivers);
//   return drivers;
// };

// export const serverData = drivers;

export const productRows = [
	{
		id: 1,
		name: "Apple Airpods",
		img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
		stock: 123,
		status: "active",
		price: "$120.00",
	},
	{
		id: 2,
		name: "Apple Airpods",
		img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
		stock: 123,
		status: "active",
		price: "$120.00",
	},
	{
		id: 3,
		name: "Apple Airpods",
		img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
		stock: 123,
		status: "active",
		price: "$120.00",
	},
	{
		id: 4,
		name: "Apple Airpods",
		img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
		stock: 123,
		status: "active",
		price: "$120.00",
	},
	{
		id: 5,
		name: "Apple Airpods",
		img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
		stock: 123,
		status: "active",
		price: "$120.00",
	},
	{
		id: 6,
		name: "Apple Airpods",
		img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
		stock: 123,
		status: "active",
		price: "$120.00",
	},
	{
		id: 7,
		name: "Apple Airpods",
		img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
		stock: 123,
		status: "active",
		price: "$120.00",
	},
	{
		id: 8,
		name: "Apple Airpods",
		img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
		stock: 123,
		status: "active",
		price: "$120.00",
	},
	{
		id: 9,
		name: "Apple Airpods",
		img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
		stock: 123,
		status: "active",
		price: "$120.00",
	},
	{
		id: 10,
		name: "Apple Airpods",
		img: "https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
		stock: 123,
		status: "active",
		price: "$120.00",
	},
];

// export default TreatData;
