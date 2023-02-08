import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


export const firebaseConfig = {
  apiKey: "AIzaSyAksnKFJwQdQsoCaEdTHgEpYYysjSwNlWw",
  authDomain: "barberapp-5415c.firebaseapp.com",
  projectId: "barberapp-5415c",
  storageBucket: "barberapp-5415c.appspot.com",
  messagingSenderId: "911355309171",
  appId: "1:911355309171:web:f4fe412afe3ccc53f7ce06",
  measurementId: "G-6SCLR7BX2L"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const database = getFirestore(app);
export const authentication = getAuth(app);


