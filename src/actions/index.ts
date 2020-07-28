import { Dispatch } from "redux";
import { List, fromJS, Map } from "immutable";
import Axios from "axios";
import firebase from "../firebase";

interface ISongObj {
  artistName: string;
  artworkUrl100: string;
  trackName: string;
  previewUrl: string;
}

export enum ActionTypes {
  LOADING_SEARCH = 'LOADING_SEARCH',
  SEARCH_SONGS = 'SEARCH_SONGS',
  ADD_SONG = 'ADD_SONG',
  REMOVE_SONG = 'REMOVE_SONG',
  GET_PLAYLIST = 'GET_PLAYLIST',
  SET_SHOW_RESULTS = 'SET_SHOW_RESULTS',
}


export interface ISetSearchLoading {
  type: ActionTypes.LOADING_SEARCH;
  payload: boolean;
}
export interface ISetShowResults {
  type: ActionTypes.SET_SHOW_RESULTS;
  payload: boolean;
}
export interface ISearchSongs {
  type: ActionTypes.SEARCH_SONGS;
  payload: List<any> //@@TODO fix typing
}
export interface IAddSong {
  type: ActionTypes.ADD_SONG;
  payload: Map<string, any>;
}
export interface IRemoveSong {
  type: ActionTypes.REMOVE_SONG;
  payload: string;
}

export interface IGetPlaylist {
  type: ActionTypes.GET_PLAYLIST;
  payload: Map<string, any>;
}
export const setSearchLoading = (isLoading: boolean): ISetSearchLoading => {
  return {
    type: ActionTypes.LOADING_SEARCH,
    payload: isLoading
  }
}
export const setShowResults = (showResults: boolean): ISetShowResults => {
  return {
    type: ActionTypes.SET_SHOW_RESULTS,
    payload: showResults
  }
}

export const searchSongs = (term: string, country: string) => async (dispatch: Dispatch) => {
  dispatch<ISetSearchLoading>({
    type: ActionTypes.LOADING_SEARCH,
    payload: true
  });

  try {
    const res = await Axios.request({
      url: 'https://itunes.apple.com/search',
      method: 'GET',
      params: {
        term,
        country,
        limit: 15,
        media: 'music',
      }
    });
    if (res) {
      const immutableData = fromJS(res);
      const results: List<any> = immutableData.getIn(['data', 'results']);

      dispatch<ISearchSongs>({
        type: ActionTypes.SEARCH_SONGS,
        payload: results
      })
      dispatch<ISetSearchLoading>({
        type: ActionTypes.LOADING_SEARCH,
        payload: false
      })
    }
  } catch (e) {
    console.error('searchSongs failed', { e })

  }
}

export const removeSong = (key: string): IRemoveSong => {
  return {
    type: ActionTypes.REMOVE_SONG,
    payload: key
  }
}
export const addSong = (song: Map<string, any>) => async (dispatch: Dispatch) => {
  const dbRef = firebase.database().ref();
  try {
    await dbRef.push(song.toJS());
    // writing into db - single source of truth

  } catch (e) {
    console.error('addSong failed', { e });
  }
}

export const getPlaylist = (playlist: Map<number, any>) => {
  return {
    type: ActionTypes.GET_PLAYLIST,
    payload: playlist || Map()
  }
}

// export class setSearchLoading implements IAction {
//   public type = ActionTypes.LOADING_SEARCH;
//   constructor(
//     public payload: boolean
//   ) { }
// }