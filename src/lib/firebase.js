import Firebase from "firebase/compat/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/compat/firestore"
//import the seed file
//import { seedDatabase } from '../seed';
require("firebase/firestore");

const config= {
    apiKey: "AIzaSyA_sl62Q_3fDiELwMUlgjx0oDwSDhsYqdw",
    authDomain: "insg-1650b.firebaseapp.com",
    projectId: "insg-1650b",
    storageBucket: "insg-1650b.appspot.com",
    messagingSenderId: "836556917462",
    appId: "1:836556917462:web:deb4a72c3abc36d7ea9777"
};
const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;
const Auth= getAuth(firebase);
export { firebase, FieldValue, Auth };

// call the seed file (only once)
// seedDAtavase(firebase)
//seedDatabase(firebaseApp);
