// Imports
import React, { Component } from 'react';

// Import Search Bar Components
import SearchBar from 'material-ui-search-bar';

//Import React Scrit Libraray to load Google object
import Script from 'react-load-script';
import { GOOGLE_API_KEY } from "../requests";

class Search extends Component {
  
  // Define Constructor
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
      city: '',
      query: ''
    };

  }

  handleScriptLoad() {   // Declare Options For Autocomplete 
    const options = { types: ['address'] }; 
    
    // Initialize Google Autocomplete 
    /*global google*/
    this.autocomplete = new google.maps.places.Autocomplete(
                          document.getElementById('autocomplete'),
                          options );  // Avoid paying for data that you don't need by restricting the 
    // set of place fields that are returned to just the address
    // components and formatted address
    this.autocomplete.setFields(['address_components',   
                                 'formatted_address']);  // Fire Event when a suggested name is selected
    this.autocomplete.addListener('place_changed',
                                  this.handlePlaceSelect); 
  }

  render() {
    return (
      <div>
        <Script url={`https://maps.googleapis.com/maps/api/js?key=${ GOOGLE_API_KEY }&libraries=places`}
        onLoad={this.handleScriptLoad}
        />
        <SearchBar id="autocomplete" placeholder="Where to..?" hintText="Search City" value={this.state.query}
          style={{
            margin: '0 auto',
            maxWidth: 800,
          }}
        />
      </div>
    );
  }
}

export default Search;