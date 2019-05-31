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
            primaryGenreName,
            previewUrl
          } = item;
          return (
            <div className="musicItem" key={trackId}>
              <div className="image"><input type="image" src={artwork} alt={collectionName} onClick={() => { this.props.audioPlay(mapIndex)}}/></div>
              <h1>{trackName}</h1>
              <h2 className="artist"><a href={artistViewUrl}>{artistName}</a></h2>
              <p className="genre">Genre: {primaryGenreName}</p>
              <audio id={mapIndex} src={previewUrl} type="audio/m4a">Your browser does not support the <code>audio</code> element.</audio>
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