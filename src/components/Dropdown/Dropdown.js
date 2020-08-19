import React, {useEffect, useState, useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Dropdown = ({ data, label, handleChg, value, isDisabled, id, style }) => {
  const classes = useStyles();
 
 
  // console.log(value)
  // const [selection, setSelection] = useState(value)
  // console.log(selection, 'selection')

  // useEffect(() => {
  //   console.log('setting value')
  //   setSelection(value)
  // }, [value])

  const renderDropDown = ()=>{
    if(data === undefined){
      return null
    } else {

      return (
        <div style={style}>
        <FormControl variant="filled" className={classes.formControl} disabled={isDisabled} >
        <InputLabel id="demo-simple-select-filled-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={value}
          onChange={(e)=>handleChg(e, id)}
        >
          {data ? data.map((element) => {
            return <MenuItem value={element.name}>{element.name}</MenuItem>;
          })
            : null}
        </Select>
      </FormControl>
      </div>
      )
    }
  }

  return (
    <div>{renderDropDown()}</div>
  ) 
};
export default Dropdown;
