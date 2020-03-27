import React, { useState, Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Redirect } from 'react-router-dom'
import "./Login.css"
import NavBar from "./NavBar"
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

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

export default function Login() {
  const [redirect, setState] = useState(false);
  
  const setRedirect = () => {
    setState({
      redirect: true,
    })
  };

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to ="/map" />
    }
  };

        return (

          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <NavBar />
          <div className="container">
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                <div theme={theme} >
                <form>
                    <h3>Sign In</h3>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="email" className="form-control" placeholder="Enter username" />
                    </div>
        
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" />
                    </div>
        
                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>
                    
                    {renderRedirect()}
                    <button onClick={setRedirect}>Submit</button>
                    <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p>
                </form>
                </div>
                </li>
                <li className="nav-item">
                </li>
              </ul>
            </div>
          </div>
        </nav>
         
        );
};