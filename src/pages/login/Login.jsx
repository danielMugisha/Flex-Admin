import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "./login.css";
import logo from "../../assets/img/logo1.png";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { Redirect } from "react-router";
import Alert from "@material-ui/lab/Alert";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://material-ui.com/">
				Flex Go
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		backgroundColor: "#0289b2",
	},
}));

export default function SignIn() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { auth } = useSelector((state) => state);
	const user = useSelector((state) => state.firebase.auth);
	const role = useSelector((state) => state.firebase.profile.role);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleChange = (e) => {
		if (e.target.id == "email") {
			setEmail(e.target.value);
		} else if (e.target.id == "password") {
			setPassword(e.target.value);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(signIn({ email, password }));
	};

	if (user.uid) {
		if (role == "admin") return <Redirect to="/" />;
		if (role == "help-desk") return <Redirect to="/helpdesk" />;
	}
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<div className="logoDiv">
					<img className="logoBrand" src={logo} alt="logo" />
					<span className="logo">FlexGo</span>
				</div>

				<Typography component="h1" variant="h5" className="title">
					Sign in
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						onChange={handleChange}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={handleChange}
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
							</Link>
						</Grid>
					</Grid>
				</form>
				<div>
					{auth.authError ? (
						<Alert severity="error">{auth.authError}</Alert>
					) : null}
				</div>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}
