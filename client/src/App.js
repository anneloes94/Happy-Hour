import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { GOOGLE_API_KEY } from "./requests"

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
         lat: 43.644260,
         lng: -79.402260
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(MapContainer);