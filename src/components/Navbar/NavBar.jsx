import {chakra, Flex} from "@chakra-ui/react";
import LanguageSwitch from "../LanguageSwitch";
import useLoggedInUser from "../../utils/hooks/useLoggedInUser";
import frontendPaths from "../../utils/values/frontendPaths";
import strings from "../../utils/localization/main";
import NavbarItem from "./NavbarItem";


const NavBar = () => {
  const user = useLoggedInUser();

  return (
    <chakra.nav display={"flex"} flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-between"} w={"100%"}
                backgroundColor={"transparent"}
                py={"20px"} px={"20px"}>
      <Flex alignItems={"center"} w={"100%"} gap={"24px"}>
        {user?.uid ? <NavbarItem to={"/"}>{strings.home}</NavbarItem> : null}
        {!user?.uid ?
          <NavbarItem to={frontendPaths.login}>{strings.login}</NavbarItem> :
          <NavbarItem to={frontendPaths.logout}>{user?.email}({strings.logout})</NavbarItem>
        }
        {!user?.uid ? <NavbarItem to={frontendPaths.registration}>{strings.register}</NavbarItem> : null}
        {user?.uid ? <NavbarItem to={frontendPaths.files}>{strings.files}</NavbarItem> : null}
        {user?.uid ? <NavbarItem to={frontendPaths.add_file}>{strings.upload_file}</NavbarItem> : null}
      </Flex>
      <LanguageSwitch/>
    </chakra.nav>
  )
}

export default NavBar