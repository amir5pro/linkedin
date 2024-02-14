
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDjxpKPAhWD7Ibp4I_Dxg2CeW-TPFBlS0U",
  authDomain: "linkedin-clone-c7761.firebaseapp.com",
  projectId: "linkedin-clone-c7761",
  storageBucket: "linkedin-clone-c7761.appspot.com",
  messagingSenderId: "465845867221",
  appId: "1:465845867221:web:a98961d378dd3d4ecf885c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
 export const provider = new GoogleAuthProvider();
 export const storage = getStorage(app);