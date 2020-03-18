// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import MuiAppBar from '@material-ui/core/AppBar';


// npm install  @material-ui/core

// const styles = theme => ({
//   root: {
//     color: theme.palette.common.white,
//   },
// });

// function AppBar(props) {
//   return <MuiAppBar   {...props} />;
// }

// AppBar.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(AppBar);

import React from "react";
import ReactDOM from "react-dom";
import AppBar from "@material-ui/core/Button";

export default function App() {
  return (
    <AppBar> Hello
      </ AppBar >
      )
}

// ReactDOM.render(<App />, document.querySelector("#app"));
