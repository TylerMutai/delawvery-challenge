import {useEffect, useState} from "react";
import {LoginContext} from "../contexts/loginContext.js";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../services/authService";

function LoginContextProvider({children}) {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
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
      {children}
    </LoginContext.Provider>
  );
}

export default LoginContextProvider;