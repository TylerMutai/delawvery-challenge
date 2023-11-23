import {createContext} from "react";

/**
 *
 * @type {{
 *  showSearchData: object,
 *  res: object,
 *  setShowSearchData:function,
 *  shows: array,
 *  getShows:function,
 *  currentShowId: string,
 *  setCurrentShowId: function,
 * }}
 */
const showsContextDefaults = {
  showSearchData: {},
  setShowSearchData: () => {
  },
  shows: [],
  res: {},
  getShows: () => {
  },
  currentShowId: null,
  setCurrentShowId: () => {
  },
}

/**
 *
 * @type {React.Context<{showSearchData: Object, res: Object, setShowSearchData: Function, shows: Array, getShows: Function, currentShowId: string, setCurrentShowId: Function}>}
 */
const FilesContext = createContext(showsContextDefaults)

export {FilesContext, showsContextDefaults}