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
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router";
const admin = require("firebase-admin");

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 400,
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
const URL = "https://flexgo-backend.herokuapp.com/api/car/add";

export default function NewDriver() {
	const user = useSelector((state) => state.firebase.auth);

	const drivers = useSelector((state) => state.allDrivers.drivers);
	const categories = useSelector((state) => state.allCategories.categories);
	const classes = useStyles();
	const [subCategories, setSubCategories] = useState("");

	const [countries, setCountries] = useState([]);
	const [cities, setCities] = useState([]);
	const [lat, setLat] = useState(0);
	const [long, setLong] = useState(0);
	const [location, setLocation] = useState(
		new admin.firestore.GeoPoint(lat, long)
	);

	const initialValues = {
		accountType: "",
		fname: "",
		lname: "",
		email: "",
		phone: "",
		address: { country: "", city: "" },
		gender: "",
		bdate: "",
		password: "",
		docs: { nid: null, drivingLicence: null, criminalRecord: null },
		faceImage: [],
		status: "online",
		location: location,
	};

	let documents = {};
	let imgs = [];

	const [driver, setDriver] = useState(initialValues);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setDriver({
			...driver,
			[name]: value,
		});
	};

	const [addressRaw, setAddressRaw] = useState({
		country: "",
		city: "",
	});

	const handleChangeAddress = (e) => {
		const { name, value } = e.target;
		setAddressRaw({
			...addressRaw,
			[name]: value,
		});
	};

	useEffect(() => {
		setDriver({
			...driver,
			address: addressRaw,
		});
	}, [addressRaw]);

	const handleFileUpload = (e) => {
		const { id, files } = e.target;
		if (id == "uploadFile") {
			documents.push(files[0]);
			setDriver({
				...driver,
				docs: documents,
			});
		} else if (id == "uploadImage") {
			imgs.push(files[0]);
			setDriver({
				...driver,
				images: imgs,
			});
		}
	};

	const handleSubmit = () => {
		// try {
		// 	axios({
		// 		method: "post",
		// 		url: URL,
		// 		data: car,
		// 		headers: { "Content-Type": "application/json" },
		// 	})
		// 		.then(function (response) {
		// 			//handle success
		// 			console.log(response);
		// 			document.getElementById("myForm").reset();
		// 			window.alert("car added");
		// 		})
		// 		.catch(function (response) {
		// 			//handle error
		// 			console.log(response);
		// 			window.alert("something went wrong");
		// 		});
		// } catch (err) {
		// 	console.log(err);
		// 	window.log("something went wrong");
		//		}
	};

	useEffect(() => {}, []);

	if (!user.uid) return <Redirect to="login" />;
	return (
		<div className="newUser">
			<h1 className="newUserTitle">Add a Driver</h1>
			<div className="formWrapper">
				<div className="form" id="myForm">
					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-outlined-label">
							Account Type
						</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							onChange={handleChange}
							value={driver.accountType}
							name="category"
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{accountTypes
								? accountTypes.map((c) => {
										return <MenuItem value={c}>{c}</MenuItem>;
								  })
								: ""}
						</Select>
					</FormControl>
					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-outlined-label">
							Full Names
						</InputLabel>
						<TextField
							labelId="demo-simple-select-outlined-label"
							id="filled-number"
							type="text"
							name="names"
							value={driver.names}
							onChange={handleChange}
							variant="outlined"
						/>
					</FormControl>
					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-outlined-label">
							Email
						</InputLabel>
						<TextField
							labelId="demo-simple-select-outlined-label"
							id="filled-number"
							type="text"
							name="email"
							value={driver.email}
							onChange={handleChange}
							variant="outlined"
						/>
					</FormControl>
					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-outlined-label">
							Phone
						</InputLabel>
						<TextField
							labelId="demo-simple-select-outlined-label"
							id="filled-number"
							type="text"
							name="Phone"
							value={driver.phone}
							onChange={handleChange}
							variant="outlined"
						/>
					</FormControl>
					Address
					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-outlined-label">
							Country
						</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							onChange={handleChangeAddress}
							value={driver.address.country}
							name="province"
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{countries
								? countries.map((c) => {
										return <MenuItem value={c}>{c}</MenuItem>;
								  })
								: ""}
						</Select>
					</FormControl>
					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							onChange={handleChangeAddress}
							value={driver.address.city}
							name="district"
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{cities?.map((c) => {
								return <MenuItem value={c}>{c}</MenuItem>;
							})}
						</Select>
					</FormControl>
					<div className="fileUploadField">
						<input
							className={classes.input}
							id="uploadFile"
							type="file"
							multiple={false}
							onChange={handleFileUpload}
						/>
						<label htmlFor="uploadFile">
							{documents.length > 0
								? documents.map((d) => {
										return d.name;
								  })
								: "Documents"}
							<IconButton
								color="primary"
								aria-label="upload picture"
								component="span"
							>
								<AttachmentIcon />
							</IconButton>
						</label>
					</div>
					<div className="fileUploadField">
						<input
							className={classes.input}
							id="uploadImage"
							type="file"
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
					<Button variant="contained" color="primary" onClick={handleSubmit}>
						add a Car
					</Button>
				</div>
			</div>
		</div>
	);
}
