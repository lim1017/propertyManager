import React from "react";
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

const Dropdown = ({ data, label }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(data[0]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel id="demo-simple-select-filled-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={value}
        onChange={handleChange}
      >
        {data.length !== 0
          ? data.map((element) => {
              return <MenuItem value={element}>{element}</MenuItem>;
            })
          : null}
      </Select>
    </FormControl>
  );
};
export default Dropdown;
