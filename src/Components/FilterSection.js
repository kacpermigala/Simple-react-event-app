import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
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
}));

const FilterSection = ({
  date,
  setDate,
  location,
  setLocation,
  orderBy,
  setOrderBy,
}) => {
  const classes = useStyles();

  return (
    <div id="filter-section">
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
            setDate(change);
          }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="sorting">Sort</InputLabel>
          <Select
            id="standard-order"
            value={orderBy}
            onChange={ev => {
              setOrderBy(ev.target.value);
            }}
          >
            <MenuItem value={'location'}>Location</MenuItem>
            <MenuItem value={'date'}>Date</MenuItem>
          </Select>
        </FormControl>
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default FilterSection;
