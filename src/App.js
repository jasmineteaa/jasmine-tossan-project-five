import React, {Component} from 'react';
import './App.css';
import axios from "axios";
import firebase from './firebase';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Form from "./Form";
import Playlist from "./Playlist";

library.add(faPlusCircle)

class App extends Component {
  // keep track of loading - get music
  // userInput, userCountry
  // music - array of results matching user inputs
  // playlist - to append music to
  constructor() {
    super();
    this.songTitle = React.createRef();
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
  // selectSong empty string
  // on click - see the title attached to the musicItem
  // store title in selectSong and push as new item in database
  
  addSong = mapIndex => {
    const oldSongTitle = [...this.state.songTitle];
    const updatedPlaylist = oldSongTitle.filter((item, filterIndex) => filterIndex == mapIndex);
    const updatedPlaylistString = updatedPlaylist.toString();
    this.setState ({
      selectedSong: updatedPlaylistString
    })
    const dbRef = firebase.database().ref();
    dbRef.push(this.state.selectedSong);
  }
  // handleClick = (mapIndex) => {
  //   console.log(this);
  // }

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
      console.log(songTitle);
      this.setState({
        music: data,
        isLoading: false,
        songTitle: songTitle,
      })

    })
  }
  // make reference to firebase database
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
        updatePlaylist.push(data[item]);
      }

      this.setState({
        playlist: updatePlaylist
      })
    })

  }
  render() {
// delete extra artistId and collectionId keys later if don't need 
    return (
      <div className="App">
          {/* push props to Form component */}
          <Form 
            userInput = {this.state.userInput}
            userCountry = {this.state.userCountry}
            handleChange = {this.handleChange}
            handleSubmit = {this.handleSubmit}
          />
          {/* if loading is true, render loading */}
          {/* if laoding is false, popular song details into div with unique key */}
          {this.state.isLoading ? 

          <p>Loading...</p> :
          
          this.state.music.map((item, mapIndex) => {
            const { 
              trackName,
              trackId,
              trackPrice, 
              currency,
              artistName, 
              artistId, 
              artistViewUrl, 
              artworkUrl100: artwork, 
              collectionName, 
              collectionId, 
              collectionViewUrl,
              primaryGenreName, 
              previewUrl 
            } = item;

            return (

              <div className="musicItem" key={trackId}>
                <h1>{trackName}</h1>
                <div className="image"><img src={artwork} alt={collectionName + 'artwork'} /></div>
                <h2 className="artist" key={artistId}><a href={artistViewUrl}>{artistName}</a></h2>
                <div className="price">${trackPrice} {currency}</div>
                <p className="collection" key={collectionId}><a href={collectionViewUrl}>{collectionName}</a></p>
                <p className="genre">{primaryGenreName}</p>
                <a href={previewUrl}>preview this song</a>
                <button key={mapIndex} onClick={()=>{this.addSong(mapIndex)}}><FontAwesomeIcon icon="plus-circle" />add to playlist</button>
              </div>
            )}
          )
        }
        <h1>Your Curated Playlist</h1>
        <ul className="playlist">
          {this.state.playlist.map((item) => {
            return(
              <li>{item}</li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default App;