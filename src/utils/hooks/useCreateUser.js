import {useCallback, useContext, useState} from 'react';
import {createUser} from "../services/userService.js";
import {LoginContext} from "../contexts/loginContext.js";

/**
 *
 * @param {import("../types/user.js").User} user
 * @param {function} successCallback
 * @return {JSX.Element}
 */
function useCreateUser(user, successCallback) {
  const [isLoading, setIsLoading] = useState();
  const [res, setRes] = useState({});
  const {setUser} = useContext(LoginContext);

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    const res = await createUser(user);
    setRes(res);
    if (res?.StatusCode === 0) {
      setUser({
        msisdn: user.msisdn,
      })
      if (successCallback) {
        successCallback();
      }
    }
    setIsLoading(false);
  }, [user, setUser, successCallback])
  return [isLoading, res, handleSubmit];
}

export default useCreateUser;