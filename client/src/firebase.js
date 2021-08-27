import * as firebase from "firebase";

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyByHcc3wQqoA4LLJ-pWHFr_abemIy7GgZc",
    authDomain: "ecommerce-master-86e52.firebaseapp.com",
    projectId: "ecommerce-master-86e52",
    storageBucket: "ecommerce-master-86e52.appspot.com",
    messagingSenderId: "798741227506",
    appId: "1:798741227506:web:c43cf9b7c04981b2f7ad6b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
