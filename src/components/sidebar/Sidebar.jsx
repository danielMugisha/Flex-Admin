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
import { setRequests } from "../../store/actions/requestsActions";
import { setUsers } from "../../store/actions/userActions";
import { GiSteeringWheel } from "react-icons/gi";
import { RiTaxiWifiFill } from "react-icons/ri";

export default function Sidebar() {
	const DRIVERS_URL = `${process.env.REACT_APP_API}/drivers`;
	const USERS_URL = `${process.env.REACT_APP_API}/users`;
	const CATS_URL = `${process.env.REACT_APP_API}/car/categories`;
	const CARS_URL = `${process.env.REACT_APP_API}/cars`;
	const RIDERS_URL = `${process.env.REACT_APP_API}/riders`;
	const REQUESTS_URL = `${process.env.REACT_APP_API}/rideRequests`;
	const state = useSelector((state) => state);
	const user = state.firebase.auth;
	const profile = state.firebase.profile;

	const dispatch = useDispatch();

	const fetchUsers = async () => {
		const response = await axios.get(USERS_URL).catch((err) => {
			console.log(err);
		});
		dispatch(setUsers(response.data));
	};

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

	const fetchRequests = async () => {
		const response = await axios.get(REQUESTS_URL).catch((err) => {
			console.log(err);
		});
		dispatch(setRequests(response.data));
	};

	const handleLogout = () => {
		dispatch(signOut());
	};

	useEffect(() => {
		fetchDrivers();
		fetchCategories();
		fetchRiders();
		fetchCars();
		fetchRequests();
		fetchUsers();
	}, []);

	return (
		<div className="sidebar">
			<div className="sidebarWrapper">
				{profile?.role == "admin" ? (
					<>
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
										<GiSteeringWheel className="sidebarIcon" />
										Drivers
									</li>
								</Link>
								<Link to="/riders" className="link">
									<li className="sidebarListItem">
										<PermIdentity className="sidebarIcon" />
										Customers
									</li>
								</Link>
								<Link to="/users" className="link">
									<li className="sidebarListItem">
										<PermIdentity className="sidebarIcon" />
										Users
									</li>
								</Link>
								<Link to="/requests" className="link">
									<li className="sidebarListItem">
										<RiTaxiWifiFill className="sidebarIcon" />
										Trip Requests
									</li>
								</Link>
								{/********************  to be made links ************************/}
								<li className="sidebarListItem">
									<RiTaxiWifiFill className="sidebarIcon" />
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
					</>
				) : null}
				{profile?.role == "help-desk" ? (
					<>
						<div className="sidebarMenu">
							<h3 className="sidebarTitle">Help Desk</h3>
							<ul className="sidebarList">
								<Link to="/helpdesk" className="link">
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
								<Link to="/helpdesk" className="link">
									<li className="sidebarListItem">
										<PermIdentity className="sidebarIcon" />
										My Requests
									</li>
								</Link>
								<Link to="/helpdesk" className="link">
									<li className="sidebarListItem">
										<PermIdentity className="sidebarIcon" />
										My Report
									</li>
								</Link>
							</ul>
						</div>
					</>
				) : null}
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
