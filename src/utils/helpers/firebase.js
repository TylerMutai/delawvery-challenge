import {initializeApp} from "firebase/app";
import appConfigs from "../values/globals";

const firebaseConfig = {
  apiKey: appConfigs.API_KEY,
  authDomain: appConfigs.AUTH_DOMAIN,
  projectId: appConfigs.PROJECT_ID,
  storageBucket: appConfigs.STORAGE_BUCKET,
  messagingSenderId: appConfigs.MESSAGING_SENDER_ID,
  appId: appConfigs.APP_ID,
  measurementId: appConfigs.MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {app};