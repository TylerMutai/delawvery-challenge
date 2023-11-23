import React, {useEffect} from 'react';
import {Flex, Spinner} from "@chakra-ui/react";
import useLoggedInUser from "../utils/hooks/useLoggedInUser";
import {useNavigate} from "react-router-dom";
import frontendPaths from "../utils/values/frontendPaths";

function HomePage() {
  const user = useLoggedInUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate(frontendPaths.login)
    } else {
      navigate(frontendPaths.files);
    }
  }, [navigate, user])
  return (
    <Flex w={"100%"} h={"100vh"} flexDirection={"column"}
          justifyContent={"center"} alignItems={"center"}
          paddingX={"5rem"}>
      <Spinner size='xl'/>
    </Flex>
  );
}

export default HomePage;