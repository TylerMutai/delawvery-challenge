import React, {useCallback, useState} from 'react';
import {Button, CardBody, Flex, FormControl, FormLabel, Heading, Icon, Input, Stack} from "@chakra-ui/react";
import strings from "../utils/localization/main";
import useNetworkRequest from "../utils/hooks/useNetworkRequest";
import {signIn} from "../utils/services/authService";
import {useNavigate} from "react-router-dom";
import frontendPaths from "../utils/values/frontendPaths";
import CustomCardHeader from "../components/CustomCardHeader";
import CustomCard from "../components/CustomCard";
import {RiShieldUserLine} from "react-icons/ri";
import CustomCardFooter from "../components/CustomCardFooter";

function LoginPage() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleChange = useCallback(e => (
    setUser({...user, [e.target.name]: e.target.value})
  ), [user])

  const handleLogin = useCallback(() => {
    return signIn(user);
  }, [user])

  const handleSuccess = useCallback(() => {
    navigate(frontendPaths.add_file);
  }, [navigate])

  const [isLoading, handleSubmit] = useNetworkRequest(handleLogin, handleSuccess);

  return (
    <Flex w={"100%"} minH={"100vh"} flexDirection={"column"}
          justifyContent={"center"} alignItems={"center"}>
      <CustomCard>
        <CustomCardHeader>
          <Icon as={RiShieldUserLine}/>
          <Heading size='md'>{strings.login}</Heading>
        </CustomCardHeader>
        <CardBody>
          <Stack spacing='6'>
            <FormControl>
              <FormLabel>{strings.email}</FormLabel>
              <Input type='email' name={"email"} value={user?.email || ""} onChange={handleChange} isRequired={true}/>
            </FormControl>
            <FormControl>
              <FormLabel>{strings.password}</FormLabel>
              <Input type='password' name={"password"} value={user?.password || ""} onChange={handleChange}
                     isRequired={true}/>
            </FormControl>
          </Stack>
        </CardBody>
        <CustomCardFooter>
          <Button isLoading={isLoading} onClick={handleSubmit}>
            {strings.login}
          </Button>
        </CustomCardFooter>
      </CustomCard>
    </Flex>
  );
}

export default LoginPage;