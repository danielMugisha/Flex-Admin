import React from "react";
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxOption,
} from "@reach/combobox";
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from "use-places-autocomplete";
import "@reach/combobox/styles.css";

const SearchLocation = (props) => {
	const { ready, value, suggestions, setValue, clearSuggestions } =
		usePlacesAutocomplete({
			requestOptions: {
				location: { lat: () => -1.9397, lng: () => 30.0557 },
				radius: 200 * 1000,
			},
		});
	console.log("props=============>", suggestions.data);

	return (
		<Combobox
			onSelect={async (address) => {
				setValue(address, false);
				clearSuggestions();

				try {
					const results = await getGeocode({ address });
					const name = results[0].formatted_address;
					const { lat, lng } = await getLatLng(results[0]);
					const location = { lat, lng };
					props.setLocation({ name, location });
					props.panTo({ lat, lng });
					props.forceUpdate();
				} catch (error) {
					console.log(error);
				}
			}}
		>
			<ComboboxInput
				id="combo"
				value={value ? value : props.currentLocation}
				onChange={(e) => setValue(e.target.value)}
				disabled={!ready}
				placeholder={"Enter an address"}
			/>
			<ComboboxPopover className="comboList">
				{suggestions.status === "OK" &&
					suggestions.data.map(({ id, description }) => (
						<ComboboxOption key={id} value={description} />
					))}
			</ComboboxPopover>
		</Combobox>
	);
};

export default SearchLocation;
