import React, {useCallback} from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import strings from "../utils/localization/main";
import useFilesList from "../utils/hooks/useFilesList";
import FullPageLoader from "../components/FullPageLoader";
import {useNavigate} from "react-router-dom";
import frontendPaths from "../utils/values/frontendPaths";

function FilesListPage() {
  const [isLoading, files] = useFilesList();
  const navigate = useNavigate();

  const _handleSubmit = useCallback((file) => {
    window.open(file.fileUrl);
  }, [])

  return (
    isLoading ? <FullPageLoader/> :
      <Flex w={"100%"} h={"100%"} flexDirection={"column"}
            justifyContent={"start"} alignItems={"start"} px={"30px"} py={"30px"}>
        {files.length === 0 ? <>
          <Text mb={"15px"}>{strings.no_files_found}</Text>
          <Button colorScheme={"blue"} isLoading={isLoading} onClick={() => navigate(frontendPaths.add_file)}>
            {strings.upload_file}
          </Button>
        </> : null}
        {
          files.map(f => (
            <Card key={f.id} w={"100%"} mb={"20px"}>
              <CardHeader>
                <Heading size='md'>{f.fileName}</Heading>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider/>} spacing='4'>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      {strings.number_of_pages}
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                      {f.filePages}
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
              <CardFooter>
                <Button colorScheme={"blue"} isLoading={isLoading} onClick={() => _handleSubmit(f)}>
                  {strings.download_file}
                </Button>
              </CardFooter>
            </Card>
          ))
        }
      </Flex>
  );
}

export default FilesListPage;