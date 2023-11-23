import React from 'react';
import {Flex, Spinner} from "@chakra-ui/react";

function FullPageLoader() {
  return (
    <Flex w={"100%"} h={"100vh"} flexDirection={"column"}
          justifyContent={"center"} alignItems={"center"}
          paddingX={"5rem"}>
      <Spinner size='xl'/>
    </Flex>
  );
}

export default FullPageLoader;