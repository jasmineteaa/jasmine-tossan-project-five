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


interface IApp {
  setSearchLoading: (isLoading: boolean) => void;
  searchSongs: (term: string, country: string) => void;
}

class App extends Component<IApp> {

  render() {

    return (
      <Router>
        <>
          <Nav />
          <Route path="/playlist" render={() => <Playlist />} />
          <Route exact path="/" render={() => <Home />} />
        </>
      </Router>
    );
  }
}

const mapStateToProps = () => {

}

export default connect(mapStateToProps, { setSearchLoading, searchSongs })(App);
