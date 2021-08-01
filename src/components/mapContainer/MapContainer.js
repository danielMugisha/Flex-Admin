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
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

//const libraries = ["places"];
const mapContainerStyle = {
	width: "100%",
	height: "500px",
};
const center = { lat: -1.9397, lng: 30.0557 };
const options = {
	styles: mapStyles,
	disableDefaultUI: true,
	zoomControl: true,
};

function MapContainer() {
	const { drivers } = useSelector((state) => state.allDrivers);
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: "AIzaSyAJgkThrpvzmzSU7-7IYspebiELSdygtWk",
		libraries: ["places"],
	});

	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const [category, setCategory] = useState("");
	const [tripType, setTripType] = useState("");
	const [isReturnTrip, setIsReturnTrip] = useState(false);
	const [numberOfRiders, setNumberOfRiders] = useState(1);
	const [riderId, setRiderId] = useState(2);
	const [departureTime, setDepartureTime] = useState(0);
	const [status, setStatus] = useState("pending");
	const [destination, setDestination] = useState("");
	const [pickLat, setPickLat] = useState(0);
	const [pickLng, setPickLng] = useState(0);
	const [rider, setRider] = useState({ destination: null, location: null });

	const pickUpLocation = { latitude: pickLat, longitude: pickLng };
	const URL = "https://flexgo-backend.herokuapp.com/api/rideRequest";
	const [orderedDrivers, setOrderedDrivers] = useState([]);
	const [nearestDriver, setNearestDriver] = useState();

	const [, updateState] = useState();
	const forceUpdate = useCallback(() => updateState({}), []);
	useEffect(() => {
		if (nearestDriver) {
			const timer = setTimeout(() => {
				setNearestDriver(null);
				forceUpdate();
			}, 1000 * 30);
			return () => clearTimeout(timer);
		}
	}, [nearestDriver]);

	const handleSubmit = () => {
		setRider({
			destination: destination,
			location: { lat: pickUpLocation.latitude, lng: pickUpLocation.longitude },
		});
		const request = {
			hasCompanions: {
				doesIt: false,
			},
			category,
			tripType,
			isReturnTrip,
			riderId,
			departureTime,
			status,
			destination,
			pickUpLocation,
		};

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
					setOpen(false);
				});
		} catch (err) {
			console.log(err);
			window.log("something went wrong");
		}
	};
	const [selectedDriver, setSelectedDriver] = useState(null);

	const handleMarkerClick = (driver) => {
		console.log(driver);
		setSelectedDriver(driver);
	};

	useEffect(() => {
		setNearestDriver(orderedDrivers[0]);
		console.log("orderedDrivers", orderedDrivers);
	}, [orderedDrivers]);

	if (loadError) return "Error Loading";
	if (!isLoaded) return "Map Loading";
	return (
		<>
			<div className="wrapperTitle">Flex Go Real Time Driver Tracking</div>
			<div className="helpDesk">
				<div className="mapContainer">
					<GoogleMap
						mapContainerStyle={mapContainerStyle}
						zoom={14}
						center={center}
						options={options}
					>
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
												scaledSize: new window.google.maps.Size(30, 30),
												origin: new window.google.maps.Point(0, 0),
												anchor: new window.google.maps.Point(15, 15),
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
											scaledSize: new window.google.maps.Size(30, 30),
											origin: new window.google.maps.Point(0, 0),
											anchor: new window.google.maps.Point(15, 15),
										}}
										onClick={(e) => handleMarkerClick(driver)}
									/>
								);
						})}
						{rider ? (
							<Marker
								position={{
									lat: parseFloat(rider?.location?.lat),
									lng: parseFloat(rider?.location?.lng),
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
					</GoogleMap>
				</div>
				<div className="dispatch">
					{nearestDriver ? (
						<div>
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
						<div className="dispatchTitle">
							<Button
								variant="outlined"
								color="primary"
								onClick={handleClickOpen}
							>
								Dispatch a request
							</Button>
						</div>
					)}
				</div>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">
						Dispatch a Ride Request
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							You can dispatch a request by filling in the required info and
							click dispatch
						</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							id="category"
							label="Trip Category"
							type="text"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							fullWidth
						/>
						<TextField
							autoFocus
							margin="dense"
							id="tripType"
							label="Trip Type"
							type="text"
							value={tripType}
							onChange={(e) => setTripType(e.target.value)}
							fullWidth
						/>
						<div>
							Location
							<TextField
								autoFocus
								margin="dense"
								id="locLatitude"
								label="Current Latitude"
								type="number"
								value={pickLat}
								onChange={(e) => setPickLat(e.target.value)}
							/>
							<TextField
								autoFocus
								margin="dense"
								id="locLongitude"
								label="Current Longitude"
								type="number"
								value={pickLng}
								onChange={(e) => setPickLng(e.target.value)}
							/>
						</div>
						<TextField
							autoFocus
							margin="dense"
							id="destination"
							label="Destination"
							type="text"
							value={destination}
							onChange={(e) => setDestination(e.target.value)}
							fullWidth
						/>
						<TextField
							autoFocus
							margin="dense"
							id="departureTime"
							label="DepartureTime"
							type="text"
							value={departureTime}
							onChange={(e) => setDepartureTime(e.target.value)}
							fullWidth
						/>
						<TextField
							autoFocus
							margin="dense"
							id="isReturnTrip"
							label="Is It a Return Trip"
							type="text"
							value={isReturnTrip}
							onChange={(e) => setIsReturnTrip(new Boolean(e.target.value))}
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={handleSubmit} color="primary">
							Dispatch
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</>
	);
}

const Search = () => {
	const { ready, value, suggestions, setValue, clearSuggestions } =
		usePlacesAutocomplete({
			requestOptions: {
				location: { lat: -1.9397, lng: 30.0557 },
				radius: 20000 * 1000,
			},
		});

	return (
		<div className="search">
			<Combobox onSelect={(address) => console.log(address)}>
				<ComboboxInput
					value={value}
					onChange={(e) => setValue(e.target.value)}
					disabled={!ready}
					placeholder={"Enter an address"}
					autoComplete
				/>
				<ComboboxPopover>
					{console.log(suggestions)}
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
