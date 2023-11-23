import {createContext} from "react";

/**
 *
 * @type {{
 *   user: import("../types/user.js").User,
 *   setUser: function,
 * }} LoginContextType
 */
const loginContextDefaults = {
  user: {},
  setUser: () => {
  }
}

/**
 *
 * @type {React.Context<{user: import("../types/user.js").User, setUser: Function}>}
 */
const LoginContext = createContext(loginContextDefaults)

export {LoginContext, loginContextDefaults}