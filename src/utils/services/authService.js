import {app} from "../helpers/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut
} from "firebase/auth";
import strings from "../localization/main";
import Swal from "sweetalert2";
import {parseErrorResponse} from "../helpers/errorHandling";

export const auth = getAuth(app);

/**
 *
 * @param {import("../types/user/user.js").User} user
 * @returns {Promise<void|User>}
 */
const signUp = async (user) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
    Swal.fire({
      icon: "success",
      title: strings.success,
      text: strings.user_registered_successfully,
    }).then();
    return userCredential.user;
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
 * @param {import("../types/user/user.js").User} user
 * @returns {Promise<void|User>}
 */
const signIn = async (user) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
    Swal.fire({
      icon: "success",
      title: strings.success,
      text: strings.user_login_successful,
    }).then();
    return userCredential.user;
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
 * @returns {Promise<void|boolean>}
 */
const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    Swal.fire({
      icon: "success",
      title: strings.success,
      text: strings.user_logout_successful,
    }).then();
    return true;
  } catch (e) {
    Swal.fire({
      type: "error",
      title: strings.error,
      text: parseErrorResponse(e)
    }).then();
  }
}

export {signIn, signUp, signOut};