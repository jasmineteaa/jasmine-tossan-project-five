import * as React from 'react';
import SearchResult from './SearchResult';
import SongContainer from './SongContainer';
import Footer from './Footer';
import { connect } from 'react-redux';
import jump from 'jump.js';
import { searchSongs } from '../actions';
import RadioButtonsGroup from './RadioButtonsGroup';
import { TextField, Grid, makeStyles, Theme, createStyles, Button, Typography, LinearProgress } from '@material-ui/core';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import swal from 'sweetalert';
interface IHomeComponentProps {

}

interface IHomeProps extends IHomeComponentProps {
  loadingSearch: boolean;
  showResults: boolean;
  searchSongs: (query: string, location: string) => void;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  '@global': {
    '.MuiInput-underline::after': {
      borderBottom: `2px solid ${theme.palette.secondary.main}`
    }
  },
  searchButton: {
    background: theme.palette.common.black,
    margin: theme.spacing(1),
  },
  textField: {
    flexGrow: 1,
  },
  root: {
    flexGrow: 1,
  }
}));

export const radioOptions = [
  {
    value: 'US',
    label: 'US'
  },
  {
    value: 'CA',
    label: 'CA'
  }
];

const Home: React.FC<IHomeProps> = (props): JSX.Element => {
  const classes = useStyles();
  const [userInput, setUserInput] = React.useState('');
  const [userCountry, setUserCountry] = React.useState('US');

  const {
    loadingSearch,
    searchSongs,
    showResults
  } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (name === 'userInput') {
      setUserInput(e.target.value)
    } else {
      setUserCountry(e.target.value);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput) {
      return swal({
        title: "oops",
        text: "Please enter a valid search term",
        icon: "error",
      });
    }
    searchSongs(userInput, userCountry);
    setUserInput('');
    jump('.songContainer', {
      a11y: true
    });
  }

  return (
    <>
      <div className='searchPage'>
        <Grid
          container={true}
          direction='column'
          className={classes.root}
          justify='center'
          alignItems='center'
        >
          <Grid item={true} direction='column'>
            <Typography variant='h2'>Music Player.</Typography>
            <Typography variant='h3'>A Playlist Generator.</Typography>
          </Grid>
          <Grid item={true}>
            <form role='search' aria-labelledby='search' onSubmit={handleSubmit}>
              <Grid
                container={true}
                justify='center'
                wrap='nowrap'
              >
                <Grid
                  item={true}
                  md={10}
                  xs={12}
                  container={true}
                  direction='column'
                  spacing={3}
                >
                  <Grid item={true}>
                    <RadioButtonsGroup
                      label='Please select your country:'
                      radioOptions={radioOptions}
                      customValue={userCountry}
                      customOnChange={handleChange}
                    />
                  </Grid>
                  <Grid container={true}>
                    <TextField
                      name='userInput'
                      id='userInput'
                      label='Enter artist, song or music genre'
                      type='search'
                      onChange={handleChange}
                      classes={{
                        root: classes.textField
                      }}
                      value={userInput}
                    />
                    <Button
                      variant='contained'
                      color='secondary'
                      className={classes.searchButton}
                      startIcon={<SearchRoundedIcon />}
                      type='submit'
                    >
                      Search
                  </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </div>

      <div className='search' id='search'>
        <div className='wrapper'>
          {showResults && <SearchResult />}
          {
            loadingSearch
              ? <LinearProgress color="secondary" />
              : <SongContainer />
          }
        </div>
        <Footer />
      </div>
    </>
  )
}

const mapStateToProps = ({ songs }) => {
  return {
    loadingSearch: songs.get('loadingSearch'),
    showResults: songs.get('showResults'),
  }
}
export default connect(mapStateToProps, { searchSongs })(Home);