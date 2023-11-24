import React, {useCallback, useEffect, useState} from 'react';
import {Flex} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {useLocation, useNavigate} from "react-router-dom";
import frontendPaths from "../../utils/values/frontendPaths";
import {fontSizeLarge, fontSizeNormal, transition} from "../../utils/values/theme";


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


  const parentStyles = {
    alignItems: "center",
    transition: transition,
    flexDirection: "column",
    justifyContent: "start",
    role: "group",
    cursor: "pointer",
    onClick: handleNavigation,
    color: "#BDBDBD",
    gap: "8px",
    fontSize: fontSizeNormal,
    _hover: {
      fontSize: fontSizeLarge
    }
  }
  const indicatorStyles = {
    w: "0",
    h: "4px",
    transition: transition,
    _groupHover: {
      width: "110%",
    },
    borderRadius: "4px",
    background: "black"
  }

  if (isActive) {
    parentStyles["color"] = "black";
    parentStyles["fontSize"] = fontSizeLarge;
    indicatorStyles["w"] = "50%";
  }

  return (
    <Flex {...parentStyles}>
      {children}
      <Flex {...indicatorStyles}/>
    </Flex>
  );
}

NavbarItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}

export default NavbarItem;