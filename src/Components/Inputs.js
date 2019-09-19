import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  picker: {
    margin: 8,
  },
  createButton: {
    float: 'right',
    backgroundColor: '#5272FF',
  },
}));

const startTime = new Date('01-01-1900');
const endTime = new Date('01-01-2100');

const Inputs = ({ location, setLocation, date, setDate }) => {
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <TextField
        className={classes.formControl}
        id="standard-location"
        label="Location"
        value={location}
        onChange={ev => {
          setLocation(ev.target.value);
        }}
        margin="normal"
      />
      <KeyboardDatePicker
        className={classes.picker}
        disableToolbar
        variant="inline"
        format="yyyy-MM-dd"
        autoOk={true}
        margin="normal"
        id="date-picker-inline"
        label="Date picker inline"
        value={date}
        onChange={change => {
          if (change < endTime && change > startTime) {
            setDate(change);
          }
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default Inputs;
