import React from 'react';
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

CustomCardHeader.propTypes = {}

export default CustomCardHeader;