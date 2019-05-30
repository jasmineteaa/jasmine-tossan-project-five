import React, {Component} from 'react'; 

class Playlist extends Component {
render() {
  return(
    <div className="playListContainer">
      <h1>Your Curated Playlist</h1>
      <ul className="playlist">
        {this.props.playlist.map((item) => {
          return (
            <li key={item.key}>
              <p>{item.song}</p>
              <button onClick={() => { this.props.removeSong(item.key) }}>remove song</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
}



export default Playlist;