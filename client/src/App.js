import React, { useState } from 'react';
import MapContainer from './components/MapContainer';
import Search from "./components/SearchBar"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Script from 'react-load-script';

function App() {
  const [pins, addPin] = useState([]);
  return (
  <MuiThemeProvider> 
    <Search addPin={addPin}/>  
    <MapContainer pins={pins}/>
  </MuiThemeProvider>)

}

// Search will give back a lng/lat, 
// we can pass this into pins through the state
// and use this in MapContainer

export default App;

