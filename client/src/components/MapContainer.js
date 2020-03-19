import React, { Component, useEffect } from "react";
import { GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import CurrentLocation from "./Map";
import axios from "axios";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import img  from "./Photos/local_bar-24px.svg";

const weekDays = {1:"Monday", 2:"Tuesday", 3:"Wednesday", 4:"Thursday", 5:"Friday", 6:"Saturday", 7:"Sunday"}

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
  }
// Need to put an api call to restaurants to show all markers on screen initially, but importing from marker file

  componentDidMount() {
    
    const customersData = axios.get("http://localhost:8080/api/customers");
    const restaurantsData = axios.get("http://localhost:8080/api/restaurants");
    // trackPromise(
    Promise.all([customersData, restaurantsData])
      .then(all => {
        console.log(all[1].data.restaurants)
        let r =  [...all[1].data.restaurants];
        console.log("r ", r);
        this.setState( prev => {
          // customers: all[0].data,
          // restaurants: [...all[1].data.restaurants]
          console.log("prev", prev)
          return {
            ...prev,
            restaurants: r,
          }
        });
      })
      .catch(error => {
        console.log(
          "An error occurred while retrieving data from the database",
          error
        );
      })
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

  render() {
    console.log(this.state.restaurants)
    return (
      <MuiThemeProvider>
`        <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
         {this.state.restaurants.map( restaurant => <Marker onClick={this.onMarkerClick} date_available={restaurant.date_available} icon={img} title={restaurant.name} name={restaurant.name} start_time={restaurant.start_time} end_time={restaurant.end_time} position={{lat: restaurant.lat, lng: restaurant.lng}}/>)}
         {this.state.restaurants.map( restaurant => <Marker onClick={this.onMarkerClick} date_available={restaurant.date_available}icon={img} title={restaurant.name} name={restaurant.name} start_time={restaurant.start_time} end_time={restaurant.end_time} position={{lat: restaurant.lat, lng: restaurant.lng}}/>)}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
          <h4>{this.state.selectedPlace.name}</h4>
          <h5>{this.state.selectedPlace.start_time} - {this.state.selectedPlace.end_time}</h5>
          <ul>{this.state.selectedPlace.date_available && this.state.selectedPlace.date_available.map(day => <li>{weekDays[day]}</li>)}</ul>
          </div>`
        </InfoWindow>
      </CurrentLocation>
    </MuiThemeProvider>
  );
}
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);
