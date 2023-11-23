import {useCallback, useEffect, useState} from 'react';
import {getUsers} from "../services/userService.js";
import useNetworkRequest from "./useNetworkRequest.js";

/**
 *
 * @return {JSX.Element}
 */
function useFilesList() {
  const [artists, setArtists] = useState([]);
  const handleGetArtists = useCallback(() => getUsers({role: "artist"}), []);
  const [isLoading, res, handleSubmit] = useNetworkRequest(handleGetArtists)

  useEffect(() => {
    if (res.data) {
      setArtists(res.data);
    }
  }, [res])

  useEffect(() => {
    handleSubmit();
  }, [handleSubmit])

  return [isLoading, artists, res];
}

export default useFilesList;