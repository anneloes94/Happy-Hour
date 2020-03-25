import React, { useState, Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Redirect } from 'react-router-dom'
import "./Login.css"

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
        );
};