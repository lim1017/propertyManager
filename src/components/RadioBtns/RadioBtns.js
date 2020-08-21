import React, { useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export default function RadioButtonsGroup({
  data,
  label,
  value,
  handleChg,
  id,
}) {
  const [values, setValues] = React.useState(value);

  useEffect(() => {
    setValues(value);
  }, [value]);

  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Status</FormLabel>
        <RadioGroup
          row={true}
          aria-label="gender"
          name="gender1"
          value={values}
          onChange={(e) => handleChg(e, id)}
        >
          <FormControlLabel
            value="Pending"
            control={<Radio />}
            label="Pending"
          />

          <FormControlLabel
            value="Complete"
            control={<Radio />}
            label="Complete"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
