import React from "react";
import MapContainer from "./components/MapContainer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import NavBar from "./components/NavBar";
import Login from "./components/Login"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/">
      <Login />
      </Route>

      <Route exact path="/map">
      <MuiThemeProvider>
      <NavBar />
      <script
        url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEYTWO}&libraries=places`}
      >
      </script>
      <MapContainer />
      </MuiThemeProvider>
      </Route>
      </Switch>
    </Router>
  );
}

// Search will give back a lng/lat,
// we can pass this into pins through the state
// and use this in MapContainer

export default App;
