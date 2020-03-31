// HERE WE CREATE MAPCONTAINER
// WE USE CURRENTLOCATION AND INFOWINDOW
import React, { Component } from "react";
import { GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import CurrentLocation from "./Map";
import axios from "axios";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import barIcon from "./Photos/local_bar-24px.svg";
import Search from "./SearchBar";
import BarCrawlInfo from "./BarCrawlInfo";
import Geocode from "react-geocode";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import "./Checkbox.css";
import "./Button.css";
import toTimeString from "../helpers/toTimeString";
import currentTime from "../helpers/currentTime.js"

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
      pins: [],
      showFood: true,
      showDrink: true,
      barCrawlRestaurants: []
    };
  }
  // Need to put an api call to restaurants to show all markers on screen initially, but importing from marker file

  componentDidMount() {
    const customersData = axios.get("http://localhost:8080/api/customers");
    const restaurantsData = axios.get("http://localhost:8080/api/restaurants");
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

  getBarCrawl = () => {
    navigator.geolocation.getCurrentPosition(location => {
      axios
        .get(
          `http://localhost:8080/api/restaurants/distance?lat=${location.latitude}&lng=${location.longitude}`
        )
        .then(result => {
          const restaurantsArray = result.data.restaurants;
          const currTime = "17:00"
          const filteredRestaurants = restaurantsArray.filter(
            restaurant => restaurant.distance <= 1.5 && restaurant.end_time > currTime
          );
          const slicedFilteredRestaurants = filteredRestaurants.slice(0, 3);
          this.setState(prev => {
            return {
              ...prev,
              barCrawlRestaurants: slicedFilteredRestaurants
            };
          });
        });
    });
  };

  centerOnSearch = (props, e) => {
    Geocode.fromAddress(props.description)
      .then(response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({ currentLocation: { lat, lng } });
      })
      .catch(error => {
        console.error(error);
      });
  };

  markersToBeRendered(props) {
    this.state.restaurants.map(restaurant => (
      <Marker
        key={restaurant.id}
        date_available={restaurant.date_available}
        icon={barIcon}
        title={restaurant.name}
        name={restaurant.name}
        start_time={toTimeString(restaurant.start_time)}
        end_time={toTimeString(restaurant.end_time)}
        position={{ lat: restaurant.lat, lng: restaurant.lng }}
      />
    ));
  }

  toggleShowFood = () => {
    this.setState(prev => {
      return {
        ...prev,
        showFood: !prev.showFood
      };
    });
  };

  toggleShowDrink = () => {
    this.setState(prev => {
      return {
        ...prev,
        showDrink: !prev.showDrink
      };
    });
  };

  showMarkers = () => {
    if (this.state.showFood && this.state.showDrink) {
      return this.state.restaurants.map(restaurant => (
        <Marker
          key={restaurant.id}
          onClick={this.onMarkerClick}
          date_available={restaurant.date_available}
          icon={barIcon}
          title={restaurant.name}
          name={restaurant.name}
          start_time={toTimeString(restaurant.start_time)}
          end_time={toTimeString(restaurant.end_time)}
          position={{ lat: restaurant.lat, lng: restaurant.lng }}
        />
      ));
    } else {
      let filter = [];
      filter = this.state.restaurants.filter(
        rest =>
          rest.has_food === this.state.showFood &&
          rest.has_drink === this.state.showDrink
      );
      return filter.map(restaurant => (
        <Marker
          key={restaurant.id}
          onClick={this.onMarkerClick}
          date_available={restaurant.date_available}
          icon={barIcon}
          title={restaurant.name}
          name={restaurant.name}
          start_time={toTimeString(restaurant.start_time)}
          end_time={toTimeString(restaurant.end_time)}
          position={{ lat: restaurant.lat, lng: restaurant.lng }}
        />
      ));
    }
  };

  render() {
    return (
      <div>
        {/* Sibling 1 */}
        <CurrentLocation
          color="primary"
          centerAroundCurrentLocation
          barCrawlRestaurants={this.state.barCrawlRestaurants}
          currentLocation={this.state.currentLocation}
          google={this.props.google}
        >
          <Marker
            onClick={this.onMarkerClick}
            name={"Current location"}
            position={this.state.currentLocation}
          />
          <div className="form-check"></div>
          {this.state.restaurants && this.showMarkers()}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
            color="primary"
          >
            <div style={{ textAlign: "center" }}>
              <h4>{this.state.selectedPlace.name}</h4>
              <h5>
                {this.state.selectedPlace.start_time} -{" "}
                {this.state.selectedPlace.end_time}
              </h5>
              <ul
                style={{
                  listStyleType: "none",
                  marginLeft: "0",
                  paddingLeft: "0"
                }}
              >
                {this.state.selectedPlace.date_available &&
                  this.state.selectedPlace.date_available.map(day => (
                    <li>{weekDays[day]}</li>
                  ))}
              </ul>
              {this.state.selectedPlace.position && (
                <Button
                  variant="outlined"
                  href={`https://maps.google.com/maps?q=${this.state.selectedPlace.position.lat},${this.state.selectedPlace.position.lng}`}
                >
                  {" "}
                  Directions{" "}
                </Button>
              )}
            </div>
          </InfoWindow>
        </CurrentLocation>

        {/* Sibling 2 */}
        <div style={{ position: "absolute", top: "5em", right: "2em" }}>
          <button className="stubbornButton" onClick={this.getBarCrawl}>
            Find my Bar Crawl!
          </button>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={this.state.showFood}
                  onChange={this.toggleShowFood}
                />
              }
              label="Food"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.showDrink}
                  onChange={this.toggleShowDrink}
                />
              }
              label="Drink"
            />
          </FormGroup>
          <div>
            {this.state.barCrawlRestaurants &&
              this.state.barCrawlRestaurants.map(restaurant => (
                <BarCrawlInfo
                  name={restaurant.name}
                  address={restaurant.address}
                  start_time={restaurant.start_time}
                  end_time={restaurant.end_time}
                />
              ))}
          </div>
        </div>

        {/* Sibling 3 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Search centerOnSearch={this.centerOnSearch} />
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);
