import React from "react";
import MapContainer from "./components/MapContainer";

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: { main: '#7C8C03' },
    secondary: { main: '#f2b705' }
  },
  status: {
    danger: { main: '#F21138'},
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
            <NavBar theme={theme} />
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
