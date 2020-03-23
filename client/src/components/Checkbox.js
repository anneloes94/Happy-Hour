import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import "./Checkbox.css"

export default function Checkboxes() {
  const OPTIONS = ["Food", "Drink"];
  const [checked, setChecked] = React.useState(true);
  const handleChange = event => {
    setChecked(event.target.checked);
  };
  return (
    <div className='form-check'>
    <FormGroup row>
    <FormControlLabel
    control={
    <Checkbox
        defaultChecked
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
    }
    label="Food"
    />
    <FormControlLabel
    control={
    <Checkbox
      defaultChecked
      color="primary"
      inputProps={{ 'aria-label': 'secondary checkbox' }}
    />
  }
  label="Drink"
  />
  </FormGroup>
  </div>
  );
}