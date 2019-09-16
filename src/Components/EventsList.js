import React, { useState, useEffect, useContext, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import chunk from 'lodash-es/chunk';
import throttle from 'lodash-es/throttle';
import EventRecord from './EventRecord';
import getEvents from '../ApiModules/getEvents';
import FilterSection from './FilterSection';
import Loader from './Loader';
import ErrorBoundaryContext from './ErrorBoundary/ErrorBoundaryContext';

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [limit, setLimit] = useState(true);
  const [orderBy, setOrderBy] = useState('date');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const errorContext = useContext(ErrorBoundaryContext);

  const throttled = useRef(
    throttle(params => {
      setLoading(true);
      getEvents(params)
        .then(result => {
          setEvents(result);
          setLoading(false);
        })
        .catch(() => errorContext.informAboutError());
    }, 1000)
  );

  useEffect(
    () =>
      throttled.current({
        max: limit ? '10' : '',
        location,
        orderBy,
        date,
      }),
    [limit, date, location, orderBy]
  );

  return (
    <>
      <FilterSection
        location={location}
        setLocation={setLocation}
        date={date}
        setDate={setDate}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />
      <Loader show={loading}>
        {events.length ? (
          <>
            {chunk(events, 2).map(eventsBatch => (
              <Grid
                container
                spacing={4}
                key={`row-${eventsBatch.map(e => e.id).join()}`}
              >
                {eventsBatch.map(event => (
                  <Grid item xs={12} md={6} key={`event-${event.id}`}>
                    <EventRecord event={event} />
                  </Grid>
                ))}
              </Grid>
            ))}
          </>
        ) : (
          <h2>No events found for these selection criteria!</h2>
        )}
      </Loader>
    </>
  );
};

export default EventsList;
