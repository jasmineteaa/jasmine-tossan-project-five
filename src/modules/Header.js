import React, {Component} from 'react'; 

class Header extends Component {
  render() {
    return(
      <header>
        <h1>Playlist Generator</h1>
        <h2>Preview different songs and mark them down for your playlist.</h2>
        <p>Click on the playlist tab to see your new playlist!</p>
      </header>
    )
  }
}

export default Header;