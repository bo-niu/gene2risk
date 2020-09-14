import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';

export default function MaterialUIPickers(props) {
  // The first commit of Material-UI
  const { birthday, setBirthday } = props;
  const handleDateChange = (date) => {
    setBirthday(date);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <InputLabel id="birthdayLabel">
        Birthday
      </InputLabel>
      <KeyboardDatePicker
        margin="normal"
        id="date-picker-dialog"
        labelId="birthdayLabel"
        // label="Your birthday"
        format="MM/dd/yyyy"
        value={birthday}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
}