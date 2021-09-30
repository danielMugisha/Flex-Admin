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

import { signOut } from "../../store/actions/authActions";

import { GiSteeringWheel } from "react-icons/gi";
import { RiTaxiWifiFill } from "react-icons/ri";

export default function Sidebar() {
	const { profile } = useSelector((state) => state.firebase);
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(signOut());
	};

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

								<Link to="/trips" className="link">
									<li className="sidebarListItem">
										<RiTaxiWifiFill className="sidebarIcon" />
										Trips
									</li>
								</Link>

								<Link to="/reports" className="link">
									<li className="sidebarListItem">
										<BarChart className="sidebarIcon" />
										Reports
									</li>
								</Link>
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
