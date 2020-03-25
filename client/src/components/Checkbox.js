import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';



export default function Checkboxes(props) {

  return (
    <FormControlLabel
    control={
    <Checkbox
        checked = {props.checked}
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
        onChange={props.onClick}
      />
    }
    label={props.label}
    />
  );
}