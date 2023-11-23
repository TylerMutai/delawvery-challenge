import React, {useCallback, useState} from 'react';
import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  StackDivider
} from "@chakra-ui/react";
import strings from "../utils/localization/main";
import {useNavigate} from "react-router-dom";
import {signUp} from "../utils/services/authService";
import frontendPaths from "../utils/values/frontendPaths";
import useNetworkRequest from "../utils/hooks/useNetworkRequest";
import CustomCard from "../components/CustomCard";
import Swal from "sweetalert2";

function RegistrationPage() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleChange = useCallback(e => (
    setUser({...user, [e.target.name]: e.target.value})
  ), [user])

  const handleRegistration = useCallback(() => {
    return signUp(user);
  }, [user])

  const handleSuccess = useCallback(() => {
    navigate(frontendPaths.login);
  }, [navigate])

  const [isLoading, handleSubmit] = useNetworkRequest(handleRegistration, handleSuccess);

  const _handleSubmit = useCallback(() => {
    if (user.password !== user.confirm_password) {
      Swal.fire({
        icon: "error",
        title: strings.error,
        text: strings.passwords_dont_match
      }).then()
      return;
    }
    handleSubmit().then();
  }, [handleSubmit, user]);

  return (
    <Flex w={"100%"} h={"100%"} flexDirection={"column"}
          justifyContent={"center"} alignItems={"center"}
          paddingX={"5rem"}>
      <CustomCard>
        <CardHeader>
          <Heading size='md'>{strings.register}</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider/>} spacing='4'>
            <FormControl>
              <FormLabel>{strings.email}</FormLabel>
              <Input type='email' name={"email"} onChange={handleChange} isRequired={true}/>
              <FormHelperText>{strings.wont_share_email}</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>{strings.password}</FormLabel>
              <Input type='password' name={"password"} onChange={handleChange} isRequired={true}/>
            </FormControl>
            <FormControl>
              <FormLabel>{strings.confirm_password}</FormLabel>
              <Input type='password' name={"confirm_password"} onChange={handleChange} isRequired={true}/>
            </FormControl>
          </Stack>
        </CardBody>
        <CardFooter>
          <Button colorScheme={"blue"} isLoading={isLoading} onClick={_handleSubmit}>
            {strings.register}
          </Button>
        </CardFooter>
      </CustomCard>
    </Flex>
  );
}

export default RegistrationPage;