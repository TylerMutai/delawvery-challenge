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

const entityName = "files";
const storagePath = "images";

/**
 *
 * @param user
 * @returns {string}
 */
const getPath = user => `${entityName}/${user.uid}`

/**
 *
 * @param user
 * @returns {string}
 */
const getStoragePath = user => `${storagePath}/${user.uid}`

/**
 *
 * @param {number} filePages
 * @param {File} file
 * @param {User} user
 * @returns {Promise<any>}
 */
const createFileData = async (filePages, file, user) => {

  // File upload
  try {
    const fileName = `${new Date().getTime()}-${file.name}`;
    const storageRef = ref(storage, `${getStoragePath(user)}/${fileName}`);
    await uploadBytes(storageRef, file);
    const data = {
      filePages: filePages,
      fileName: file.name,
      fileUrl: await getDownloadURL(storageRef)
    };

    try {
      const docRef = await addDoc(collection(firestore, `${getPath(user)}/*`), data);
      Swal.fire({
        icon: "success",
        title: strings.success,
        text: strings.file_uploaded_success
      }).then();
      logEvent(analytics, "file_uploaded_successfully", {...user, ...data});
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
 * @param {User} user
 * @returns {Promise<any>}
 */
const listFileData = async (user) => {
  try {
    const docs = await getDocs(collection(firestore, `${getPath(user)}/*`))
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