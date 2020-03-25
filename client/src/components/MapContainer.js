// HERE WE CREATE MAPCONTAINER
// WE USE CURRENTLOCATION AND INFOWINDOW
import React, { Component, useEffect } from "react";
import { GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import CurrentLocation from "./Map";
import axios from "axios";
import Checkbox from "./Checkbox";
import barIcon from "./Photos/local_bar-24px.svg";
import Search from "./SearchBar";
import BarCrawlInfo from "./BarCrawlInfo"
import Geocode from "react-geocode";
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import "./Checkbox.css"

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

  // barCrawl = () => {
  //   console.log()

  // }
  getDistance = () => {
    //would it sort with the number format right now?
    //right now start_time is a string
    //2 options, add another table in db where start time is a int/decimal e.g. 00:16:00 is 4.00 
    //or convert on client side from string to int and then filter 

    // INPUT: restaurants
    // OUTPUT: three LatLngs
    // 0. restaurantsBarCrawl = []

    // 1. SELECT * FROM restaurants ORDER BY start_time ASC
    // DONE

    // 2. Get GeoLocation from 
        //this.state.currentLocation
    // DONE

    // const currentLocation = this.state.currentLocation
    navigator.geolocation.getCurrentPosition(location => {
      axios.get(`http://localhost:8080/api/restaurants/distance?lat=${location.latitude}&lng=${location.longitude}`)
    .then(result => {
      const restaurantsArray = result.data.restaurants // array of objects

      const filteredRestaurants = restaurantsArray.filter(restaurant => restaurant.distance <= 1.5 )

      const slicedFilteredRestaurants = filteredRestaurants.slice(0,3)

      this.setState(prev => {
        return {
          ...prev,
          barCrawlRestaurants: slicedFilteredRestaurants
        }
      })

      // if (this.state.barCrawlRestaurants) {
      //   const barCrawlInfo = (
      //     this.state.restaurants.map(restaurant => 
      //     <div style="top-margin: 50px; background-color:white; position: absolute">
      //       ${restaurant.name}
      //       ${restaurant.start_time}
      //       ${restaurant.end_time}
      //       HELLO?
      //     </div>)
      //   )
      //       console.log(barCrawlInfo)
      //     return barCrawlInfo
      //   }
    })
    })

  }

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

 markersToBeRendered(props){
  const attributeData = this.state.restaurants.map(restaurant => 
    <Marker 
    date_available={restaurant.date_available}
    icon={barIcon}
    title={restaurant.name}
    name={restaurant.name}
    start_time={restaurant.start_time}
    end_time={restaurant.end_time}
    position={{ lat: restaurant.lat, lng: restaurant.lng }}/>
  )
}


toggleShowFood = () => {
    this.setState(prev => {
      return {
        ...prev,
        showFood: !prev.showFood
      }
    })
  }

  toggleShowDrink = () => {
    this.setState(prev => {
      return {
        ...prev,
        showDrink: !prev.showDrink
      }
    })
  }

  showMarkers = () => {
    if (this.state.showFood && this.state.showDrink) {
      return this.state.restaurants.map(restaurant => 
        <Marker
        onClick={this.onMarkerClick}
        date_available={restaurant.date_available}
        icon={barIcon}
        title={restaurant.name}
        name={restaurant.name}
        start_time={restaurant.start_time}
        end_time={restaurant.end_time}
        position={{ lat: restaurant.lat, lng: restaurant.lng }}
        />)
      }
      else {
        let filter = [];
        filter = this.state.restaurants.filter(rest => rest.has_food === this.state.showFood && rest.has_drink === this.state.showDrink);
        return filter.map(restaurant => 
        <Marker
          onClick={this.onMarkerClick}
          date_available={restaurant.date_available}
          icon={barIcon}
          title={restaurant.name}
          name={restaurant.name}
          start_time={restaurant.start_time}
          end_time={restaurant.end_time}
          position={{ lat: restaurant.lat, lng: restaurant.lng }}
        />)
      }
  }


  render() {
    return (
      <div >
        {/* HOW TO PASS IN MAPCONTAINER STATE TO CURRENTLOCATION? */}
        <CurrentLocation centerAroundCurrentLocation currentLocation={this.state.currentLocation} google={this.props.google}>
          <Search centerOnSearch={this.centerOnSearch} />
          
          <Marker onClick={this.onMarkerClick} name={'Current location'} position={this.state.currentLocation} />
          <div className='form-check'>

          
          </div>
          {this.state.restaurants && this.showMarkers()}
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
        <div style={{position: "absolute", top: "5em", right: "2em"}}>
        <div >
            {this.state.barCrawlRestaurants && this.state.barCrawlRestaurants.map(restaurant =>
              <BarCrawlInfo 
                name={restaurant.name}
                address={restaurant.address}
                start_time={restaurant.start_time}
                end_time={restaurant.end_time} />
            )}
          </div>
        
          <FormGroup row>
            <Button variant="contained" color="primary" onClick={this.getDistance}>
              Find my Bar Crawl!
            </Button>
            <Checkbox label={"Food"} checked={this.state.showFood} onClick={this.toggleShowFood} />
            <Checkbox label={"Drink"} checked={this.state.showDrink} onClick={this.toggleShowDrink} />
          </FormGroup>
          </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);
