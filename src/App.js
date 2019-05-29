import React, {Component} from 'react';
import './App.css';
import axios from "axios";
import Form from "./Form"

class App extends Component {
  constructor() {
    super();
    this.state = {
      music: [],
      isLoading: true
    }
  }
  componentDidMount() {
    // axios request here
    axios({
      url: 'https://itunes.apple.com/search',
      method: 'GET',
      dataResponse: 'JSON',
      params: {
        term: 'jimmy+hendrix',
        country: 'CA',
        limit: 25,
        media: 'music',
      }
    }).then((res) => {
      const data = res.data.results;
      console.log(data);
      this.setState({
        music: data,
        isLoading: false
      })

    })
  }
  render() {
// delete extra artistId and collectionId keys later if don't need 
    return (
      <div className="App">
          <Form />
          { this.state.isLoading ? 
          <p>Loading...</p> :
          
            this.state.music.map((item) => {
              const { 
                trackName,
                trackId,
                artistName, 
                artistId, 
                artistViewUrl, 
                artworkUrl100: artwork, 
                collectionName, 
                collectionId, 
                collectionViewUrl,
                primaryGenreName, 
                previewUrl, 
                trackPrice 
              } = item;

              return (
                <div className="musicItem" key={trackId}>
                  <h1>{trackName}</h1>
                  <div className="image"><img src={artwork} alt={collectionName + 'artwork'} /></div>
                  <h2 className="artist" key={artistId}><a href={artistViewUrl}>{artistName}</a></h2>
                  <div className="price">{trackPrice}</div>
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
