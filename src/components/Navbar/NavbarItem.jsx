import React, {useCallback, useEffect, useState} from 'react';
import {Flex} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {useLocation, useNavigate} from "react-router-dom";
import frontendPaths from "../../utils/values/frontendPaths";


function NavbarItem({to, children}) {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (to === frontendPaths.index) {
      if (location.pathname === to) {
        setIsActive(true);
        return;
      }
    } else {
      if (location.pathname === to) {
        setIsActive(true);
        return;
      }
    }
    setIsActive(false);
  }, [to, location])

  const handleNavigation = useCallback(() => {
    navigate(to);
  }, [to, navigate]);

  return (
    <Flex alignItems={"center"}
          flexDirection={"column"}
          justifyContent={"start"}
          role={"group"}
          cursor={"pointer"}
          onClick={handleNavigation}
          gap={"8px"}>
      {children}
      <Flex w={isActive ? "50%" : "0"} h={"4px"}
            transition={"all ease-in-out .5s"}
            _groupHover={{
              width: "110%"
            }}
            borderRadius={"4px"} background={"black"}/>
    </Flex>
  );
}

NavbarItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}

export default NavbarItem;