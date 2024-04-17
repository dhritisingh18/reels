// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import  "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";


// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCRd5pwy5FT4vLHk_IJYGPxjcqwZVBQ4_I",
//   authDomain: "fir-17ce7.firebaseapp.com",
//   databaseURL: "https://fir-17ce7-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "fir-17ce7",
//   storageBucket: "fir-17ce7.appspot.com",
//   messagingSenderId: "201449689126",
//   appId: "1:201449689126:web:bc8ff9c540d9085dae96e7",
//   measurementId: "G-QKVS01HBZ0"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

import { getAuth } from "firebase/auth";


const firebaseConfig = {
    // apiKey: "AIzaSyBMsfZN2PgTpWfbXdkTVS7HD53SYPBkjoQ",
    // authDomain: "reels-8e5c4.firebaseapp.com",
    // projectId: "reels-8e5c4",
    // storageBucket: "reels-8e5c4.appspot.com",
    // messagingSenderId: "34298320389",
    // appId: "1:34298320389:web:2b58b2a54b8ef51c352e6c"
    apiKey: "AIzaSyDYBxiVLzTGRiYWFikvnE0Rm_Xgu4FS6cM",
    authDomain: "reels-app-92c5c.firebaseapp.com",
    projectId: "reels-app-92c5c",
    storageBucket: "reels-app-92c5c.appspot.com",
    messagingSenderId: "54216764055",
    appId: "1:54216764055:web:3a7db205e62310209a57d2"
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
console.log(auth)
const firestore=firebase.firestore();
console.log(firebase.firestore.FieldValue.serverTimestamp)
export const database={
    users:firestore.collection('users'),
    getTimeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    comments: firestore.collection('comments'),
    posts:firestore.collection('posts')
}

export const storage=firebase.storage();

