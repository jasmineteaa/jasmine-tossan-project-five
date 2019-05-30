import React, {Component} from 'react';
import './index.css';
import axios from "axios";
import firebase from './modules/firebase';
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';
import Header from './modules/Header';
import Home from './modules/Home';
import Playlist from "./modules/Playlist";


class App extends Component {
  // keep track of loading - get music
  // userInput, userCountry
  // music - array of results matching user inputs
  // playlist - to append music to
  constructor() {
    super();
    this.state = {
      isLoading: false,
      userInput: '',
      userCountry: 'US',
      music: [],
      songTitle: [],
      playlist: [],
      selectedSong: ''
    }
  }

  // if there is change in input fields, set the new values in state
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // on form submit, loader is true
  // grab user inputs and make axios call to fetch data
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      isLoading:true
    });
    const userCountry = this.state.userCountry;
    const userSearch = this.state.userInput;
    this.getData(userSearch, userCountry);
  }  

  // on button click, if this button's mapindex matches filter index, set state for this song for selectedSong
  // push the selectedSong into the database
  addSong = mapIndex => {
    const oldSongTitle = [...this.state.songTitle];
    const updatedPlaylist = oldSongTitle.filter((item, filterIndex) => filterIndex === mapIndex);
    const updatedPlaylistString = updatedPlaylist.toString();
    const playlistTitle = this.state.playlist.map((item) => {
      return item.song
    });
    if (playlistTitle.includes(updatedPlaylistString)){
      alert('this song is already in your playlist')
    }else {
      this.setState ({
        selectedSong: updatedPlaylistString
      })
      const dbRef = firebase.database().ref();
      dbRef.push(updatedPlaylistString);
    }
  }
  removeSong = (songKey) => {
    const dbRef = firebase.database().ref(songKey);
    dbRef.remove();
    // dbRef.child(songKey).remove();
  }  

  // function to get music based on user query and user location inputs
  // limit results per request to 10
  // after get data, set loading to false
  getData = (query, location) => {
    axios({
      url: 'https://itunes.apple.com/search',
      method: 'GET',
      dataResponse: 'JSON',
      params: {
        term: query,
        country: location,
        limit: 10,
        media: 'music',
      }
    }).then((res) => {
      const data = res.data.results;
      const songTitle = data.map((item) => {
        return item.trackName;
      });
      this.setState({
        music: data,
        isLoading: false,
        songTitle: songTitle,
      })
    })
  }
  // create new array to store the updated playlist state 
  // if changes in data, push the new data into updatedState array
  // push all playlist songs into new array
  // update playlist state with updatedPlaylist array
  componentDidMount() {

    const dbRef = firebase.database().ref();
    dbRef.on('value', (response) => {
      const data = response.val();
      const updatePlaylist =[];
      for (let item in data) {
        updatePlaylist.push({
          key:item,
          song: data[item]
        });
      }

      this.setState({
        playlist: updatePlaylist
      })
    })

  }
  render() {
// delete extra artistId and collectionId keys later if don't need 
    return (
      <Router>
        <div className="App">
          <Route exact={true} path="/"></Route>
          <Header />

          <NavLink to="/playlist" activeStyle={{ color: "blue" }}>Playlist</NavLink>
          <Route path="/playlist" render={() => { return (<Playlist
            playlist={this.state.playlist} 
            removeSong={this.removeSong} />) 
          }}/>
          <NavLink to="/home" activeStyle={{ color: "blue" }}>Home</NavLink>
          <Route path="/home" 
            render={() => { return (<Home 
            userInput={this.state.userInput} 
            userCountry={this.state.userCountry} 
            isLoading={this.state.isLoading} 
            music={this.state.music} 
            handleChange={this.handleChange} 
            handleSubmit={this.handleSubmit} 
            addSong={this.addSong} />)
            }} />


        </div>
      </Router>
    );
  }
}

export default App;
