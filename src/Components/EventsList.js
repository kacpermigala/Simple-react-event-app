import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from 'react';
import Grid from '@material-ui/core/Grid';
import chunk from 'lodash-es/chunk';
import throttle from 'lodash-es/throttle';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import EventRecord from './EventRecord';
import getEvents from '../ApiModules/getEvents';
import FilterSection from './FilterSection';
import Loader from './Loader';
import ErrorBoundaryContext from './ErrorBoundary/ErrorBoundaryContext';
import EventAction from './EventAction';
import eventMethodConst from '../utils/eventMethodConst';
import getWeather from '../ApiModules/getWeather';

const useStyles = makeStyles(() => ({
  button: {
    margin: 25,
  },
}));

const fortnightAway = new Date(Date.now() + 12096e5).setHours(0, 0, 0);

const EventsList = () => {
  const classes = useStyles();

  const [events, setEvents] = useState([]);
  const [limit, setLimit] = useState(true);
  const [orderBy, setOrderBy] = useState('date');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [eventMethod, setEventMethod] = useState('');
  const [eventToChange, setEventToChange] = useState('');
  const [weather, setWeather] = useState({});
  const errorContext = useContext(ErrorBoundaryContext);

  const throttled = useRef(
    throttle(params => {
      setLoading(true);
      getEvents(params)
        .then(result => {
          setEvents(result);
          result.forEach(event => {
            // sprawdz czy forecast dla danej lokacji jest juz w tablicy weather jesli tak odpusc mordo
            if (new Date(event.date).getTime() < fortnightAway) {
              getWeather(location).then(xxx => {});
            }
          });
          setLoading(false);
        })
        .catch(() => {
          errorContext.informAboutError();
        });
    }, 1000)
  );

  const handleActionClose = useCallback(() => {
    setEventMethod('');
    setEventToChange({});
  }, []);

  const handleActionOpen = useCallback(action => {
    setEventMethod(action);
  });

  const handleLoadMore = useCallback(() => {
    setLimit(false);
  }, []);

  const setEventToEdit = useCallback(id => {
    const eventToEdit = events.find(event => event.id === id);
    setEventToChange(eventToEdit);
    handleActionOpen(eventMethodConst.EDIT);
  });

  const grabThrottled = () => {
    throttled.current({
      max: limit ? '10' : '',
      location,
      orderBy,
      date,
    });
  };

  const checkLocation = location => {};

  useEffect(() => {
    grabThrottled();
  }, [limit, date, location, orderBy]);

  return (
    <>
      <EventAction
        eventAction={eventMethod}
        handleActionClose={handleActionClose}
        informAboutChange={grabThrottled}
        event={eventToChange}
      />
      <FilterSection
        location={location}
        setLocation={setLocation}
        date={date}
        setDate={setDate}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        handleActionOpen={handleActionOpen}
      />
      <Loader show={loading}>
        {events && events.length ? (
          <>
            {chunk(events, 2).map(eventsBatch => (
              <Grid
                container
                spacing={4}
                key={`row-${eventsBatch.map(e => e.id).join()}`}
              >
                {eventsBatch.map(event => (
                  <Grid item xs={12} md={6} key={`event-${event.id}`}>
                    <EventRecord
                      event={event}
                      informAboutChange={grabThrottled}
                      setEventToEdit={setEventToEdit}
                    />
                  </Grid>
                ))}
              </Grid>
            ))}
            {events.length === 10 && (
              <Grid container justify="center">
                <Button
                  color="primary"
                  variant="outlined"
                  size="large"
                  className={classes.button}
                  onClick={handleLoadMore}
                >
                  Load All
                </Button>
              </Grid>
            )}
          </>
        ) : (
          <h2>No events found for these selection criteria!</h2>
        )}
      </Loader>
    </>
  );
};

export default EventsList;
