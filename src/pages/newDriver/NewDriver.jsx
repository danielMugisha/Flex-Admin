import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import AttachmentIcon from "@material-ui/icons/Attachment";
import "./newDriver.css";
import { useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import SearchLocation from "../../components/mapContainer/SearchLocation";
import { useLoadScript } from "@react-google-maps/api";
const admin = require("firebase-admin");

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: "97%",
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	input: {
		display: "none",
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const accountTypes = ["I AM A CAR OWNER", "I AM A DRIVER", "I DRIVE MY CAR"];
const URL = `${process.env.REACT_APP_API}/driver/register`;

export default function NewDriver() {
	const user = useSelector((state) => state.firebase.auth);

	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: `AIzaSyAJgkThrpvzmzSU7-7IYspebiELSdygtWk`,
		libraries: ["places"],
	});

	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const [address, setAddress] = useState({});

	const [lat, setLat] = useState(-1.9495199270072534);
	const [long, setLong] = useState(30.124528673106347);
	const [location, setLocation] = useState(
		new admin.firestore.GeoPoint(lat, long)
	);

	const [driver, setDriver] = useState({
		accountType: "",
		fname: "",
		lname: "",
		email: "",
		phone: "",
		address: "",
		gender: "",
		bdate: "",
		password: "",
		docs: { ID: "", drivingLicence: "", criminalRecord: "" },
		faceImage: "",
		status: "online",
		location: location,
	});

	const [Id, setId] = useState(null);
	const [drivingLicence, setDrivingLicence] = useState(null);
	const [criminalRecord, setCriminalRecord] = useState(null);
	const [image, setImage] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		console.log("=====================================>", name, value);
		setDriver({
			...driver,
			[name]: value,
		});
	};

	const handleIdUpload = (e) => {
		const file = e.target.files[0];
		setId(file);
		setDriver({
			...driver,
			docs: { ID: { name: file.name, type: file.type } },
		});
	};

	const handleDrivingLicenceUpload = (e) => {
		const file = e.target.files[0];
		setDrivingLicence(file);
		setDriver({
			...driver,
			docs: { drivingLicence: { name: file.name, type: file.type } },
		});
	};

	const handleCriminalRecordUpload = (e) => {
		const file = e.target.files[0];
		setCriminalRecord(file);
		setDriver({
			...driver,
			docs: { criminalRecord: { name: file.name, type: file.type } },
		});
	};

	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		setImage(file);
		setDriver({
			...driver,
			faceImage: { name: file.name, type: file.type },
		});
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = () => {
		console.log("submit driver", driver);

		const data = new FormData();

		data.append("driver", JSON.stringify(driver));
		data.append("nid", Id);
		data.append("licence", drivingLicence);
		data.append("record", criminalRecord);
		data.append("image", image);
		try {
			axios({
				method: "post",
				url: URL,
				data: data,
				headers: { "Content-Type": "multipart/form-data" },
			})
				.then(function (response) {
					console.log(response);
					setOpen(true);
				})
				.catch(function (response) {
					//handle error
					console.log(response);
					window.alert("something went wrong");
				});
		} catch (err) {
			console.log(err);
			window.log("something went wrong");
		}
	};

	useEffect(() => {
		console.log("=====================================>", address);
		setDriver({
			...driver,
			address: address,
		});
	}, [address]);

	if (!user.uid) return <Redirect to="login" />;
	return (
		<div className="newUser">
			<div className="formWrapperD">
				<h1 className="newUserTitle">Add a Driver</h1>

				<div className="driverForm" id="myForm">
					<FormControl variant="outlined" className={classes.formControl}>
						<TextField
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							onChange={handleChange}
							value={driver.accountType}
							label="Account Type"
							name="accountType"
							select
							variant="outlined"
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{accountTypes
								? accountTypes.map((c) => {
										return <MenuItem value={c}>{c}</MenuItem>;
								  })
								: ""}
						</TextField>
					</FormControl>
					<FormControl variant="outlined" className={classes.formControl}>
						<TextField
							labelId="demo-simple-select-outlined-label"
							id="filled-number"
							type="text"
							name="lname"
							value={driver.lname}
							onChange={handleChange}
							variant="outlined"
							label="Last Name"
						/>
					</FormControl>
					<FormControl variant="outlined" className={classes.formControl}>
						<TextField
							labelId="demo-simple-select-outlined-label"
							id="filled-number"
							type="text"
							name="fname"
							value={driver.fname}
							onChange={handleChange}
							variant="outlined"
							label="First Name"
						/>
					</FormControl>
					<FormControl variant="outlined" className={classes.formControl}>
						<TextField
							id="date"
							label="Birthday"
							type="date"
							name="bdate"
							value={driver.bdate}
							onChange={handleChange}
							defaultValue={new Date()}
							variant="outlined"
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</FormControl>
					<FormControl variant="outlined" className={classes.formControl}>
						<TextField
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							onChange={handleChange}
							value={driver.gender}
							label="Gender"
							name="gender"
							variant="outlined"
							select
						>
							<MenuItem value="">
								<em>Other</em>
							</MenuItem>
							<MenuItem value="Male">Male</MenuItem>
							<MenuItem value="Female">Female</MenuItem>
						</TextField>
					</FormControl>
					<FormControl variant="outlined" className={classes.formControl}>
						<TextField
							labelId="demo-simple-select-outlined-label"
							id="filled-number"
							type="text"
							name="email"
							value={driver.email}
							onChange={handleChange}
							variant="outlined"
							label="Email"
						/>
					</FormControl>
					<FormControl variant="outlined" className={classes.formControl}>
						<TextField
							labelId="demo-simple-select-outlined-label"
							id="filled-number"
							type="text"
							name="phone"
							value={driver.phone}
							onChange={handleChange}
							variant="outlined"
							label="Phone"
						/>
					</FormControl>
					<div className="inputGroup" style={{ margin: "8px " }}>
						<div className="destLabel">Address:</div>
						<div className="destInput">
							<SearchLocation setLocation={setAddress} />
						</div>
					</div>
					<div className={`${classes.formControl} fileUpload`}>
						<div>
							<input
								className={classes.input}
								id="uploadId"
								type="file"
								multiple={false}
								onChange={handleIdUpload}
							/>
							<label htmlFor="uploadId">
								<IconButton
									color="primary"
									aria-label="upload picture"
									component="span"
								>
									<AttachmentIcon />
								</IconButton>
								Attach ID / Passport
							</label>
						</div>
						<div className="filename">{Id ? Id.name : "no file"}</div>
					</div>
					<div className={`${classes.formControl} fileUpload`}>
						<div>
							<input
								className={classes.input}
								id="uploadLicence"
								type="file"
								multiple={false}
								onChange={handleDrivingLicenceUpload}
							/>
							<label htmlFor="uploadLicence">
								<IconButton
									color="primary"
									aria-label="upload picture"
									component="span"
								>
									<AttachmentIcon />
								</IconButton>
								Attach Driving Licence
							</label>
						</div>
						<div className="filename">
							{drivingLicence ? drivingLicence.name : "no file"}
						</div>
					</div>
					<div className={`${classes.formControl} fileUpload`}>
						<div>
							<input
								className={classes.input}
								id="uploadRecord"
								type="file"
								multiple={false}
								onChange={handleCriminalRecordUpload}
							/>
							<label htmlFor="uploadRecord">
								<IconButton
									color="primary"
									aria-label="upload picture"
									component="span"
								>
									<AttachmentIcon />
								</IconButton>
								Attach Criminal Record
							</label>
						</div>
						<div className="filename">
							{criminalRecord ? criminalRecord.name : "no file"}
						</div>
					</div>

					<div className={`${classes.formControl} fileUpload`}>
						<div>
							<input
								className={classes.input}
								id="uploadImage"
								type="file"
								accept={"image/*"}
								multiple={false}
								onChange={handleImageUpload}
							/>
							<label htmlFor="uploadImage">
								<IconButton
									color="primary"
									aria-label="upload picture"
									component="span"
								>
									<PhotoCamera />
								</IconButton>
								Face Picture
							</label>
						</div>
						<div className="filename">{image ? image.name : "no file"}</div>
					</div>
					{/* <div className={classes.formControl}>
						{img ? (
							<p style={{ fontWeight: "bold", margin: "0 12px" }}>{img.name}</p>
						) : (
							""
						)}
					</div> */}
					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit}
						className={classes.formControl}
					>
						Add Driver
					</Button>
					<Dialog
						open={open}
						TransitionComponent={Transition}
						keepMounted
						onClose={handleClose}
						aria-labelledby="alert-dialog-slide-title"
						aria-describedby="alert-dialog-slide-description"
					>
						<DialogTitle id="alert-dialog-slide-title">
							{"Action Completed"}
						</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-slide-description">
								Driver Created successfully!
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose} color="primary">
								Close
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			</div>
		</div>
	);
}
