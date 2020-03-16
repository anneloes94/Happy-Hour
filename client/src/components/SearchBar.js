// // Imports
import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/assets/index.css';

export default function Search() {



  return (
    <div>
    <GooglePlacesAutocomplete
      onSelect={console.log}
    />
  </div>

  )
}
