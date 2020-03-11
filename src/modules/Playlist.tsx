import * as React from 'react';
import Footer from './Footer';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';
library.add(faTimesCircle);


interface IPlaylistComponentProps {
  playlist: any;
  audioPlaying: any;
  audioPlay: any;
  removeSong: any;
}
const Playlist: React.FC<IPlaylistComponentProps> = (props): JSX.Element => {
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
              <button></button>
            </li>
            {props.playlist.map((item: any, mapIndex: any) => {
              return (
                <li key={item.key}>
                  <div className="image">
                    <input type="image" src={item.songImage} alt={item.songTitle} onClick={() => { props.audioPlay(mapIndex) }} />
                    <div className="play">
                      {props.audioPlaying ? <FontAwesomeIcon icon="pause-circle" /> : <FontAwesomeIcon icon="play-circle" />}
                    </div>
                  </div>
                  <audio src={item.songAudioLink} id={mapIndex} itemType="audio/m4a">Your browser does not support the <code>audio</code> element.</audio>
                  <p className="title">{item.songTitle}</p>
                  <p className="artist">{item.songArtist}</p>
                  <button onClick={() => { props.removeSong(item.key) }}>
                    <FontAwesomeIcon icon="times-circle" />
                    <span className="sr-only">remove song from list</span>
                  </button>
                </li>
              )
            })}
          </ul>
          <Footer />

        </div>
      </div>
    </>
  )
}


export default Playlist;