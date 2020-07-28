import { fromJS, Map, List } from 'immutable';
import { ActionTypes, ISetSearchLoading, ISearchSongs, IAddSong, IGetPlaylist, IRemoveSong } from '../actions';
import { Action } from 'redux';

export interface ISongReducerState {
  loadingSearch: boolean;
  searchedSongs: List<any>;
  playlist: Map<string, Map<string, any>>;
  showResults: boolean;
}

const INITIAL_STATE = fromJS({
  loadingSearch: false,
  searchedSongs: [],
  playlist: {},
  showResults: false,
})

export default (state: Map<keyof ISongReducerState, any> = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case ActionTypes.LOADING_SEARCH: {
      const {
        payload
      } = action as ISetSearchLoading;
      return state.set('loadingSearch', payload);
    }
    case ActionTypes.SEARCH_SONGS: {
      const {
        payload
      } = action as ISearchSongs;
      return state.withMutations(ctx => {
        ctx.set('searchedSongs', payload);
        ctx.set('showResults', true);
      })
    }
    case ActionTypes.ADD_SONG: {
      const {
        payload
      } = action as IAddSong;
      return state.set('playlist', payload);
    }
    case ActionTypes.REMOVE_SONG: {
      const {
        payload
      } = action as IRemoveSong;
      console.log(payload);
      console.log(state.get('playlist'))
      return state.deleteIn(['playlist', payload]);
    }
    case ActionTypes.GET_PLAYLIST: {
      const {
        payload
      } = action as IGetPlaylist;
      return state.set('playlist', payload)
    }
    default: {
      return state;
    }
  }
}