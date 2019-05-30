import React, {Component} from 'react'; 

const SearchResult = (props) => {
  return (
    <p>your search returned {props.resultLength} results</p>
  )
}


export default SearchResult;