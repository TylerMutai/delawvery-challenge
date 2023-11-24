import React from 'react';
import {backgroundColor} from "../utils/values/theme";
import {CardFooter} from "@chakra-ui/react";

function CustomCardFooter({children}) {
  return (
    <CardFooter borderTop={`4px solid ${backgroundColor}`}
                display={"flex"} alignItems={"center"} gap={"14px"}>
      {children}
    </CardFooter>
  );
}

CustomCardFooter.propTypes = {}

export default CustomCardFooter;