import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import logo from "../../assets/img/logo1.png";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../store/actions/authActions";

const Topbar = () => {
	const state = useSelector((state) => state);
	const user = state.firebase.auth;
	const profile = state.firebase.profile;
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(signOut());
	};
	return (
		<div className="topbar">
			<div className="topbarWrapper">
				<div className="topLeft">
					<img className="logoBrand" src={logo} alt="logo" />
					<span className="logo">FlexGo</span>
				</div>
				<div className="topRight">
					{user.uid ? (
						<>
							<div className="topbarIconContainer">{profile.firstName}</div>
							<div className="topbarIconContainer">{profile.lastName}</div>

							<img
								src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
								alt=""
								className="topAvatar"
							/>
							<div className="topbarIconContainer">
								<button onClick={handleLogout}>Logout</button>
							</div>
						</>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
};

export default Topbar;
