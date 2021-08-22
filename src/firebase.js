
// Importing Libraries
import firebase from 'firebase';

// Firebase Configration Data
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

// Initializing Firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Creating Database
const db = firebaseApp.firestore();

// Creating Authentication
const auth = firebase.auth();

// Exporting database and authentication modules
export {db, auth};
