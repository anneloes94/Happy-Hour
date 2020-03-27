import React from "react";
import MapContainer from "./components/MapContainer";

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


const theme = createMuiTheme({
  palette: {
    primary: {main: "#7C8C03" },
    secondary: { main: '#f2b705' },
    success: { main: "#4c5f00"},
    contrastThreshold: 3, 
    tonalOffset: 0.2,
    action: {selected: "#fff"},
  },
  status: {
    danger: { main: '#F21138'},
  },
  overrides: {
    MuiButton: { // Name of the component ⚛️ / style sheet
        root: { // Name of the rule
            backgroundColor: '#7C8C03', // Some CSS
            color: "#fff",

        },
    },
},
});

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>

        <Route exact path="/map">
          <ThemeProvider theme={theme}>
            <NavBar />
            <script
              url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEYTWO}&libraries=places`}
            ></script>
            <MapContainer />
          </ThemeProvider>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
