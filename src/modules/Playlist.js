import React from 'react'; 
import Footer from './Footer';

const Playlist = (props) => {
return(
    <div className="playListContainer">
      <h1>Your Curated Playlist</h1>
      <ul className="playlist">
        { props.playlist.map((item, mapIndex) => {
          console.log(item);
          return (
            <li key={item.key}>
              <input type="image" src={item.songImage} alt={item.songTitle} onClick={() => { props.audioPlay(mapIndex) }} />
              <audio src={item.songAudioLink} id={mapIndex} type="audio/m4a">Your browser does not support the <code>audio</code> element.</audio>
              <p className="title">{item.songTitle}</p>
              <p className="artist">{item.songArtist}</p>
              <button onClick={() => { props.removeSong(item.key) }}>remove song</button>
            </li>
          )
        })}
      </ul>
      <Footer />
    </div>
  )
}



export default Playlist;