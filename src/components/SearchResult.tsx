import * as React from 'react';
import { connect } from 'react-redux';
import { Typography, Grid, makeStyles, Theme, createStyles } from '@material-ui/core';

interface ISearchResultComponentProps {
  numSongs: number;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: theme.spacing(5, 0, 1),
  }
}));

const SearchResult: React.FC<ISearchResultComponentProps> = ({ numSongs }): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid container={true} direction='column' className={classes.root} alignItems='center'>
      <Grid item={true} xs={8}>
        <Typography variant='subtitle1'>Click on the album covers below to preview your track</Typography>
      </Grid>
      <Grid item={true} xs={8}>
        <Typography variant='subtitle2'>Your search returned {numSongs} results</Typography>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = ({ songs }) => {
  return {
    numSongs: songs.get('searchedSongs').size
  }
}
export default connect(mapStateToProps)(SearchResult);