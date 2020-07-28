import * as React from 'react';
import Footer from './Footer';
import firebase from '../firebase';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import { fromJS, Map } from 'immutable';
import { connect } from 'react-redux';
import { getPlaylist, removeSong } from '../actions';
library.add(faTimesCircle);


interface IPlaylistComponentProps {
  getPlaylist: (playlist: Map<number, any>) => void;
  removeSong: (key: string) => void;
  playlist: Map<string, any>;
}
const Playlist: React.FC<IPlaylistComponentProps> = (props): JSX.Element => {
  const {
    getPlaylist,
    removeSong,
    playlist,
  } = props;

  const [audioPlaying, setAudioPlaying] = React.useState(false);
  const [selectedAudio, setSelectedAudio] = React.useState(Map());
  const audio = document.querySelector('audio');
  console.log(audio);

  const handleRemoveSong = async (key: string) => {
    const dbRef = firebase.database().ref(key);
    await dbRef.remove();
    removeSong(key);

  }
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

  React.useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.on('value', (response) => {
      const data = response.val();
      const immutableData = fromJS(data);

      getPlaylist(immutableData);
    })
  }, []); // eslint-disable-line

  return (
    <>
      <div className="playListContainer">
        <div className="wrapper">
          <div className="playlist">
            <h2>Your Curated Playlist</h2>
            <h3>Click on the album covers below to preview your track</h3>
          </div>
          <ul className="playlist" >
            <li>
              <p className="image"></p>
              <p className="title">title</p>
              <p className="artist">artist</p>
            </li>
            {playlist && playlist.entrySeq().map(([key, song]) => {
              const trackName = song.get('trackName') || '';
              const trackId = song.get('trackId') || '';
              const artistName = song.get('artistName') || '';
              // const artistViewUrl = song.get('artistViewUrl') || '';
              const artwork = song.get('artworkUrl100') || '';
              // const collectionName = song.get('collectionName') || '';
              const isSelectedAudio = selectedAudio.get('trackId') === trackId;

              return (
                <li key={key}>
                  <div className="image">
                    <input type="image"
                      src={artwork}
                      alt={trackName}
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
                  <p className="title">{trackName}</p>
                  <p className="artist">{artistName}</p>
                  <button onClick={() => handleRemoveSong(key)}>
                    <FontAwesomeIcon icon="times-circle" />
                    <span className="sr-only">remove song from list</span>
                  </button>
                </li>
              )
            })}
          </ul>
          <audio
            onEnded={() => setAudioPlaying(false)}
            itemType="audio/m4a"
          >
            Your browser does not support the <code>audio</code> element.
          </audio>
          <Footer />

        </div>
      </div>
    </>
  )
}

const mapStateToProps = ({ songs }) => {
  return {
    playlist: songs.get('playlist')
  }
}

export default connect(mapStateToProps, { getPlaylist, removeSong })(Playlist);