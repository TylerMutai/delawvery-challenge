import React, {useEffect, useState} from "react";
import {LoginContext} from "../contexts/loginContext.js";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../services/authService";
import {useLocation, useNavigate} from "react-router-dom";
import frontendPaths from "../values/frontendPaths";
import {Flex, Spinner} from "@chakra-ui/react";

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
          <Flex w={"100%"} h={"100vh"} flexDirection={"column"}
                justifyContent={"center"} alignItems={"center"}
                paddingX={"5rem"}>
            <Spinner size='xl'/>
          </Flex> :
          children
      }
    </LoginContext.Provider>
  );
}

export default LoginContextProvider;