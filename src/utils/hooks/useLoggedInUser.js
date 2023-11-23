import {useContext} from "react";
import {LoginContext} from "../contexts/loginContext.js";

function useLoggedInUser() {
  const {user} = useContext(LoginContext);
  return user?.uid ? user : null
}

export default useLoggedInUser;