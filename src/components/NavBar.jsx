import {chakra} from "@chakra-ui/react";
import {NavLink} from "react-router-dom";
import LanguageSwitch from "./LanguageSwitch";
import useLoggedInUser from "../utils/hooks/useLoggedInUser";
import frontendPaths from "../utils/values/frontendPaths";
import strings from "../utils/localization/main";


const NavBar = () => {
  const user = useLoggedInUser();

  return (
    <chakra.nav display={"flex"} flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-between"} w={"100%"}
                py={"20px"} px={"20px"} bg={"turquoise"}>
      {user?.uid ? <NavLink to={"/"}>{strings.home}</NavLink> : null}
      {!user?.uid ?
        <NavLink to={frontendPaths.login}>{strings.login}</NavLink> :
        <NavLink to={frontendPaths.logout}>{user?.email}({strings.logout})</NavLink>
      }
      {!user?.uid ? <NavLink to={frontendPaths.registration}>{strings.register}</NavLink> : null}
      {user?.uid ? <NavLink to={frontendPaths.files}>{strings.files}</NavLink> : null}
      {user?.uid ? <NavLink to={frontendPaths.add_file}>{strings.upload_file}</NavLink> : null}
      <LanguageSwitch/>
    </chakra.nav>
  )
}

export default NavBar