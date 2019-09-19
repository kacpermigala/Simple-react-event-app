import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import eventMethodConst from '../utils/eventMethodConst';
import Inputs from './Inputs';

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

const FilterSection = ({
  date,
  setDate,
  location,
  setLocation,
  orderBy,
  setOrderBy,
  handleActionOpen,
}) => {
  const classes = useStyles();

  return (
    <div id="filter-section">
      <Inputs
        location={location}
        date={date}
        setLocation={setLocation}
        setDate={setDate}
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
      <div className="button-wrapper">
        <Button
          onClick={() => {
            handleActionOpen(eventMethodConst.CREATE);
          }}
          variant="contained"
          color="primary"
          className={classes.createButton}
        >
          Create event
        </Button>
      </div>
    </div>
  );
};

export default FilterSection;
