import * as React from 'react';
import SearchResult from './SearchResult';
import SongContainer from './SongContainer';
import Footer from './Footer';

interface IHomeComponentProps {
  handleSubmit: any;
  userCountry: any;
  handleChange: any;
  userInput: any;
  resultsIsShowing: any;
  music: any;
  addSong: any;
  isLoading: any;
  audioPlay: any;
  audioPlaying: any;
}
const Home: React.FC<IHomeComponentProps> = (props): JSX.Element => {
  return (
    <>
      <div className="searchPage">
        <h1>Music Thing. <span>A Playlist Generator.</span></h1>
        <form role="search" aria-labelledby="search" onSubmit={props.handleSubmit}>
          <div className="countryInput">

            <label>Please select your country:</label>

            <div className="radio">
              <span>
                <input type="radio"
                  name="userCountry"
                  id="us"
                  value="US"
                  checked={props.userCountry === 'US'}
                  onChange={props.handleChange} />
                <label htmlFor="us">US</label>
              </span>
            </div>

            <div className="radio">
              <span>
                <input type="radio"
                  name="userCountry"
                  id="canada"
                  value="CA"
                  onChange={props.handleChange}
                  checked={props.userCountry === 'CA'} />
                <label htmlFor="canada">Canada</label>
              </span>
            </div>
          </div>


          {/* end of country input*/}

          <label htmlFor="userInput">What are you searching for?</label>
          <input
            id="userInput"
            name="userInput"
            value={props.userInput}
            onChange={props.handleChange}
            type="text"
            placeholder="Enter artist, song or music genre" />
          {/* end of text input */}

          <input type="submit" value="Search" />
        </form>
      </div>

      <div className="search" id="search">
        <div className="wrapper">
          {props.resultsIsShowing && <SearchResult music={props.music} />}
          {props.isLoading
            ? <p>Loading...</p>
            : <SongContainer
              music={props.music}
              addSong={props.addSong}
              audioPlay={props.audioPlay}
              audioPlaying={props.audioPlaying}
            />}
        </div>
        <Footer />
      </div>
    </>
  )
}
export default Home;