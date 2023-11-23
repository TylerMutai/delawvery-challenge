import {useCallback, useEffect, useState} from "react";
import {FilesContext} from "../contexts/filesContext.js";
import useNetworkRequest from "../hooks/useNetworkRequest.js";
import useLoggedInUser from "../hooks/useLoggedInUser.js";
import {getShows} from "../services/filesService.js";
import BottomPageLoader from "../../components/Loaders/BottomPageLoader.jsx";

function FilesContextProvider({children}) {
  const [showSearchData, setShowSearchData] = useState({});
  const [shows, setShows] = useState([]);
  const [currentShowId, setCurrentShowId] = useState();
  const user = useLoggedInUser();

  const handleGetEvents = useCallback(() => {
    return getShows(showSearchData);
  }, [showSearchData])

  const [isLoading, res, handleSubmit] = useNetworkRequest(handleGetEvents)

  useEffect(() => {
    if (res?.Data) {
      setShows(res.Data);
    }
  }, [res])

  useEffect(() => {
    if (user?.id) {
      handleSubmit();
    }
  }, [handleSubmit, user, showSearchData])

  return (
    <FilesContext.Provider value={{
      shows,
      res,
      showSearchData,
      setShowSearchData,
      getShows: handleSubmit,
      currentShowId,
      setCurrentShowId
    }}>
      {isLoading ? <BottomPageLoader/> : null}

      {children}
    </FilesContext.Provider>
  );
}

export default FilesContextProvider;