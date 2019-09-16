import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import getCharacter from '../ApiModules/getCharacter';
import Loader from './Loader';
import ErrorBoundaryContext from './ErrorBoundary/ErrorBoundaryContext';

const useStyles = makeStyles({
  bigAvatar: {
    margin: '50px 0',
    width: 300,
    height: 300,
  },
  chip: {
    margin: '10px 25px',
  },
  stories: {
    margin: '10px 25px',
    backgroundColor: 'orange',
    color: 'white',
  },
});

const CharacterProfile = ({ match, location }) => {
  const classes = useStyles();

  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const errorContext = useContext(ErrorBoundaryContext);

  useEffect(() => {
    setLoading(true);

    if (!location.character) {
      getCharacter({
        id: match.params.id,
      })
        .then(data => {
          setCharacter(data.results[0]);
        })
        .catch(() => errorContext.informAboutError());
    } else {
      setCharacter(location.character);
    }
    setLoading(false);
  }, []);

  return (
    <Loader show={loading}>
      {character && (
        <Grid container justify="center" alignItems="center" direction="column">
          <>
            {character.thumbnail && (
              <Avatar
                src={`${character.thumbnail.path}/standard_xlarge.${character.thumbnail.extension}`}
                className={classes.bigAvatar}
              />
            )}
            <Grid
              container
              justify="center"
              alignItems="center"
              direction="column"
            >
              <h1>{character.name}</h1>
              <h3>{character.description}</h3>
            </Grid>
            <Grid
              container
              justify="center"
              alignItems="center"
              direction="row"
            >
              {Boolean(character.comics && character.comics.items.length) && (
                <>
                  <h2>Comics:</h2>
                  {character.comics.items.map(comic => (
                    <Chip
                      label={comic.name}
                      key={`comic-${comic.name}`}
                      className={classes.chip}
                    />
                  ))}
                </>
              )}
            </Grid>
            <Grid
              container
              justify="center"
              alignItems="center"
              direction="row"
            >
              {Boolean(character.stories && character.stories.items.length) && (
                <>
                  <h2>Stories:</h2>
                  {character.stories.items.map(story => (
                    <Chip
                      label={story.name}
                      key={`story-${story.name}`}
                      className={classes.stories}
                    />
                  ))}
                </>
              )}
            </Grid>
          </>
        </Grid>
      )}
    </Loader>
  );
};

export default CharacterProfile;
