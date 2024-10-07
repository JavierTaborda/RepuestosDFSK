import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCR3ngOZYOGpiHUZ2bLm3Rbao4JycNC3Jk",
  authDomain: "repuestos-dfsk.firebaseapp.com",
  projectId: "repuestos-dfsk",
  storageBucket: "repuestos-dfsk.appspot.com",
  messagingSenderId: "466818934520",
  appId: "1:466818934520:web:549499bca4375cc7c1bd0d",
  measurementId: "G-V47GFL5VM3",
  locationId: "southamerica-east1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

