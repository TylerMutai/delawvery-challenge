import {Flex, Heading} from "@chakra-ui/react";
import {NavLink} from "react-router-dom";
import strings from "../utils/localization/main";


function NotFound() {
  return (
    <Flex w={"100vw"} h={"100vw"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
      <Heading>
        404 {strings.not_found}
      </Heading>
      <NavLink to={"/login"}>
        {strings.login}
      </NavLink>
    </Flex>
  );
}

export default NotFound;