// import React from "react";


// export default function Application(props) {

//   return (
//     <div>
//     <h1>Hello</h1>
//     </div>
//   )
// } 


import React from "react";
import { compose, withProps } from "recompose";
import { GOOGLE_API_KEY } from "../requests";

import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs,
} from "react-google-maps";

const lat = 43.644260;
const lng = -79.402260;

const MapComponent = compose(

  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${ GOOGLE_API_KEY }&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(({ lat, lng }) => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat, lng }}>
    <Marker position={{ lat, lng }} />
  </GoogleMap>
));

export default MapComponent;