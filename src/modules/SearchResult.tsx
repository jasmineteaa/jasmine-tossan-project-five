import * as React from 'react';

// @@TODO fix typing
interface ISearchResultComponentProps {
  music: any;
}

const SearchResult: React.FC<ISearchResultComponentProps> = (props): JSX.Element => {
  return (
    <div className="searchResults">
      <h3>Click on the album covers below to preview your track</h3>
      <p>Your search returned {props.music.length} results</p>
    </div>
  )
}


export default SearchResult;