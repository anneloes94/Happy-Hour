import React, { useState } from "react";
import MapContainer from "./components/MapContainer";
import Search from "./components/SearchBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

function App() {
  const [pins, addPin] = useState([]);
  return (
    <MuiThemeProvider>
      <script
        url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEYTWO}&libraries=places`}
      ></script>
      <Search addPin={addPin} />
      <MapContainer pins={pins} />
    </MuiThemeProvider>
  );
}

// Search will give back a lng/lat,
// we can pass this into pins through the state
// and use this in MapContainer

export default App;
