import * as React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Theme, createStyles, makeStyles } from '@material-ui/core';
import RadioRoundedIcon from '@material-ui/icons/RadioRounded';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { Omit } from '@material-ui/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    toolbar: {
      background: theme.palette.common.black,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    link: {
      textTransform: 'uppercase',
      paddingRight: theme.spacing(2),
      '&:hover': {
        color: theme.palette.secondary.main
      }
    }
  }),
);

const HomeLink = React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((props, ref) => (
  <RouterLink ref={ref} to="/" {...props} />
));

const PlaylistLink = React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((props, ref) => (
  <RouterLink ref={ref} to="/playlist" {...props} />
));


const Nav: React.FC = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="absolute" color='primary'>
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" color="inherit" aria-label="home" className={classes.menuButton}>
            <RadioRoundedIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Music Player
          </Typography>
          <Link color='inherit' component={HomeLink} className={classes.link} variant='body1'>Home</Link>
          <Link color='inherit' component={PlaylistLink} className={classes.link} variant='body1'>Playlist</Link>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Nav;
