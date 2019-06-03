import React from 'react'; 

const SearchResult = (props) => {
  return (
    <div className="searchResults">
      <h3>Click on the album covers below to preview your track</h3>
      <p>Your search returned {props.music.length} results</p>
    </div>
  )
}


export default SearchResult;