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

const accountTypes = ["I AM A CAR OWNER", "I AM A DRIVER", "I DRIVE MY CAR"];
const URL = `http://localhost:8080/api/driver/register`;

export default function NewDriver() {
	const user = useSelector((state) => state.firebase.auth);

	const drivers = useSelector((state) => state.allDrivers.drivers);
	const categories = useSelector((state) => state.allCategories.categories);
	const classes = useStyles();
	const [subCategories, setSubCategories] = useState("");

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
		docs: [],
		images: [],
		status: "online",
		location: location,
	});

	const [doc, setDoc] = useState(null);
	const [img, setImg] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		console.log("=====================================>", name, value);
		setDriver({
			...driver,
			[name]: value,
		});
	};

	const [, updateState] = useState();
	const forceUpdate = useCallback(() => updateState({}), []);

	const handleFileUpload = (e) => {
		const { id, files } = e.target;
		if (id === "uploadFile") {
			setDoc(files[0]);
			setDriver({
				...driver,
				docs: doc,
			});
		} else if (id == "uploadImage") {
			setImg(files[0]);
			setDriver({
				...driver,
				images: img,
			});
		}
	};

	const handleSubmit = () => {
		console.log("submit driver", driver);
		try {
			axios({
				method: "post",
				url: URL,
				data: driver,
				headers: { "Content-Type": "multipart/form-data" },
			})
				.then(function (response) {
					//handle success
					console.log(response);
					// document.getElementById("myForm").reset();
					// window.alert("car added");
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

	useEffect(() => {}, []);

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
					<FormControl variant="outlined" className={classes.formControl}>
						<TextField
							labelId="demo-simple-select-outlined-label"
							id="filled-number"
							type="text"
							name="address"
							value={driver.address}
							onChange={handleChange}
							variant="outlined"
							label="Address"
						/>
					</FormControl>
					<div className="fileUploadField">
						<input
							className={classes.input}
							id="uploadFile"
							type="file"
							multiple
							onChange={handleFileUpload}
						/>
						<label htmlFor="uploadFile">
							Documents
							<IconButton
								color="primary"
								aria-label="upload picture"
								component="span"
							>
								<AttachmentIcon />
							</IconButton>
						</label>
					</div>
					<div className={classes.formControl}>
						{doc ? (
							<p style={{ fontWeight: "bold", margin: "0 12px" }}>{doc.name}</p>
						) : (
							""
						)}
					</div>
					<div className="fileUploadField">
						<input
							className={classes.input}
							id="uploadImage"
							type="file"
							accept={"image/*"}
							multiple={false}
							onChange={handleFileUpload}
						/>
						<label htmlFor="uploadImage">
							Front Picture
							<IconButton
								color="primary"
								aria-label="upload picture"
								component="span"
							>
								<PhotoCamera />
							</IconButton>
						</label>
					</div>
					<div className={classes.formControl}>
						{img ? (
							<p style={{ fontWeight: "bold", margin: "0 12px" }}>{img.name}</p>
						) : (
							""
						)}
					</div>
					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit}
						className="submitButton"
					>
						Add Driver
					</Button>
				</div>
			</div>
		</div>
	);
}
