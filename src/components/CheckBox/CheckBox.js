import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const GreenCheckbox = withStyles({
  root: {
    color: green[50],
    '&$checked': {
      color: green[50],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const PurpleCheckbox = withStyles({
  root: {
    color: purple[500],
    '&$checked': {
      color: purple[500],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function CheckboxLabels({label, initalState, handleChange, color}) {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });


  return (
    <FormGroup row>
      {color === "purple" ?
      <FormControlLabel
      control={<PurpleCheckbox checked={initalState} onChange={(e)=>handleChange(e, label)} name="checkedG" />}
      label={label}
      style={{color:"purple"}}
      />
      :
      <FormControlLabel
        control={<GreenCheckbox checked={initalState} onChange={(e)=>handleChange(e, label)} name="checkedG" />}
        label={label}
        style={{color:"white"}}
      />
      }
      
    </FormGroup>
  );
}
