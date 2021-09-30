import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DriverList from "./pages/driverList/DriverList";
import RiderList from "./pages/riderList/RiderList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import CarList from "./pages/carList/carList";
import NewCar from "./pages/newCar/NewCar";
import CarCategory from "./pages/carCategory/CarCategory";
import Login from "./pages/login/Login";
import HelpDesk from "./pages/helpDesk/home/HelpDesk";
import Driver from "./pages/driver/Driver";
import NewDriver from "./pages/newDriver/NewDriver";
import Rider from "./pages/rider/Rider";
import UsersList from "./pages/dispatchers/UsersList";
import RequestList from "./pages/requests/RequestList";
import Reports from "./pages/reports/Reports";
import TripsList from "./pages/trips/tripsList";
import axios from "axios";
import { setDrivers } from "./store/actions/driverActions";
import { setCategories } from "./store/actions/categoryActions";
import { setRiders } from "./store/actions/riderActions";
import { setCars } from "./store/actions/carsActions";
import { setRequests } from "./store/actions/requestsActions";
import { setUsers } from "./store/actions/userActions";

function App() {
	const DRIVERS_URL = `${process.env.REACT_APP_API}/drivers`;
	const USERS_URL = `${process.env.REACT_APP_API}/users`;
	const CATS_URL = `${process.env.REACT_APP_API}/car/categories`;
	const CARS_URL = `${process.env.REACT_APP_API}/cars`;
	const RIDERS_URL = `${process.env.REACT_APP_API}/riders`;
	const REQUESTS_URL = `${process.env.REACT_APP_API}/rideRequests`;

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

	useEffect(() => {
		fetchDrivers();
		fetchCategories();
		fetchRiders();
		fetchCars();
		fetchRequests();
		fetchUsers();
	}, []);
	return (
		<div>
			<Router>
				<Topbar />
				<Switch>
					<Route path="/login">
						<Login />
					</Route>
					<div className="container">
						<div className="sideMenu">
							<Sidebar />
						</div>
						<div className="main">
							<Switch>
								<Route exact path="/">
									<Home />
								</Route>
								<Route exact path="/helpdesk">
									<HelpDesk />
								</Route>
								<Route path="/drivers">
									<DriverList />
								</Route>
								<Route path="/newDriver">
									<NewDriver />
								</Route>
								<Route path="/riders">
									<RiderList />
								</Route>
								<Route path="/users">
									<UsersList />
								</Route>
								<Route path="/requests">
									<RequestList />
								</Route>
								<Route path="/reports">
									<Reports />
								</Route>
								<Route path="/trips">
									<TripsList />
								</Route>
								<Route path="/driver/:driverId">
									<Driver />
								</Route>
								<Route path="/rider/:riderId">
									<Rider />
								</Route>
								<Route path="/product/:productId">
									<Product />
								</Route>
								<Route path="/newproduct">
									<NewProduct />
								</Route>
								<Route path="/cars">
									<CarList />
								</Route>
								<Route path="/carCategory">
									<CarCategory />
								</Route>
								<Route path="/newCar">
									<NewCar />
								</Route>
							</Switch>
						</div>
					</div>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
