import React, { Component, useEffect } from "react";
import { GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import CurrentLocation from "./Map";
import axios from "axios";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

export class MapContainer extends Component {
  // [...] RETRIEVES DATA FROM THE API DATABASE
  // on componentLoad load data into state
  // use componentDidMount
  // when comopnent is loaded up onto the browser, it will grab the data then
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false, //Hides or shows the infoWindow
      activeMarker: {}, //Shows the active marker upon click
      selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
      restaurants: []
    };
    console.log(this.state.restaurants);
  }

  componentDidMount() {
    const customersData = axios.get("http://localhost:8080/api/customers");
    const restaurantsData = axios.get("http://localhost:8080/api/restaurants");
    Promise.all([customersData, restaurantsData])
      .then(all => {
        this.setState({
          customers: all[0].data,
          restaurants: all[1].data
        });
      })
      .catch(error => {
        console.log(
          "An error occurred while retrieving data from the database",
          error
        );
      });
  }

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
  
  // restaurantMarkers = this.state.restaurants.map(restaurant => { <Marker onClick={this.onMarkerClick} name={restaurant.name} /> })

  render() {
    return (
      <MuiThemeProvider>
        <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
          {this.state.restaurants.length > 0 ? console.log("hello") : console.log("fail")}
          {/* {(this.state.restaurants.length > 0) ? (this.restaurantMarkers) : ( <Marker onClick={this.onMarkerClick} name="Lighthouse Labs" /> )} */}
          
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
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);
