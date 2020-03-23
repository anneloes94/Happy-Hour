// SEARCHBAR WITH SETTINGS LIKE COUNTRY SEARCH
import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import "react-google-places-autocomplete/dist/assets/index.css";
import "./SearchBar.css"

export default function Search(props) {

  return (
    <div className="searchBar">
      {/* More info: 
      https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest 
      https://www.npmjs.com/package/react-google-places-autocomplete */}
      <GooglePlacesAutocomplete 
      autocompletionRequest={{
        componentRestrictions: {
          country: ["ca"]
        },
        // location: props.currentLocation,
        // radius: 1500,

      }} 
      onSelect={(searchedLocation) => props.centerOnSearch(searchedLocation)}
      placeholder={"Where to..?"} />
    </div>
  );
}
