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
    height: 250,
  },
  avatar: {
    backgroundColor: '#5272FF',
  },
});

const EventRecord = ({ event, informAboutChange, setEventToEdit }) => {
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
          //Dodaj prognoze albo napisz ze ni ch bo nie jest 14 dni przed
          weahter[id] = albo pogoda albo nie ma bo 14 dni dalej od pogody This
          impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
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
