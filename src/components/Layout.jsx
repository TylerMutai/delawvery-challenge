import {Flex} from "@chakra-ui/react";
import NavBar from "./Navbar/NavBar.jsx";
import Footer from "./Footer";
import {backgroundColor} from "../utils/values/theme";

/**
 *
 * @param {import("@chakra-ui/react").BoxProps} props
 * @returns {JSX.Element}
 * @constructor
 */
function Layout(props) {
  return (
    <Flex background={backgroundColor} flexDirection={"column"} minH={"100vh"} w={"100%"}>
      <NavBar/>
      {props.children}
      <Footer/>
    </Flex>
  );
}

export default Layout;