import React, {useEffect} from 'react';
import {Flex, Spinner} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import frontendPaths from "../utils/values/frontendPaths";

function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(frontendPaths.files);
  }, [navigate])

  return (
    <Flex w={"100%"} h={"100%"} flexDirection={"column"}
          justifyContent={"center"} alignItems={"center"}
          paddingX={"5rem"}>
      <Spinner size='xl'/>
    </Flex>
  );
}

export default HomePage;