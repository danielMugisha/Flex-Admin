import React, { useEffect, useState, useCallback } from "react";
import "./mapContainer.css";
import {
	GoogleMap,
	useLoadScript,
	Marker,
	InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import mapStyles from "./mapStyles";
import { useSelector } from "react-redux";
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from "use-places-autocomplete";
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {
	TextField,
	Dialog,
	Grid,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	MenuItem,
	Checkbox,
	FormControlLabel,
} from "@material-ui/core";

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import AddIcon from "@material-ui/icons/Add";

//const libraries = ["places"];
const mapContainerStyle = {
	width: "100%",
	height: "100vh",
	position: "relative",
};
const center = { lat: -1.9397, lng: 30.0557 };
const options = {
	styles: mapStyles,
	disableDefaultUI: true,
	zoomControl: true,
};

const categories = ["Pick Me Up", "Corporate"];
const tripTypes = ["Single", "Multiple", "Rent"];

function MapContainer() {
	const { drivers } = useSelector((state) => state.allDrivers);
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: "AIzaSyAJgkThrpvzmzSU7-7IYspebiELSdygtWk",
		libraries: ["places"],
	});
	const [selectedDriver, setSelectedDriver] = useState(null);

	const riderLabel = <p style={{ fontWeight: "bold" }}>Rider</p>;
	const [open, setOpen] = useState(false);

	const [, updateState] = useState();
	const forceUpdate = useCallback(() => updateState({}), []);

	const [otherDestination, setOtherDestination] = useState();
	const [rider, setRider] = useState({ name: "", location: {} });

	const URL = "https://flexgo-backend.herokuapp.com/api/rideRequest";
	const [orderedDrivers, setOrderedDrivers] = useState([]);
	const [nearestDriver, setNearestDriver] = useState();
	const [destination, setDestination] = useState({});
	const [returnTrip, setReturnTrip] = useState({
		isReturn: true,
		returnTime: "2017-05-24T12:30",
	});
	const [isCoRiding, setIsCoRiding] = useState(false);
	const [sameDestination, setSameDestination] = useState(true);
	const [destinations, setDestinations] = useState([]);
	const [numberOfCoRiders, setNumberOfCoRiders] = useState(0);
	const [coRiding, setCoRiding] = useState({});

	const [request, setRequest] = useState({
		category: "",
		tripType: "",
		location: rider,
		destination: destination,
		departureTime: "2017-05-24T10:30",
		returnTrip: returnTrip,
		coRiding: coRiding,
	});

	useEffect(() => {
		setRequest({ ...request, return: returnTrip });
	}, [returnTrip]);

	useEffect(() => {
		setCoRiding({ ...coRiding, isCoRiding: isCoRiding });
	}, [isCoRiding]);
	useEffect(() => {
		setCoRiding({ ...coRiding, number: numberOfCoRiders });
	}, [numberOfCoRiders]);
	useEffect(() => {
		setCoRiding({ ...coRiding, destinations: destinations });
	}, [destinations]);

	useEffect(() => {
		setRequest({ ...request, coRiding: coRiding });
	}, [coRiding]);

	useEffect(() => {
		setRequest({ ...request, location: rider });
	}, [rider]);

	useEffect(() => {
		setRequest({ ...request, destination: destination });
	}, [destination]);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setRequest({
			...request,
			[name]: value,
		});
	};

	const handeIsReturn = (e) => {
		setReturnTrip({
			...returnTrip,
			isReturn: e.target.checked,
		});
	};

	const addDestination = () => {
		setDestinations([...destinations, otherDestination]);
	};

	const handleIsCoRiding = (e) => {
		setIsCoRiding(e.target.checked);
	};

	const handleSameDestination = (e) => {
		setSameDestination(e.target.checked);
	};

	const handleNumberOfCoRiders = (e) => {
		setNumberOfCoRiders(e.target.value);
	};

	const handleReturnTime = (e) => {
		setReturnTrip({
			...returnTrip,
			returnTime: e.target.value,
		});
	};

	useEffect(() => {
		if (nearestDriver) {
			const timer = setTimeout(() => {
				setNearestDriver(null);
				setRider(null);
				forceUpdate();
			}, 1000 * 30);
			return () => clearTimeout(timer);
		}
	}, [nearestDriver]);

	const handleSubmit = () => {
		console.log("request here", request);

		let headers = new Headers();

		headers.append("Content-Type", "application/json");
		headers.append("Accept", "application/json");

		headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
		headers.append("Access-Control-Allow-Credentials", "true");

		headers.append("GET", "POST", "OPTIONS");

		try {
			axios({
				method: "post",
				url: URL,
				data: request,
				headers: headers,
			})
				.then(function (response) {
					setOrderedDrivers(response.data);
					setTimeout(setNearestDriver(null), 1.0 * 1000);
					setOpen(false);
				})
				.catch(function (response) {
					//handle error
					console.log(response);
					//setOpen(false);
				});
		} catch (err) {
			console.log(err);
			window.log("something went wrong");
		}
	};

	const handleMarkerClick = (driver) => {
		setSelectedDriver(driver);
	};

	useEffect(() => {
		setNearestDriver(orderedDrivers[0]);
	}, [orderedDrivers]);

	const mapRef = React.useRef();
	const onMapLoad = useCallback((map) => {
		mapRef.current = map;
	}, []);

	const panTo = useCallback(({ lat, lng }) => {
		mapRef.current.panTo({ lat, lng });
		mapRef.current.setZoom(15);
	}, []);

	const myLabel = (
		<div style={{ display: "flex", border: "1px solid blue", flexGrow: "2" }}>
			<div>
				<hr />
			</div>
			<div>Return Trip</div>
		</div>
	);
	if (loadError) return "Error Loading";
	if (!isLoaded) return "Map Loading";

	return (
		<div className="helpDesk">
			<div className="mapContainer">
				{open ? <div className="overlay"></div> : null}
				<GoogleMap
					mapContainerStyle={mapContainerStyle}
					zoom={14}
					center={center}
					options={options}
					onLoad={onMapLoad}
				>
					<SearchPickUpLocation
						panTo={panTo}
						setRider={setRider}
						forceUpdate={forceUpdate}
					/>
					{drivers?.map((driver) => {
						if (nearestDriver) {
							if (driver.id === nearestDriver?.id)
								return (
									<Marker
										value={driver}
										key={driver.id}
										position={{
											lat: parseFloat(driver.location._latitude),
											lng: parseFloat(driver.location._longitude),
										}}
										icon={{
											url: "/greenTaxi.png",
											scaledSize: new window.google.maps.Size(30, 30),
											origin: new window.google.maps.Point(0, 0),
											anchor: new window.google.maps.Point(15, 15),
										}}
										onClick={(e) => handleMarkerClick(driver)}
									/>
								);
							else
								return (
									<Marker
										value={driver}
										key={driver.id}
										position={{
											lat: parseFloat(driver.location._latitude),
											lng: parseFloat(driver.location._longitude),
										}}
										icon={{
											url: "/frontal-taxi-cab.svg",
											scaledSize: new window.google.maps.Size(20, 20),
											origin: new window.google.maps.Point(0, 0),
											anchor: new window.google.maps.Point(10, 10),
										}}
										onClick={(e) => handleMarkerClick(driver)}
									/>
								);
						} else
							return (
								<Marker
									value={driver}
									key={driver.id}
									position={{
										lat: parseFloat(driver.location._latitude),
										lng: parseFloat(driver.location._longitude),
									}}
									icon={{
										url: "/frontal-taxi-cab.svg",
										scaledSize: new window.google.maps.Size(20, 20),
										origin: new window.google.maps.Point(0, 0),
										anchor: new window.google.maps.Point(10, 10),
									}}
									onClick={(e) => handleMarkerClick(driver)}
								/>
							);
					})}
					{rider ? (
						<Marker
							position={{
								lat: parseFloat(rider?.location.lat),
								lng: parseFloat(rider?.location.lng),
							}}
							icon={{
								scaledSize: new window.google.maps.Size(30, 30),
								origin: new window.google.maps.Point(0, 0),
								anchor: new window.google.maps.Point(15, 15),
							}}
						/>
					) : null}
					{selectedDriver ? (
						<InfoWindow
							position={{
								lat: selectedDriver.location._latitude,
								lng: selectedDriver.location._longitude,
							}}
							onCloseClick={setSelectedDriver(null)}
						>
							<div>
								<h2>{`${selectedDriver.fname} ${selectedDriver.lname}`}</h2>
								<p>Status: {selectedDriver.status}</p>
							</div>
						</InfoWindow>
					) : null}

					{nearestDriver ? (
						<div className="dispatch">
							<div className="dispatchTitle">Action Dispatched!</div>
							<div className="requestDetails">
								<h3>Request Details</h3>
								<div className="requestInfo">
									<div className="infoKey">Notification sent to:</div>
									<div className="infoValue">
										{orderedDrivers[0]?.lname} {orderedDrivers[0]?.fname}
									</div>
								</div>
								<div className="requestInfo">
									<div className="infoKey">Distance to rider:</div>
									<div className="infoValue">
										{orderedDrivers[0]?.distanceToRider} Km
									</div>
								</div>
							</div>
							<div className="waiting">Waiting...</div>
						</div>
					) : (
						<div className="dispatchButton">
							<button onClick={handleClickOpen}>Dispatch a request</button>
						</div>
					)}
					{open ? (
						<div className="dispatchForm">
							<h1>Dispach a ride request </h1>
							<div className="dispatchTitle forSearch">
								You can dispatch a request by filling in the required info and
								click dispatch Dispatch a Ride Request
							</div>
							<div className="inputField">
								<Grid item xs={12}>
									<TextField
										label="Category"
										value={request.category}
										name="category"
										onChange={handleChange}
										type="text"
										fullWidth
										variant="outlined"
										select
										InputLabelProps={{
											shrink: true,
										}}
									>
										<MenuItem value="">
											<em>None</em>
										</MenuItem>
										{categories.map((item) => (
											<MenuItem value={item}>{item}</MenuItem>
										))}
									</TextField>
								</Grid>
							</div>
							<div className="inputField">
								<Grid item xs={12}>
									<TextField
										label="Trip Type"
										value={request.tripType}
										name="tripType"
										onChange={handleChange}
										type="text"
										fullWidth
										variant="outlined"
										select
										InputLabelProps={{
											shrink: true,
										}}
									>
										<MenuItem value="">
											<em>None</em>
										</MenuItem>
										{tripTypes.map((item) => (
											<MenuItem value={item}>{item}</MenuItem>
										))}
									</TextField>
								</Grid>
							</div>
							<div className="inputField">
								<SearchDestination setDestination={setDestination} />
							</div>
							<div className="inputField">
								<TextField
									value={request.departureTime}
									name="departureTime"
									fullWidth
									variant="outlined"
									onChange={handleChange}
									id="datetime-local"
									label="Departure Time"
									type="datetime-local"
									defaultValue="2017-05-24T10:30"
									InputLabelProps={{
										shrink: true,
									}}
								/>
							</div>
							<div className="inputField">
								<div className="inputWrapper">
									<div className="line">
										<hr />
									</div>
									<FormControlLabel
										value={returnTrip.isReturn}
										name="isReturn"
										fullWidth
										control={
											<Checkbox
												checked={returnTrip.isReturn}
												onChange={handeIsReturn}
												name="isReturn"
												color="primary"
											/>
										}
										label="Return Trip"
										labelPlacement="start"
									/>
								</div>
							</div>
							{returnTrip.isReturn ? (
								<div className="inputField">
									<TextField
										value={returnTrip.returnTime}
										name="returnTime"
										onChange={handleReturnTime}
										fullWidth
										variant="outlined"
										id="datetime-local"
										label="Return Time"
										type="datetime-local"
										defaultValue="2017-05-24T10:30"
										InputLabelProps={{
											shrink: true,
										}}
									/>
								</div>
							) : null}
							<div className="inputField">
								<div className="inputWrapper">
									<div className="line">
										<hr />
									</div>
									<FormControlLabel
										value={isCoRiding}
										name="isCoRiding"
										control={
											<Checkbox
												checked={isCoRiding}
												onChange={handleIsCoRiding}
												name="isCoRiding"
												color="primary"
											/>
										}
										label="Travelling with other peaople"
										labelPlacement="start"
									/>
								</div>
							</div>
							{isCoRiding ? (
								<>
									<div className="inputField">
										<TextField
											value={numberOfCoRiders}
											name="number"
											onChange={handleNumberOfCoRiders}
											id="filled-number"
											label="How many"
											type="number"
											name="coRiders"
											InputLabelProps={{
												shrink: true,
											}}
											variant="outlined"
										/>
									</div>
									<div className="inputField">
										<div className="inputWrapper">
											<div className="line">
												<hr />
											</div>
											<FormControlLabel
												value={sameDestination}
												name="sameDestination"
												control={
													<Checkbox
														checked={sameDestination}
														onChange={handleSameDestination}
														name="sameDestination"
														color="primary"
													/>
												}
												label="Same Destination"
												labelPlacement="start"
											/>
										</div>
									</div>
									{!sameDestination ? (
										<div className="inputField">
											<Grid item xs={12}>
												<SearchDestination
													setDestination={setOtherDestination}
												/>
												<IconButton>
													<AddIcon onClick={addDestination} />
												</IconButton>
											</Grid>
											<div>
												{destinations?.map((d) => (
													<div className="destinationCard">{d.name}</div>
												))}
											</div>
										</div>
									) : null}
								</>
							) : null}
							<div className="dispatchButtons">
								<Button
									variant="contained"
									color="primary"
									onClick={handleSubmit}
								>
									Dispatch
								</Button>
								<Button
									variant="outlined"
									color="secondary"
									onClick={handleClose}
								>
									Cancel
								</Button>
							</div>
						</div>
					) : null}
				</GoogleMap>
			</div>
		</div>
	);
}

const SearchPickUpLocation = ({ panTo, setRider, forceUpdate }) => {
	const { ready, value, suggestions, setValue, clearSuggestions } =
		usePlacesAutocomplete({
			requestOptions: {
				location: { lat: () => -1.9397, lng: () => 30.0557 },
				radius: 200 * 1000,
			},
		});

	return (
		<div className="search">
			<Combobox
				onSelect={async (address) => {
					setValue(address, false);
					clearSuggestions();

					try {
						const results = await getGeocode({ address });
						const name = results[0].formatted_address;
						const { lat, lng } = await getLatLng(results[0]);
						const location = { lat, lng };
						panTo({ lat, lng });
						setRider({ name, location });
						forceUpdate();
					} catch (error) {
						console.log(error);
					}
				}}
			>
				<ComboboxInput
					className="searchInput"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					disabled={!ready}
					placeholder={"Enter an address"}
					autoComplete
				/>
				<ComboboxPopover>
					{suggestions.status === "OK" &&
						suggestions.data.map(({ id, description }) => (
							<ComboboxOption key={id} value={description} />
						))}
				</ComboboxPopover>
			</Combobox>
		</div>
	);
};

const SearchDestination = ({ setDestination }) => {
	const { ready, value, suggestions, setValue, clearSuggestions } =
		usePlacesAutocomplete({
			requestOptions: {
				location: { lat: () => -1.9397, lng: () => 30.0557 },
				radius: 200 * 1000,
			},
		});

	return (
		<div className="searchDestination">
			<Combobox
				onSelect={async (address) => {
					setValue(address, false);
					clearSuggestions();

					try {
						const results = await getGeocode({ address });
						const name = results[0].formatted_address;
						const { lat, lng } = await getLatLng(results[0]);
						const location = { lat, lng };
						setDestination({ name, location });
					} catch (error) {
						console.log(error);
					}
				}}
			>
				<ComboboxInput
					className="searchInput2"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					disabled={!ready}
					placeholder={"Enter an address"}
					autoComplete
				/>
				<ComboboxPopover className="searchPopover">
					{suggestions.status === "OK" &&
						suggestions.data.map(({ id, description }) => (
							<ComboboxOption key={id} value={description} />
						))}
				</ComboboxPopover>
			</Combobox>
		</div>
	);
};

export default MapContainer;
