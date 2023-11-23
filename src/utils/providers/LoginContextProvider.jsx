import React, {useEffect, useState} from "react";
import {LoginContext} from "../contexts/loginContext.js";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../services/authService";
import {useLocation, useNavigate} from "react-router-dom";
import frontendPaths from "../values/frontendPaths";
import FullPageLoader from "../../components/FullPageLoader";

const protectedRoutes = [
  frontendPaths.files,
  frontendPaths.add_file
]

function LoginContextProvider({children}) {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && protectedRoutes.includes(location.pathname) && !user) {
      navigate(frontendPaths.login);
    }
  }, [navigate, location, user, loading])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    })
    return () => {
      unsubscribe();
    }
  }, [])

  return (
    <LoginContext.Provider value={{
      user,
      setUser
    }}>
      {
        loading ?
          <FullPageLoader/> :
          children
      }
    </LoginContext.Provider>
  );
}

export default LoginContextProvider;