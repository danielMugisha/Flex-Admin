import {
	CalendarToday,
	LocationSearching,
	MailOutline,
	PermIdentity,
	PhoneAndroid,
	Publish,
} from "@material-ui/icons";
import { useSelector } from "react-redux";
import { Link, useParams, Redirect } from "react-router-dom";
import "./driver.css";
import { Avatar } from "@material-ui/core";
import LocalTaxiOutlinedIcon from "@material-ui/icons/LocalTaxiOutlined";

export default function Driver() {
	const user = useSelector((state) => state.firebase.auth);
	const { allDrivers } = useSelector((state) => state);
	const { allRequests } = useSelector((state) => state);

	const { driverId } = useParams();
	const driver = allDrivers.drivers.filter(
		(driver) => driver.id == driverId
	)[0];

	const requests = allRequests.requests.filter(
		(request) => request.driverId == driverId
	);

	console.log("driver", driver);
	if (!user.uid) return <Redirect to="/login" />;
	return (
		<div className="user">
			<div className="userTitleContainer">
				<h1 className="userTitle">Driver Details</h1>
			</div>
			<div className="userContainer">
				<div className="userShow">
					<div className="userShowTop">
						{driver.avatar ? (
							<img src={driver.avatar} alt="avatar" className="userShowImg" />
						) : (
							<Avatar />
						)}
						<div className="userShowTopTitle">
							<span className="userShowUsername">
								{driver.lname} {driver.fname}
							</span>
							<span
								className="userShowUserTitle"
								style={{ textTransform: "lowercase" }}
							>
								{driver.accountType}
							</span>
						</div>
					</div>
					<div className="userShowBottom">
						<span className="userShowTitle">Personal Info</span>
						<div className="userShowInfo">
							<PermIdentity className="userShowIcon" />
							<span className="userShowInfoTitle">
								{driver.lname} {driver.fname}
							</span>
						</div>
						<div className="userShowInfo">
							<CalendarToday className="userShowIcon" />
							<span className="userShowInfoTitle">{driver.bdate}</span>
						</div>
						<span className="userShowTitle">Contact Details</span>
						<div className="userShowInfo">
							<PhoneAndroid className="userShowIcon" />
							<span className="userShowInfoTitle">{driver.phone}</span>
						</div>
						<div className="userShowInfo">
							<MailOutline className="userShowIcon" />
							<span className="userShowInfoTitle">{driver.email}</span>
						</div>
						<div className="userShowInfo">
							<LocationSearching className="userShowIcon" />
							<span className="userShowInfoTitle">{driver.address}</span>
						</div>
					</div>
				</div>
				<div className="userUpdate">
					<span className="userUpdateTitle">Details</span>
					<form className="userUpdateForm">
						<div className="userUpdateLeft">
							<div className="userUpdateItem">
								<span>Requests received:</span>
								<p>{requests.length}</p>
							</div>
							<div className="userUpdateItem">
								<span>Rides completed:</span>
								<p>0</p>
							</div>
							<div className="userUpdateItem">
								<span>Car:</span>
								<p>RAE 456 T</p>
							</div>
							<div className="userUpdateItem">
								<span>Rating:</span>
								<p>✡ ✡ ✡ ✡ ✡ </p>
							</div>
							<div className="userUpdateItem">
								<span>Status:</span>
								<p>{driver.status}</p>
							</div>
						</div>
						<div className="userUpdateRight">
							<div className="userUpdateUpload">
								<LocalTaxiOutlinedIcon
									style={{ width: "200", height: "200" }}
								/>
							</div>
							<button className="userUpdateButton">Assign a new car</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
