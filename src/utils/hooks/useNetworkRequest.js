import {useCallback, useState} from 'react';

/**
 *
 * @param {function} action
 * @param {function} onSuccessCallback
 * @param {function} onErrorCallback
 * @return {({}|(function(null=): Promise<void>)|*|(function(): void))[]}
 */
function useNetworkRequest(action, onSuccessCallback = null, onErrorCallback = null) {
  if (!action) throw Error("action prop is required");
  const [isLoading, setIsLoading] = useState(false);
  const [res, setRes] = useState({});

  const handleSubmit = useCallback(async (data = null) => {
    setIsLoading(true);
    const res = await action(data);
    setRes(res);
    if (res?.StatusCode === 0) {
      if (onSuccessCallback) {
        onSuccessCallback(res, data);
      }
    } else {
      if (onErrorCallback) {
        onErrorCallback(res);
      }
    }
    setIsLoading(false);
  }, [onSuccessCallback, onErrorCallback, action])

  const resetState = useCallback(() => {
    setIsLoading(false);
    setRes({});
  }, [])

  return [isLoading, handleSubmit, res, resetState];
}

export default useNetworkRequest;