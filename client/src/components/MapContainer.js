// HERE WE CREATE MAPCONTAINER
// WE USE CURRENTLOCATION AND INFOWINDOW
import React, { Component, useEffect } from "react";
import { GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import CurrentLocation from "./Map";
import axios from "axios";
import Checkbox from "./Checkbox";
import barIcon from "./Photos/local_bar-24px.svg";
import Search from "./SearchBar";
import Geocode from "react-geocode";

Geocode.setApiKey(`${process.env.REACT_APP_GOOGLE_API_KEY}`);
Geocode.setRegion("ca");

const weekDays = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday"
};

export class MapContainer extends Component {
  // [...] RETRIEVES DATA FROM THE API DATABASE
  // on componentLoad load data into state
  // use componentDidMount
  // when component is loaded up onto the browser, it will grab the data then
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false, //Hides or shows the infoWindow
      activeMarker: {}, //Shows the active marker upon click
      selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
      restaurants: [],
      pins: []
    };
  }
  // Need to put an api call to restaurants to show all markers on screen initially, but importing from marker file

  componentDidMount() {
    const customersData = axios.get("http://localhost:8080/api/customers");
    const restaurantsData = axios.get("http://localhost:8080/api/restaurants");
    // trackPromise(
    Promise.all([customersData, restaurantsData])
      .then(all => {
        let r = [...all[1].data.restaurants];
        this.setState(prev => {
          return {
            ...prev,
            restaurants: r
          };
        });
      })
      .catch(error => {
        console.log(
          "An error occurred while retrieving data from the database",
          error
        );
      });
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  onFoodButtonClick = (props, marker, e) => {
    this.setState({
      selectedRestaurant: props
    });
  };
  onDrinkButtonClick = (props, marker, e) => {
    this.setState({
      selectedRestaurant: props
    });
  };

  centerOnSearch = (props, e) => {
    Geocode.fromAddress(props.description)
      .then(response => {
        console.log(props)
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({currentLocation: {lat, lng}})
        console.log(this.state.currentLocation)
        console.log(lat, lng);
        // this.props.map.panTo({lat, lng})
        // ** Need this to be passed to CurrentLocation ONCE a change of selecting from Search is made **
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <div>
        {/* HOW TO PASS IN MAPCONTAINER STATE TO CURRENTLOCATION? */}
        <CurrentLocation centerAroundCurrentLocation currentLocation={this.state.currentLocation} google={this.props.google}>
          <Search centerOnSearch={this.centerOnSearch} />
          <Checkbox />
          {this.state.restaurants.map(restaurant => (
            <Marker
              onClick={this.onMarkerClick}
              date_available={restaurant.date_available}
              icon={barIcon}
              title={restaurant.name}
              name={restaurant.name}
              start_time={restaurant.start_time}
              end_time={restaurant.end_time}
              position={{ lat: restaurant.lat, lng: restaurant.lng }}
            />
          ))}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
              <h5>
                {this.state.selectedPlace.start_time} -{" "}
                {this.state.selectedPlace.end_time}
              </h5>
              <ul>
                {this.state.selectedPlace.date_available &&
                  this.state.selectedPlace.date_available.map(day => (
                    <li>{weekDays[day]}</li>
                  ))}
              </ul>
            </div>
          </InfoWindow>
        </CurrentLocation>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);
