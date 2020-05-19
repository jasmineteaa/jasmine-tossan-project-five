import * as React from 'react';
import { connect } from 'react-redux';

interface ISearchResultComponentProps {
  numSongs: number;
}

const SearchResult: React.FC<ISearchResultComponentProps> = ({ numSongs }): JSX.Element => {
  return (
    <div className="searchResults">
      <h3>Click on the album covers below to preview your track</h3>
      <p>Your search returned {numSongs} results</p>
    </div>
  )
}

const mapStateToProps = ({ songs }) => {
  return {
    numSongs: songs.get('searchedSongs').size
  }
}
export default connect(mapStateToProps)(SearchResult);