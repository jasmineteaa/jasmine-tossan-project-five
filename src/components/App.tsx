import React, { Component } from 'react';
import '../index.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Playlist from "./Playlist";
import { connect } from 'react-redux';
import { setSearchLoading, searchSongs } from '../actions';
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';


interface IApp {
  setSearchLoading: (isLoading: boolean) => void;
  searchSongs: (term: string, country: string) => void;
}

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

class App extends Component<IApp> {

  render() {

    return (
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Nav />
          <Route path="/playlist" render={() => <Playlist />} />
          <Route exact path="/" render={() => <Home />} />
        </ThemeProvider>
      </Router>
    );
  }
}

const mapStateToProps = () => {

}

export default connect(mapStateToProps, { setSearchLoading, searchSongs })(App);
