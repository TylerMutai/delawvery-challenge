import React from 'react';
import PropTypes from "prop-types";
import {CardHeader} from "@chakra-ui/react";
import {backgroundColor, fontSizeExtraExtraLarge} from "../utils/values/theme";

function CustomCardHeader({children}) {
  return (
    <CardHeader borderBottom={`4px solid ${backgroundColor}`}
                fontSize={fontSizeExtraExtraLarge}
                display={"flex"} alignItems={"center"} gap={"14px"}>
      {children}
    </CardHeader>
  );
}

CustomCardHeader.propTypes = {
  children: PropTypes.element
}

export default CustomCardHeader;