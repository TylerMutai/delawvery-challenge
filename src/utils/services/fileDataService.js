import {app} from "../helpers/firebase";
import strings from "../localization/main";
import Swal from "sweetalert2";
import {parseErrorResponse} from "../helpers/errorHandling";
import {addDoc, collection, getDocs, getFirestore} from "firebase/firestore";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {getAnalytics, logEvent} from "firebase/analytics";


const firestore = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

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
    const fileName = `${new Date().getTime()}-${file.name}`;
    const storageRef = ref(storage, fileName);
    await uploadBytes(storageRef, file);
    const data = {
      filePages: filePages,
      fileName: file.name,
      fileUrl: await getDownloadURL(storageRef)
    };

    try {
      const docRef = await addDoc(collection(firestore, entityName), data);
      Swal.fire({
        icon: "success",
        title: strings.success,
        text: strings.file_uploaded_success
      }).then();
      logEvent(analytics, "file-uploaded-successfully");
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
    const docs = await getDocs(collection(firestore, entityName))
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