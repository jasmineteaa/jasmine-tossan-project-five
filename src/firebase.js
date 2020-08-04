import firebase from 'firebase';

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "project-five-95c84.firebaseapp.com",
  databaseURL: "https://project-five-95c84.firebaseio.com",
  projectId: "project-five-95c84",
  storageBucket: "project-five-95c84.appspot.com",
  messagingSenderId: "580410168240",
  appId: process.env.REACT_APP_FIREBASE_APPID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase;