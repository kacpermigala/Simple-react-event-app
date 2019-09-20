import React, { useContext } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import CardContent from '@material-ui/core/CardContent';
import deleteEvent from '../ApiModules/deleteEvent';
import ErrorBoundaryContext from './ErrorBoundary/ErrorBoundaryContext';

const useStyles = makeStyles({
  card: {
    height: 200,
  },
  avatar: {
    backgroundColor: '#5272FF',
  },
});

const EventRecord = ({ event, informAboutChange, setEventToEdit, weather }) => {
  const classes = useStyles();
  const errorContext = useContext(ErrorBoundaryContext);

  const remove = id => {
    deleteEvent(id)
      .then(() => {
        informAboutChange();
      })
      .catch(() => {
        errorContext.informAboutError();
      });
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="character" className={classes.avatar}>
            {event.location.charAt(0)}
          </Avatar>
        }
        title={`${event.location} ${event.date}`}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {!weather ? (
            <span>
              No weather forecast available for that date. Event has been
              already hosted or is more than 14 days in the future.
            </span>
          ) : (
            <>
              <span>
                Weather for {weather.city} / {weather.countryCode} on the day of
                the event:
              </span>
              <span> Max: {weather.max} °C </span>
              <span>Min: {weather.min} °C </span>
            </>
          )}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="edit"
          onClick={() => {
            setEventToEdit(event.id);
          }}
        >
          <Edit />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={() => {
            remove(event.id);
          }}
        >
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default EventRecord;
