import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DriverList from "./pages/driverList/DriverList";
//import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import RiderList from "./pages/riderList/RiderList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import CarList from "./pages/carList/carList";
import NewCar from "./pages/newCar/NewCar";
import CarCategory from "./pages/carCategory/CarCategory";
import Login from "./pages/login/Login";

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
							<Route path="/drivers">
								<DriverList />
							</Route>
							<Route path="/newUser">
								<NewUser />
							</Route>
							<Route path="/riders">
								<RiderList />
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
