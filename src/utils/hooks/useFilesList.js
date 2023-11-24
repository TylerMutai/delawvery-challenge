import {useCallback, useEffect, useState} from 'react';
import useNetworkRequest from "./useNetworkRequest.js";
import {listFileData} from "../services/fileDataService";
import useLoggedInUser from "./useLoggedInUser";

/**
 *
 * @return {({}|(function(null=): Promise<void>)|*|(function(): void)|*[])[]}
 */
function useFilesList() {
  const [files, setFiles] = useState([]);
  const user = useLoggedInUser();
  const handleListFiles = useCallback(() => user ? listFileData(user) : null, [user]);

  const handleSuccess = useCallback((data) => {
    setFiles(data);
  }, [])
  const [isLoading, handleSubmit] = useNetworkRequest(handleListFiles, handleSuccess)

  useEffect(() => {
    handleSubmit().then();
  }, [handleSubmit])

  return [isLoading, files, handleSubmit];
}

export default useFilesList;