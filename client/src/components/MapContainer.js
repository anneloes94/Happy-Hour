import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { GOOGLE_API_KEY } from "./requests"
import CurrentLocation from "./Map"
import axios from "axios";
import Script from 'react-load-script';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// import Search from "./components/SearchBar"

 // [...] RETRIEVES DATA FROM THE API DATABASE
  Promise.all([
    Promise.resolve(axios.get("http://localhost:8080/api/customers")),
    Promise.resolve(axios.get("http://localhost:8080/api/restaurants")),
  ])
    .then((all) => {
      const customers = all[0].data
      const restaurants = all[1].data
      console.log(customers);
    })
    .catch(error =>
      console.log(
        "An error occurred while retrieving data from the database",
        error
      )
    );




const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  };

  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

onClose = props => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }
};
render() {
  return (
    <MuiThemeProvider> 
    <CurrentLocation
    centerAroundCurrentLocation
    google={this.props.google}
    >

      <Marker
        onClick={this.onMarkerClick}
        name={'Lighthouse Labs'}
      />
      <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}
        onClose={this.onClose}
        >
        <div>
          <h4>{this.state.selectedPlace.name}</h4>
        </div>
      </InfoWindow>
    </CurrentLocation>
    </MuiThemeProvider>
  );
}
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(MapContainer);


