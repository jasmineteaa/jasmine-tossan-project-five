import * as React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
library.add(faPlusCircle, faPlayCircle, faPauseCircle)


// @@TODO fix typing
interface ISongContainerComponentProps {
  music: any;
  audioPlaying: any;
  audioPlay: any;
  addSong: any;
}

class SongContainer extends React.Component<ISongContainerComponentProps> {
  render() {
    return (
      <div className="songContainer" aria-live="polite" role="main">
        {this.props.music.map((item: any, mapIndex: any) => {
          const { trackName,
            trackId,
            artistName,
            artistViewUrl,
            artworkUrl100: artwork,
            collectionName,
            previewUrl
          } = item;
          return (
            <div className="musicItem" key={trackId}>
              <div className="image">
                <input
                  type="image"
                  src={artwork}
                  alt={collectionName}
                  onClick={() => { this.props.audioPlay(mapIndex) }}
                />
                <div className="play">
                  {
                    this.props.audioPlaying
                      ? <FontAwesomeIcon icon="pause-circle" />
                      : <FontAwesomeIcon icon="play-circle" />
                  }
                </div>
              </div>
              <h3>{trackName}</h3>
              <h4 className="artist"><a href={artistViewUrl}>{artistName}</a></h4>
              <audio
                id={mapIndex}
                src={previewUrl}
                itemType="audio/m4a"
              >
                Your browser does not support the <code>audio</code> element.
              </audio>
              <button
                key={mapIndex}
                onClick={() => { this.props.addSong(mapIndex) }}
              >
                <FontAwesomeIcon icon="plus-circle" />add to playlist
              </button>
            </div>
          )
        }
        )}
      </div>
    )
  }
}

export default SongContainer;