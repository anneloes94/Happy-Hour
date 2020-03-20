import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import "./Checkbox.css"
export default function Checkboxes() {
  const [checked, setChecked] = React.useState(true);
  const handleChange = event => {
    setChecked(event.target.checked);
  };
  return (
    <div className='form-check'>
    <Checkbox
        defaultChecked
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
    <Checkbox
      defaultChecked
      color="primary"
      inputProps={{ 'aria-label': 'secondary checkbox' }}
    />
  </div>
  );
}