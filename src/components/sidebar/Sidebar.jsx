import "./sidebar.css";
import {
	LineStyle,
	PermIdentity,
	AttachMoney,
	BarChart,
	WorkOutline,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setDrivers } from "../../store/actions/driverActions";
import { setCategories } from "../../store/actions/categoryActions";
import { setRiders } from "../../store/actions/riderActions";
import { setCars } from "../../store/actions/carsActions";
import { signOut } from "../../store/actions/authActions";

export default function Sidebar() {
	const DRIVERS_URL = "https://flexgo-backend.herokuapp.com/api/drivers";
	const CATS_URL = "https://flexgo-backend.herokuapp.com/api/car/categories";
	const CARS_URL = "https://flexgo-backend.herokuapp.com/api/cars";
	const RIDERS_URL = "https://flexgo-backend.herokuapp.com/api/riders";

	const dispatch = useDispatch();

	const fetchDrivers = async () => {
		const response = await axios.get(DRIVERS_URL).catch((err) => {
			console.log(err);
		});
		dispatch(setDrivers(response.data));
	};

	const fetchRiders = async () => {
		const response = await axios.get(RIDERS_URL).catch((err) => {
			console.log(err);
		});
		dispatch(setRiders(response.data));
	};

	const fetchCategories = async () => {
		const response = await axios.get(CATS_URL).catch((err) => {
			console.log(err);
		});
		dispatch(setCategories(response.data));
	};

	const fetchCars = async () => {
		const response = await axios.get(CARS_URL).catch((err) => {
			console.log(err);
		});
		dispatch(setCars(response.data));
	};

	const handleLogout = () => {
		dispatch(signOut());
	};

	useEffect(() => {
		fetchDrivers();
		fetchCategories();
		fetchRiders();
		fetchCars();
	}, []);

	return (
		<div className="sidebar">
			<div className="sidebarWrapper">
				<div className="sidebarMenu">
					<h3 className="sidebarTitle">Dashboard</h3>
					<ul className="sidebarList">
						<Link to="/" className="link">
							<li className="sidebarListItem active">
								<LineStyle className="sidebarIcon" />
								Home
							</li>
						</Link>
					</ul>
				</div>
				<div className="sidebarMenu">
					<h3 className="sidebarTitle">Quick Menu</h3>
					<ul className="sidebarList">
						<Link to="/drivers" className="link">
							<li className="sidebarListItem">
								<PermIdentity className="sidebarIcon" />
								Drivers
							</li>
						</Link>
						<Link to="/riders" className="link">
							<li className="sidebarListItem">
								<PermIdentity className="sidebarIcon" />
								Riders
							</li>
						</Link>
						{/********************  to be made links ************************/}
						<li className="sidebarListItem">
							<AttachMoney className="sidebarIcon" />
							Ride Requests
						</li>
						<li className="sidebarListItem">
							<AttachMoney className="sidebarIcon" />
							Trips
						</li>
						<li className="sidebarListItem">
							<BarChart className="sidebarIcon" />
							Reports
						</li>
					</ul>
				</div>
				<div className="sidebarMenu">
					<h3 className="sidebarTitle">Staff</h3>
					<ul className="sidebarList">
						<Link to="/cars" className="link">
							<li className="sidebarListItem">
								<WorkOutline className="sidebarIcon" />
								Manage Cars
							</li>
						</Link>
					</ul>
				</div>
				<div className="sidebarMenu">
					<ul className="sidebarList">
						<li>
							<a onClick={handleLogout}>Logout</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
