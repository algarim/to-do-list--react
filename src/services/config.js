import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDFaU2Mrbn1vcO54XTkNj2R9jj_PFimId8",
    authDomain: "to-do-list--react.firebaseapp.com",
    projectId: "to-do-list--react",
    storageBucket: "to-do-list--react.appspot.com",
    messagingSenderId: "301292201745",
    appId: "1:301292201745:web:de9fd65b896bbb616d8eb0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);