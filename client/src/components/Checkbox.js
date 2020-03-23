import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


export default function Checkboxes(props) {
  const [checked, setChecked] = React.useState(true);
  // var restaurants = props.restaurants;
  // const handleChange = event => {
  //   setChecked(event.target.checked);
  // };

  // onFoodClick = (props, marker, e) => {
  //   this.setState({
  //     selectedRestaurant: props
  //     restaurants.map(hasFood =>  )
  //   });
  // };

  // onDrinkClick = (props, marker, e) => {
  //   this.setState({
  //     selectedRestaurant: props
  //   });
  // };

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