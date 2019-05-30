import React, { Fragment } from 'react'; 
import Form from "./Form";
import SearchResult from './SearchResult';
import SongContainer from './SongContainer';
import Footer from './Footer';

const Home = (props) => {
  return(
    <Fragment>
      <Form
        userInput={props.userInput}
        userCountry={props.userCountry}
        handleChange={props.handleChange}
        handleSubmit={props.handleSubmit}
      />

      <SearchResult />

      {props.isLoading
        ? <p>Loading...</p>
        : <SongContainer
          music={props.music}
          addSong={props.addSong}
        />}

      <Footer />

    </Fragment>
  )
}
export default Home;