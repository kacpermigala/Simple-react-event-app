import React, { useState, useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Inputs from './Inputs';
import postEvent from '../ApiModules/postEvent';
import ErrorBoundaryContext from './ErrorBoundary/ErrorBoundaryContext';
import patchEvent from '../ApiModules/patchEvent';

const EventAction = ({
  eventAction,
  event,
  handleActionClose,
  informAboutChange,
}) => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(null);
  const [eventToChange, setEventToChange] = useState({});
  const errorContext = useContext(ErrorBoundaryContext);

  useEffect(() => {
    setEventToChange(event);
  }, [event]);

  const createEvent = () => {
    postEvent(location, date)
      .then(() => {
        informAboutChange();
        setLocation('');
        setDate(null);
        handleActionClose();
      })
      .catch(() => {
        errorContext.informAboutError();
      });
  };

  const editEvent = () => {
    patchEvent(eventToChange.id, eventToChange.date, eventToChange.location)
      .then(() => {
        informAboutChange();
        handleActionClose();
      })
      .catch(() => {
        errorContext.informAboutError();
      });
  };

  const setEventDate = _date => {
    setEventToChange({
      ...eventToChange,
      date: _date,
    });
  };

  const setEventLocation = _location => {
    setEventToChange({
      ...eventToChange,
      location: _location,
    });
  };

  return (
    <div>
      <Dialog
        open={Boolean(eventAction)}
        onClose={handleActionClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{eventAction} event</DialogTitle>
        <DialogContent>
          <Inputs
            location={eventToChange.location || location}
            setLocation={eventToChange.date ? setEventLocation : setLocation}
            date={eventToChange.date || date}
            setDate={eventToChange.date ? setEventDate : setDate}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleActionClose} color="primary" autoFocus>
            Cancel
          </Button>
          <Button
            onClick={eventToChange.date ? editEvent : createEvent}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EventAction;
