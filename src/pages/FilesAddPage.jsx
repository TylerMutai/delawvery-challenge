import React, {useCallback, useState} from 'react';
import {useNavigate} from "react-router-dom";
import frontendPaths from "../utils/values/frontendPaths";
import useNetworkRequest from "../utils/hooks/useNetworkRequest";
import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Stack,
  StackDivider,
  Text
} from "@chakra-ui/react";
import CustomCard from "../components/CustomCard";
import strings from "../utils/localization/main";
import {createFileData} from "../utils/services/fileDataService";
import Swal from "sweetalert2";
import * as pdfjsLib from "pdfjs-dist";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import useLoggedInUser from "../utils/hooks/useLoggedInUser";

// set up fake worker for the browser.
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

const supportedExtensions = [
  "pdf",
  "docx",
  "doc"
]

function FilesAddPage() {
  const [file, setFile] = useState();
  const [filePages, setFilePages] = useState();
  const navigate = useNavigate();
  const [processingFile, setProcessingFile] = useState(false);
  const user = useLoggedInUser();

  const handleFileChange = useCallback(async e => {
    const file = e.target.files[0];
    if (!file) return;
    setProcessingFile(true);
    const extension = file.name.split('.').pop();
    if (supportedExtensions.includes(extension)) {
      try {
        const buffer = await file.arrayBuffer();
        let numPages = 0;
        switch (extension) {
          case "pdf":
            const pdf = await pdfjsLib.getDocument(buffer).promise;
            numPages = pdf.numPages;
            break;
          case "doc":
          case "docx":
            const doc = new Docxtemplater().loadZip(new PizZip(buffer));
            const content = doc.getZip().file("word/document.xml").asText();
            const lastRenderedPageBreaks = content.match(/<w:lastRenderedPageBreak[^>]*>/g);
            numPages = lastRenderedPageBreaks ? lastRenderedPageBreaks.length + 1 : 1;
            Swal.fire({
              icon: "info",
              title: strings.information,
              text: strings.pages_approximated_for_word_doc
            }).then()
            break;
          default:
            break;
        }
        setFilePages(numPages);
      } catch (e) {
        console.log(e);
        Swal.fire({
          icon: "error",
          title: strings.error,
          text: strings.could_not_read_file
        }).then()
      }
    } else {
      Swal.fire({
        icon: "info",
        title: strings.information,
        text: strings.please_specify_number_of_pages
      }).then()
    }
    setFile(file);
    setProcessingFile(false);
  }, [])

  const handlePagesChange = useCallback(e => {
    const val = parseInt(e.target.value);
    if (!isNaN(val)) {
      setFilePages(val);
    }
  }, [])

  const handleFileUpload = useCallback(() => {
    return createFileData(filePages, file, user);
  }, [filePages, file, user])

  const handleSuccess = useCallback(() => {
    navigate(frontendPaths.files);
  }, [navigate])

  const [isLoading, handleSubmit] = useNetworkRequest(handleFileUpload, handleSuccess);

  const _handleSubmit = useCallback(() => {
    if (!file || !filePages) {
      Swal.fire({
        icon: "error",
        title: strings.error,
        text: strings.upload_a_file_and_set_pages
      }).then()
      return;
    }
    handleSubmit().then();
  }, [handleSubmit, file, filePages]);

  return (
    <Flex w={"100%"} minH={"100vh"} flexDirection={"column"}
          justifyContent={"center"} alignItems={"center"}>
      {processingFile ?
        <Flex w={"100%"} h={"100%"} gap={"30px"} alignItems={"center"} justifyContent={"center"}
              flexDirection={"column"}
              position={"fixed"} top={"0"}
              zIndex={10} background={"rgb(0,0,0,.5)"}>
          <Spinner size='xl' color={"white"}/>
          <Text background={"white"} px={"20px"} py={"6px"} borderRadius={"10px"}>
            {strings.processing_file}
          </Text>
        </Flex> : null}
      <CustomCard>
        <CardHeader>
          <Heading size='md'>{strings.upload_file}</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider/>} spacing='4'>
            <FormControl>
              <FormLabel>{strings.file}</FormLabel>
              <Input type='file' name={"file"} onChange={handleFileChange} isRequired={true}/>
            </FormControl>
            <FormControl>
              <FormLabel>{strings.number_of_pages}</FormLabel>
              <Input type='number' placeholder={strings.number_of_pages} name={"filePages"} value={filePages || ""}
                     onChange={handlePagesChange}
                     isRequired={true}/>
            </FormControl>
          </Stack>
        </CardBody>
        <CardFooter>
          <Button colorScheme={"blue"} isLoading={isLoading} onClick={_handleSubmit}>
            {strings.upload_file}
          </Button>
        </CardFooter>
      </CustomCard>
    </Flex>
  );
}

export default FilesAddPage;