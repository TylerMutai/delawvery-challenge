import React, {useCallback} from 'react';
import {Button, Icon} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {deleteFileData} from "../utils/services/fileDataService";
import useNetworkRequest from "../utils/hooks/useNetworkRequest";
import {FaRegTrashAlt} from "react-icons/fa";
import useLoggedInUser from "../utils/hooks/useLoggedInUser";
import Swal from "sweetalert2";
import strings from "../utils/localization/main";

function DeleteFile({file, afterDelete}) {
  const user = useLoggedInUser();

  const handleDelete = useCallback(() => {
    return deleteFileData(file, user);
  }, [file, user])

  const [isLoading, handleSubmit] = useNetworkRequest(handleDelete, afterDelete);

  const _handleSubmit = useCallback(async () => {
    const res = await Swal.fire({
      icon: "info",
      title: strings.information,
      text: strings.file_deleted_confirmation,
      showCancelButton: true
    });
    if (res.isConfirmed) {
      handleSubmit().then();
    }
  }, [handleSubmit])
  return (
    <Button isLoading={isLoading} size={"sm"} colorScheme={"red"} fontSize={"sm"} onClick={_handleSubmit}>
      <Icon as={FaRegTrashAlt}/>
    </Button>
  );
}

DeleteFile.propTypes = {
  file: PropTypes.object,
  afterDelete: PropTypes.func
}
export default DeleteFile;