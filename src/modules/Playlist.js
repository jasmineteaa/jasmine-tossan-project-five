import React from 'react'; 
import Footer from './Footer';

const Playlist = (props) => {
return(
    <div className="playListContainer">
      <h1>Your Curated Playlist</h1>
      <ul className="playlist">
        { props.playlist.map((item) => {
          return (
            <li key={item.key}>
              <p>{item.song}</p>
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