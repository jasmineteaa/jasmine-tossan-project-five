import React, {Component} from 'react';
import './App.css';
import axios from "axios";
import Form from "./Form"

class App extends Component {
  constructor() {
    super();
    this.state = {
      music: [],
      isLoading: false,
      userInput: '',
      userCountry: 'US'
    }
  }
  handleOptionChange = (changeEvent) => {
    this.setState({
      userCountry: changeEvent.target.value
    })
  }
  handleChange = (event) => {
    this.setState({
      userInput: event.target.value
    })
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      isLoading:true
    });
    const userCountry = this.state.userCountry;
    const userSearch = this.state.userInput;
    this.getData(userSearch, userCountry);
  }
  getData = (query, location) => {
    axios({
      url: 'https://itunes.apple.com/search',
      method: 'GET',
      dataResponse: 'JSON',
      params: {
        term: query,
        country: location,
        limit: 25,
        media: 'music',
      }
    }).then((res) => {
      const data = res.data.results;
      console.log(data);
      this.setState({
        music: data,
        isLoading: false,
      })

    })
  }

  componentDidMount() {
    // axios request here

  }
  render() {
// delete extra artistId and collectionId keys later if don't need 
    return (
      <div className="App">
          <Form 
            userInput = {this.state.userInput}
            userCountry = {this.state.userCountry}
            handleChange = {this.handleChange}
            handleSubmit = {this.handleSubmit}
            handleOptionChange = {this.handleOptionChange}
          />
          { this.state.isLoading ? 
          <p>Loading...</p> :
          
            this.state.music.map((item) => {
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

                </div>
              )}
              )
    }
      </div>
    );
  }
}

export default App;
