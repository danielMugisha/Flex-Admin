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
import "./rider.css";
import { Avatar } from "@material-ui/core";

export default function Rider() {
	const user = useSelector((state) => state.firebase.auth);
	const { allRiders } = useSelector((state) => state);
	const { allRequests } = useSelector((state) => state);

	const { riderId } = useParams();
	const rider = allRiders.riders.filter((rider) => rider.id == riderId)[0];

	const requests = allRequests.requests.filter(
		(request) => request.riderId == riderId
	);

	console.log("rider", rider);
	if (!user.uid) return <Redirect to="/login" />;
	return (
		<div className="user">
			<div className="userTitleContainer">
				<h1 className="userTitle">Rider Details</h1>
			</div>
			<div className="userContainer">
				<div className="userShow">
					<div className="userShowTop">
						{rider.avatar ? (
							<img src={rider.avatar} alt="avatar" className="userShowImg" />
						) : (
							<Avatar />
						)}
						<div className="userShowTopTitle">
							<span className="userShowUsername">
								{rider.lname} {rider.fname}
							</span>
							<span
								className="userShowUserTitle"
								style={{ textTransform: "lowercase" }}
							>
								{rider.accountType}
							</span>
						</div>
					</div>
					<div className="userShowBottom">
						<span className="userShowTitle">Personal Info</span>
						<div className="userShowInfo">
							<PermIdentity className="userShowIcon" />
							<span className="userShowInfoTitle">
								{rider.lname} {rider.fname}
							</span>
						</div>
						<div className="userShowInfo">
							<CalendarToday className="userShowIcon" />
							<span className="userShowInfoTitle">{rider.bdate}</span>
						</div>
						<span className="userShowTitle">Contact Details</span>
						<div className="userShowInfo">
							<PhoneAndroid className="userShowIcon" />
							<span className="userShowInfoTitle">{rider.phone}</span>
						</div>
						<div className="userShowInfo">
							<MailOutline className="userShowIcon" />
							<span className="userShowInfoTitle">{rider.email}</span>
						</div>
						<div className="userShowInfo">
							<LocationSearching className="userShowIcon" />
							<span className="userShowInfoTitle">{rider.address}</span>
						</div>
					</div>
				</div>
				<div className="userUpdate">
					<span className="userUpdateTitle">Details</span>
					<form className="userUpdateForm">
						<div className="userUpdateLeft">
							<div className="userUpdateItem">
								<span>Requests made:</span>
								<p>{rider.Requests}</p>
							</div>
							<div className="userUpdateItem">
								<span>Rides completed:</span>
								<p>{rider.Rides}</p>
							</div>
							<div className="userUpdateItem">
								<span>Client Group:</span>
								<p>Royal</p>
							</div>
							<div className="userUpdateItem">
								<span>Rating:</span>
								<p>✡ ✡ ✡ ✡ </p>
							</div>
						</div>
						{/* <div className="userUpdateRight">
							<div className="userUpdateUpload">
								<img
									className="userUpdateImg"
									src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
									alt=""
								/>
								<label htmlFor="file">
									<Publish className="userUpdateIcon" />
								</label>
								<input type="file" id="file" style={{ display: "none" }} />
							</div>
							<button className="userUpdateButton">Update</button>
						</div> */}
					</form>
				</div>
			</div>
		</div>
	);
}
