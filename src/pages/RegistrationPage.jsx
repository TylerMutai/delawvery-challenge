import React from 'react';
import {
  Button,
  Card,
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

function RegistrationPage(props) {
  return (
    <Flex w={"100%"} h={"100vh"} flexDirection={"column"}
          justifyContent={"center"} alignItems={"center"}
          paddingX={"5rem"}>
      <Card>
        <CardHeader>
          <Heading size='md'>{strings.register}</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider/>} spacing='4'>
            <FormControl>
              <FormLabel>{strings.email}</FormLabel>
              <Input type='email' name={"email"}/>
              <FormHelperText>{strings.wont_share_email}</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>{strings.password}</FormLabel>
              <Input type='password' name={"password"}/>
            </FormControl>
            <FormControl>
              <FormLabel>{strings.confirm_password}</FormLabel>
              <Input type='password' name={"confirm_password"}/>
            </FormControl>
          </Stack>
        </CardBody>
        <CardFooter>
          <Button colorScheme={"blue"}>
            {strings.register}
          </Button>
        </CardFooter>
      </Card>
    </Flex>
  );
}

export default RegistrationPage;