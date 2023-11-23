import React, {useCallback, useState} from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  StackDivider
} from "@chakra-ui/react";
import strings from "../utils/localization/main";
import useNetworkRequest from "../utils/hooks/useNetworkRequest";
import {signIn} from "../utils/services/authService";
import {useNavigate} from "react-router-dom";
import frontendPaths from "../utils/values/frontendPaths";

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
    <Flex w={"100%"} h={"100vh"} flexDirection={"column"}
          justifyContent={"center"} alignItems={"center"}>
      <Card w={{
        base: "100%",
        md: "70%",
        lg: "50%"
      }}>
        <CardHeader>
          <Heading size='md'>{strings.login}</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider/>} spacing='4'>
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
        <CardFooter>
          <Button colorScheme={"blue"} isLoading={isLoading} onClick={handleSubmit}>
            {strings.login}
          </Button>
        </CardFooter>
      </Card>
    </Flex>
  );
}

export default LoginPage;