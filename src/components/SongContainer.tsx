import * as React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import { addSong } from '../actions';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
library.add(faPlusCircle, faPlayCircle, faPauseCircle)


// @@TODO fix typing
interface ISongContainerComponentProps {
  searchedSongs: List<any>;
  addSong: (song: Map<string, any>) => void;
}

const SongContainer: React.FC<ISongContainerComponentProps> = (props) => {
  const {
    searchedSongs,
    addSong,
  } = props;

  const [audioPlaying, setAudioPlaying] = React.useState(false);
  const [selectedAudio, setSelectedAudio] = React.useState(Map());
  const audio = document.querySelector('audio');

  const toggleAudio = (song: Map<string, any>, isSelectedAudio: boolean) => {
    function playAudio() {
      setSelectedAudio(song);

      audio.src = song.get('previewUrl');
      audio.play();
    }

    if (audioPlaying && isSelectedAudio) {
      audio.pause();
      setAudioPlaying(!audioPlaying);
      return;
    }

    if (audioPlaying && !isSelectedAudio) {
      setAudioPlaying(true);
      playAudio();
      return
    }

    setAudioPlaying(!audioPlaying);
    playAudio();
  }

  return (
    <div className="songContainer" aria-live="polite" role="main">
      {searchedSongs && searchedSongs.map((song: any, mapIndex: any) => {
        const trackName = song.get('trackName') || '';
        const trackId = song.get('trackId') || '';
        const artistName = song.get('artistName') || '';
        const artistViewUrl = song.get('artistViewUrl') || '';
        const artwork = song.get('artworkUrl100') || '';
        const collectionName = song.get('collectionName') || '';
        const isSelectedAudio = selectedAudio.get('trackId') === trackId;

        return (
          <div className="musicItem" key={trackId}>
            <div className="image">
              <input
                type="image"
                src={artwork}
                alt={collectionName}
                onClick={() => toggleAudio(song, isSelectedAudio)}
              />
              <div className="play">
                {
                  audioPlaying && isSelectedAudio
                    ? <FontAwesomeIcon icon="pause-circle" />
                    : <FontAwesomeIcon icon="play-circle" />
                }
              </div>
            </div>
            <h3>{trackName}</h3>
            <h4 className="artist">
              <a target="_blank" rel="noopener noreferrer" href={artistViewUrl}>{artistName}</a>
            </h4>
            <button
              key={mapIndex}
              // @@TODO check if song in playlist before add
              onClick={() => addSong(song)}
            >
              <FontAwesomeIcon icon="plus-circle" />add to playlist
            </button>
          </div>
        )
      }
      )}
      <audio itemType="audio/m4a">
        Your browser does not support the <code>audio</code> element.
      </audio>
    </div>
  )
}

const mapStateToProps = ({ songs }) => {
  return {
    searchedSongs: songs.get('searchedSongs')
  }
}

export default connect(mapStateToProps, { addSong })(SongContainer);