import React, { Component } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
library.add(faPlusCircle)


class SongContainer extends Component {
  render() {
    return (
      <div className="songContainer">
        {this.props.music.map((item, mapIndex) => {
          const { trackName,
            trackId,
            artistName,
            artistViewUrl,
            artworkUrl100: artwork,
            collectionName,
            collectionViewUrl,
            primaryGenreName,
            previewUrl
          } = item;
          return (
            <div className="musicItem" key={trackId}>
              <div className="image"><img src={artwork} alt={collectionName} /></div>
              <h1>{trackName}</h1>
              <h2 className="artist"><a href={artistViewUrl}>{artistName}</a></h2>
              <p className="collection" ><a href={collectionViewUrl}>Collection: {collectionName}</a></p>
              <p className="genre">Genre: {primaryGenreName}</p>
              <a href={previewUrl}>preview this song</a>
              <button key={mapIndex} onClick={() => { this.props.addSong(mapIndex) }}><FontAwesomeIcon icon="plus-circle" />add to playlist</button>
            </div>
          )
        }
        )}
      </div>
    )
  }
}

export default SongContainer;