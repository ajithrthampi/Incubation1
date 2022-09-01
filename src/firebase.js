
import { initializeApp } from "firebase/app";

// import { getAnalytics } from "firebase/analytics";
import {getAuth}  from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import { getStorage} from "firebase/storage"


const firebaseConfig = {

  apiKey: "AIzaSyDW5SJyxau4Ymv2yy8U0g62QOsvNMxNVmU",
  authDomain: "incubation-react.firebaseapp.com",
  projectId: "incubation-react",
  storageBucket: "incubation-react.appspot.com",
  messagingSenderId: "473644326791",
  appId: "1:473644326791:web:a406c3ba3c95acf3d1fd22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage =  getStorage(app) 

export default app;