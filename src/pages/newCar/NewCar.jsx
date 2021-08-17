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
import "./newCar.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router";

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

const serviceCategories = ["PICK ME UP", "VIP", "CARGO"];
const URL = `${process.env.REACT_APP_API}/car/add`;

export default function NewCar() {
	const user = useSelector((state) => state.firebase.auth);

	const drivers = useSelector((state) => state.allDrivers.drivers);
	const categories = useSelector((state) => state.allCategories.categories);
	const classes = useStyles();
	const [subCategories, setSubCategories] = useState("");

	const initialValues = {
		category: "",
		subCategory: "",
		seats: 0,
		serviceCategory: "",
		comments: "",
		docs: [],
		images: [],
		pNumber: "",
	};

	var documents = [];
	var imgs = [];

	const [car, setCar] = useState(initialValues);

	const handleChange = (e) => {
		const { name, value } = e.target;
		console.log("name and value:", name, value);
		setCar({
			...car,
			[name]: value,
		});
	};

	const handleFileUpload = (e) => {
		const { id, files } = e.target;
		if (id === "uploadFile") {
			documents.push(files[0]);
			setCar({
				...car,
				docs: documents,
			});
		} else if (id === "uploadImage") {
			imgs.push(files[0]);
			setCar({
				...car,
				images: imgs,
			});
		}
	};

	const handleSubmit = () => {
		try {
			axios({
				method: "post",
				url: URL,
				data: car,
				headers: { "Content-Type": "application/json" },
			})
				.then(function (response) {
					//handle success
					console.log(response);
					window.alert("car added");
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
		const subs = categories.filter((c) => c.categoryName === car.category);
		if (subs.length > 0) setSubCategories(subs[0].subCategories);
	}, [car.category]);

	if (!user.uid) return <Redirect to="login" />;
	return (
		<div className="newUser">
			<h1 className="newUserTitle">Add New Car</h1>
			<div className="formWrapper">
				<div className="form" id="myForm">
					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-outlined-label">
							Category
						</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							onChange={handleChange}
							value={car.category}
							name="category"
							label="category"
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{categories
								? categories.map((c) => {
										return (
											<MenuItem value={c.categoryName}>
												{c.categoryName}
											</MenuItem>
										);
								  })
								: ""}
						</Select>
					</FormControl>
					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-outlined-label">
							Sub Category
						</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							onChange={handleChange}
							value={car.subCategory}
							name="subCategory"
							label="subCategory"
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{subCategories
								? subCategories.map((c) => {
										return <MenuItem value={c}>{c}</MenuItem>;
								  })
								: ""}
						</Select>
					</FormControl>
					<TextField
						className={classes.formControl}
						labelId="demo-simple-select-outlined-label"
						id="filled-number"
						label="Seats"
						type="number"
						name="seats"
						onChange={handleChange}
						InputLabelProps={{
							shrink: true,
						}}
						variant="outlined"
					/>
					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-outlined-label">
							Service Category
						</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							onChange={handleChange}
							value={car.serviceCategory}
							name="serviceCategory"
							label="serviceCategory"
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{serviceCategories.map((s) => {
								return <MenuItem value={s}>{s}</MenuItem>;
							})}
						</Select>
					</FormControl>
					<TextField
						className={classes.formControl}
						labelId="demo-simple-select-outlined-label"
						id="filled-number"
						label="Plate Number"
						type="text"
						name="pNumber"
						onChange={handleChange}
						InputLabelProps={{
							shrink: true,
						}}
						variant="outlined"
					/>

					<TextField
						className={classes.formControl}
						id="outlined-multiline-static"
						label="Comments About The Car"
						name="comments"
						value={car.comments}
						multiline
						rows={4}
						variant="outlined"
						onChange={handleChange}
					/>
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
