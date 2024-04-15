import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCHlpL71Yeljb4_dTHR3gBqcOUmPGUd_Y8",
  authDomain: "ardaa-tr.firebaseapp.com",
  databaseURL: "https://ardaa-tr-default-rtdb.firebaseio.com",
  projectId: "ardaa-tr",
  storageBucket: "ardaa-tr.appspot.com",
  messagingSenderId: "568571837732",
  appId: "1:568571837732:web:edc13e72fc18613890c7b1",
  measurementId: "G-TQM2CVYLJE"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage,sendPasswordResetEmail  };
