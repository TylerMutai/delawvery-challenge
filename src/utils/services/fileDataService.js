import {app} from "../helpers/firebase";
import strings from "../localization/main";
import Swal from "sweetalert2";
import {parseErrorResponse} from "../helpers/errorHandling";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firestore = getFirestore(app);
const storage = getStorage(app);

const entityName = "userFiles";

/**
 *
 * @param {number} filePages
 * @param {File} file
 * @returns {Promise<any>}
 */
const createFileData = async (filePages, file) => {

  // File upload
  try {
    const storageRef = storage.ref();
    const fileName = `${new Date().getTime()}-${file.name}`;
    storageRef.child(fileName);
    await storageRef.put(file);
    const data = {
      filePages: filePages,
      fileUrl: await storageRef.getDownloadURL()
    };

    try {
      const docRef = await firestore.collection(entityName).add(data);
      Swal.fire({
        icon: "success",
        title: strings.success,
        text: strings.file_uploaded_success
      }).then();
      return {...data, id: docRef.id};
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: strings.error,
        text: parseErrorResponse(e)
      }).then();
    }
  } catch (e) {
    Swal.fire({
      icon: "error",
      title: strings.error,
      html: parseErrorResponse(e)
    }).then();
  }
}

/**
 *
 * @returns {Promise<any>}
 */
const listFileData = async () => {
  try {
    const docs = await firestore.collection(entityName).get();
    const data = [];
    docs.forEach(doc => {
      data.push({
        id: doc.id,
        ...doc.data()
      })
    })
    return data;
  } catch (e) {
    Swal.fire({
      icon: "error",
      title: strings.error,
      html: parseErrorResponse(e)
    }).then();
  }
}

export {createFileData, listFileData};