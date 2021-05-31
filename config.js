import firebase from 'firebase';
require("@firebase/firestore");

 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyCOJLFf0QT_atuA4235gATqKTs5tI4r4GU",
  authDomain: "bill-assistant-a02c8.firebaseapp.com",
  projectId: "bill-assistant-a02c8",
  storageBucket: "bill-assistant-a02c8.appspot.com",
  messagingSenderId: "732237855494",
  appId: "1:732237855494:web:7221d72b27fe841508bc87"
};
if(!firebase.apps.count){
  firebase.initializeApp(firebaseConfig);
}

export default firebase.firestore();