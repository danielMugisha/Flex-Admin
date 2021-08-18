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

function App() {
	return (
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
	);
}

export default App;
