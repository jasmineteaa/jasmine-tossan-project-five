import React, {Component} from 'react';
import './index.css';
import axios from "axios";
import firebase from './modules/firebase';
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';
import swal from 'sweetalert';
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
      resultsIsShowing: false,
      userInput: '',
      userCountry: 'US',
      music: [],
      songTitle: [],
      songArtist:[],
      songImage: [],
      songAudioLink: [],
      playlist: [],
      selectedSong: '',
      selectedArtist: '',
      selectedImage: '',
      selectedAudioLink: '',
      audioPlaying: false,
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
      isLoading:true,
      resultsIsShowing: true
    });
    const userCountry = this.state.userCountry;
    const userSearch = this.state.userInput;
    this.getData(userSearch, userCountry);
  }  

  audioPlay = (mapIndex) => {
    const audio = document.getElementById([mapIndex]);
    audio.onended = (event) => {
      this.setState({
        audioPlaying:false
      })
    }
    if (this.state.audioPlaying){
      audio.pause();
      this.setState({
        audioPlaying:false
      })
    }else {
      audio.play();
      this.setState({
        audioPlaying: true
      })
    }
  }
  // on button click, if this button's mapindex matches filter index, set state for this song for selectedSong
  // push the selectedSong into the database

  arrayEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length)
    return false;
  for (var i = arr1.length; i--;) {
    if (arr1[i] !== arr2[i])
      return false;
  }
  return true;
  }

  // for song title, artist, image, link, grab selected data for selected and add to state
  // push title, artist, image, link to firebase db so it can be populated to playlist 
  addSong = mapIndex => {
    const oldSongTitle = [...this.state.songTitle];
    const updatedPlaylist = oldSongTitle.filter((item, filterIndex) => filterIndex === mapIndex);
    const updatedPlaylistString = updatedPlaylist.toString();

    const oldSongArtist = [...this.state.songArtist];
    const updatedArtist = oldSongArtist.filter((item, filterIndex) => filterIndex === mapIndex);
    const updatedArtistString = updatedArtist.toString();

    const oldSongImage = [...this.state.songImage];
    const updatedImage = oldSongImage.filter((item, filterIndex) => filterIndex === mapIndex);
    const updatedImageString = updatedImage.toString();

    const oldSongLink = [...this.state.songAudioLink];
    const updatedLink = oldSongLink.filter((item, filterIndex) => filterIndex === mapIndex);
    const updatedLinkString = updatedLink.toString();
    
    // check if selected song's title and artist is already in playlist
    // if already in playlist show sweet alert, else add to playlist 
    const playlistTitleArtist = this.state.playlist.map((item) => {
      return [item.songTitle, item.songArtist]
    });
    const selectedSongArtist = [updatedPlaylistString, updatedArtistString]
    
    let acc = [];
    playlistTitleArtist.forEach((item)=> {
      acc.push(this.arrayEqual(item, selectedSongArtist));
    });
    
      if (acc.includes(true)) {
        swal({
          title: "oops",
          text: "this song is already in your playlist",
          icon: "warning",
        });
      }else {
        this.setState({
          selectedSong: updatedPlaylistString,
          selectedArtist: updatedArtistString,
          selectedImage: updatedImageString,
          selectedAudioLink: updatedLinkString
        })
        const dbRef = firebase.database().ref();
        dbRef.push({
          songTitle: updatedPlaylistString,
          songArtist: updatedArtistString,
          songImage: updatedImageString,
          songAudioLink: updatedLinkString
        });
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
        limit: 15,
        media: 'music',
      }
    }).then((res) => {
      const data = res.data.results;
      const songTitle = data.map((item) => {
        return item.trackName;
      });
      const songArtist = data.map((item) => {
        return item.artistName;
      });
      const songImage = data.map((item) => {
        return item.artworkUrl100;
      })

      const songAudioLink = data.map((item) => {
        return item.previewUrl
      })
      
      this.setState({
        music: data,
        isLoading: false,
        songTitle: songTitle,
        songArtist: songArtist,
        songImage: songImage,
        songAudioLink: songAudioLink
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
          songTitle: data[item].songTitle,
          songArtist: data[item].songArtist,
          songImage: data[item].songImage,
          songAudioLink: data[item].songAudioLink
        });
      }

      this.setState({
        playlist: updatePlaylist
      })
    })

  }
  render() {
    return (
      <Router>
        <div className="App">
          <div className="wrapper">
            <Route exact={true} path="/"></Route>
            <Header />

            <NavLink to="/playlist" activeStyle={{ color: "blue" }}>Playlist</NavLink>
            <Route path="/playlist" render={() => { return (<Playlist
              playlist={this.state.playlist} 
              removeSong={this.removeSong} 
              audioPlay={this.audioPlay} />) 
            }}/>
            <NavLink to="/home" activeStyle={{ color: "blue" }}>Home</NavLink>
            <Route path="/home" 
              render={() => { return (<Home 
              userInput={this.state.userInput} 
              userCountry={this.state.userCountry} 
              isLoading={this.state.isLoading} 
              resultsIsShowing = {this.state.resultsIsShowing}
              music={this.state.music} 
              handleChange={this.handleChange} 
              handleSubmit={this.handleSubmit} 
              addSong={this.addSong} 
              audioPlay={this.audioPlay} />)
              
              }} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
