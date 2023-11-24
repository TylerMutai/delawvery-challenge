import {fontSizeExtraExtraExtraLarge} from "../values/theme";
import {Icon} from "@chakra-ui/react";
import {FaRegFileImage, FaRegFilePdf, FaRegFileWord} from "react-icons/fa";

const supportedExtensions = [
  "pdf",
  "docx",
  "doc"
]
const getFileIcon = (ext) => {
  switch (ext) {
    case "pdf":
      return <Icon as={FaRegFilePdf} fontSize={fontSizeExtraExtraExtraLarge}/>
    case "doc":
    case "docx":
      return <Icon as={FaRegFileWord} fontSize={fontSizeExtraExtraExtraLarge}/>
    default:
      return <Icon as={FaRegFileImage} fontSize={fontSizeExtraExtraExtraLarge}/>
  }
}

const getExtension = (name) => {
  return name.split('.').pop();
}

export {supportedExtensions, getExtension, getFileIcon}