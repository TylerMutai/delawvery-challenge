import {useCallback, useEffect, useState} from 'react';
import useNetworkRequest from "./useNetworkRequest.js";
import {listFileData} from "../services/fileDataService";

/**
 *
 * @return {({}|(function(null=): Promise<void>)|*|(function(): void)|*[])[]}
 */
function useFilesList() {
  const [files, setFiles] = useState([]);
  const handleListFiles = useCallback(() => listFileData(), []);

  const handleSuccess = useCallback((data) => {
    setFiles(data);
  }, [])
  const [isLoading, handleSubmit] = useNetworkRequest(handleListFiles, handleSuccess)

  useEffect(() => {
    handleSubmit().then();
  }, [handleSubmit])

  return [isLoading, files];
}

export default useFilesList;