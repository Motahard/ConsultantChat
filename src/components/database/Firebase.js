import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBFCSo1T5TBKwGXfQ-yFAZTYApLZdjOxHw',
  authDomain: 'magna-5d597.firebaseapp.com',
  databaseURL: 'https://magna-5d597.firebaseio.com',
  projectId: 'magna-5d597',
  storageBucket: 'magna-5d597.appspot.com',
  messagingSenderId: '16853306902',
  appId: '1:16853306902:web:d66e6fb67dd9ef79b02f37'
});

export const db = firebaseApp.firestore();
