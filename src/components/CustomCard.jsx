import React from 'react';
import {Card} from "@chakra-ui/react";

function CustomCard(props) {
  return (
    <Card w={{
      base: "100%",
      md: "70%",
      lg: "50%"
    }} borderRadius={"14px"} boxShadow={"none"}>
      {props.children}
    </Card>
  );
}

CustomCard.propTypes = {}

export default CustomCard;