import {chakra} from "@chakra-ui/react";
import {NavLink} from "react-router-dom";
import LanguageSwitch from "./LanguageSwitch";
import useLoggedInUser from "../utils/hooks/useLoggedInUser";


const NavBar = () => {
  const user = useLoggedInUser();

  return (
    <chakra.nav display={"flex"} flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-between"} w={"100%"}
                py={"20px"} px={"20px"} bg={"turquoise"}>
      {user?.id ? <NavLink to={"/"}>Home</NavLink> : null}
      <NavLink to={"/login"}>Login</NavLink>
      <NavLink to={"/registration"}>Registration</NavLink>
      {user?.id ? <NavLink to={"/files"}>Files</NavLink> : null}
      <LanguageSwitch/>
    </chakra.nav>
  )
}

export default NavBar