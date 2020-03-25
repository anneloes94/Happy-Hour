// HERE WE CREATE THE CURRENTLOCATION COMPONENT
// WHICH LOADS THE MAP AND GIVES IT DEFAULT VALUES
import React from "react";
import ReactDOM from "react-dom";

const mapStyles = {
  map: {
    position: "absolute",
    width: "100%",
    height: "100%"
  }
};

export class CurrentLocation extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  recenterMap() {
    let current
    if (this.props.currentLocation) {
      current = this.props.currentLocation 
    } else {
      current = this.state.currentLocation;
    }
    const map = this.map;

    const google = this.props.google;
    const maps = google.maps;
    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }
  }

  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          },
          this.recenterMap);
        });
      }
    }
    this.loadMap();
    this.recenterMap();
  }

  loadMap() {
    if (this.props && this.props.google) {
      // checks if google is available
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;

      // reference to the actual DOM element
      // Important!
      const node = ReactDOM.findDOMNode(mapRef);

      let { zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom,
          mapTypeControlOptions: { mapTypeIds: [] }
        }
      );

      // maps.Map() is constructor that instantiates the map
      this.map = new maps.Map(node, mapConfig);
    }
  }

  renderChildren() {
    this.recenterMap();
    const { children } = this.props;

    if (!children) return;

    return React.Children.map(children, c => {
      if (!c) return;
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation
      });
    });
  }

  render() {
    const style = Object.assign({}, mapStyles.map);
    return (
      <div>
        <div style={style} ref="map">
          Loading map...
        </div>
        {this.renderChildren()}
      </div>
    );
  }

  constructor(props) {
    super(props);

    const { lat, lng } = this.props.initialCenter;
    
    this.state = {
      // LHL coordinates
      currentLocation: {
        lat: lat,
        lng: lng
      },
      search: ""
    };
  }
}

export default CurrentLocation;

CurrentLocation.defaultProps = {
  zoom: 14,
  // FIX THIS TO GIVE ACTUAL CURRENT LOCATION
  initialCenter: {
    lat: 43.644262,
    lng: -79.402261
  },
  centerAroundCurrentLocation: false,
  visible: true,
  mapTypeControlOptions: { mapTypeIds: [] }
};
