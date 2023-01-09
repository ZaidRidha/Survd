import * as firebase from "firebase";

import "firebase/firestore";
import "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAksnKFJwQdQsoCaEdTHgEpYYysjSwNlWw",
    authDomain: "barberapp-5415c.firebaseapp.com",
    projectId: "barberapp-5415c",
    storageBucket: "barberapp-5415c.appspot.com",
    messagingSenderId: "911355309171",
    appId: "1:911355309171:web:f4fe412afe3ccc53f7ce06",
    measurementId: "G-6SCLR7BX2L"
  };
  
let app;

if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
} else{
    app = firebase.app()
}

const db = app.firestore();
const auth = firebase.auth()

export {auth,db};