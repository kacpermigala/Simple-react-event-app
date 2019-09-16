import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  card: {
    height: 75,
  },
  avatar: {
    backgroundColor: '#5272FF',
  },
});

const EventRecord = ({ event }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Link to={{ pathname: `/event/${event.id}`, event }}>
        <CardHeader
          avatar={
            <Avatar aria-label="character" className={classes.avatar}>
              {event.location.charAt(0)}
            </Avatar>
          }
          title={`${event.location} ${event.date}`}
        />
      </Link>
    </Card>
  );
};

export default EventRecord;
