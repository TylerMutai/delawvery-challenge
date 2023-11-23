import {CircularProgress, Flex, Text} from "@chakra-ui/react";
import {useCallback, useEffect} from "react";
import strings from "../utils/localization/main";
import {signOut} from "../utils/services/authService";
import useNetworkRequest from "../utils/hooks/useNetworkRequest";
import {useNavigate} from "react-router-dom";
import frontendPaths from "../utils/values/frontendPaths";

function LogoutPage() {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    return signOut();
  }, [])

  const handleSuccess = useCallback(() => {
    navigate(frontendPaths.login);
  }, [navigate])

  const [isLoading, handleSubmit] = useNetworkRequest(handleLogout, handleSuccess);

  useEffect(() => {
    handleSubmit().then();
  }, [handleSubmit])
  return (
    <Flex h={"100vh"} w={"100%"} alignItems={"center"} justifyContent={"center"}>
      {isLoading ? <CircularProgress isIndeterminate={true}/> :
        <Text>{strings.error_occurred_refresh_page}</Text>
      }
      <Flex h={"24px"}/>
      <Text>{strings.logging_out}</Text>
    </Flex>
  );
}

export default LogoutPage;