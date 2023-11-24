import React, {useCallback} from 'react';
import {Box, Button, Card, CardBody, Flex, Heading, Icon, Stack, Text,} from "@chakra-ui/react";
import strings from "../utils/localization/main";
import useFilesList from "../utils/hooks/useFilesList";
import FullPageLoader from "../components/FullPageLoader";
import {useNavigate} from "react-router-dom";
import frontendPaths from "../utils/values/frontendPaths";
import {getExtension, getFileIcon} from "../utils/types/file";
import DeleteFile from "../components/DeleteFile";
import {FiDownload} from "react-icons/fi";

function FilesListPage() {
  const [isLoading, files, handleSubmit] = useFilesList();
  const navigate = useNavigate();

  const _handleSubmit = useCallback((file) => {
    window.open(file.fileUrl);
  }, [])

  return (
    isLoading ? <FullPageLoader/> :
      <Flex w={"100%"} minH={"100vh"} flexDirection={"column"}
            justifyContent={"start"} alignItems={"start"} px={"30px"} py={"30px"}>
        {files.length === 0 ? <>
          <Text mb={"15px"}>{strings.no_files_found}</Text>
          <Button isLoading={isLoading} onClick={() => navigate(frontendPaths.add_file)}>
            {strings.upload_file}
          </Button>
        </> : null}
        <Flex gap={"24px"} justifyContent={"flex-start"} alignItems={"center"} flexWrap={"wrap"}>
          {
            files.map(f => (
              <Card key={f.id} w={"170px"} background={"white"} boxShadow={"none"}>
                <CardBody>
                  <Stack spacing='6'>
                    {getFileIcon(getExtension(f.fileName || ""))}
                    <Box>
                      <Heading size='sm' textTransform='capitalize'>
                        {f.fileName} {" "}
                      </Heading>
                      <Text pt='2' fontSize='sm'>
                        {f.filePages}{" "}{strings.pages}
                      </Text>
                    </Box>
                    <Flex alignItems={"center"} justifyContent={"space-between"} gap={"8px"}>
                      <DeleteFile file={f} afterDelete={handleSubmit}/>
                      <Button size={"sm"} onClick={() => _handleSubmit(f)} fontSize={"sm"}>
                        <Icon as={FiDownload}/>
                      </Button>
                    </Flex>
                  </Stack>
                </CardBody>
              </Card>
            ))
          }
        </Flex>
      </Flex>
  );
}

export default FilesListPage;