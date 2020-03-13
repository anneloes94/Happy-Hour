import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

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
  apiKey: 'AIzaSyD-zlTgaeYl8xGwJLN_A9DV3sUdOg-Hqpw'
})(MapContainer);