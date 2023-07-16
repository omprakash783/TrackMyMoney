// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC_V3sWHQ0VHR7maSEJXOATWmAaLOXDqE8',
  authDomain: 'expense-tracker-bbedb.firebaseapp.com',
  projectId: 'expense-tracker-bbedb',
  storageBucket: 'expense-tracker-bbedb.appspot.com',
  messagingSenderId: '620923475689',
  appId: '1:620923475689:web:46cc6ac57fee1c857e8278',
  measurementId: 'G-TB3GP2FDCY',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
