//import * as firebase from 'firebase';
import { firebase } from '@firebase/app'
import 'firebase/auth';
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAR9hCQdxZoDU-1xIadqIHTMcalOzWY_Uw",
    authDomain: "peerpal-a286b.firebaseapp.com",
    databaseURL: "https://peerpal-a286b-default-rtdb.firebaseio.com",
    projectId: "peerpal-a286b",
    storageBucket: "peerpal-a286b.appspot.com",
    messagingSenderId: "304059803531",
    appId: "1:304059803531:web:6d2d22b4ab58a8364df18e"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log('initializes new firebase')
}else {
  firebase.app(); // if already initialized, use that one
  console.log('using diff firebase app')
}

export { firebase };