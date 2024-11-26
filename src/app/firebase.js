'use client'
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB74rKYI2qcfr-DxAUExwft0ZQ8GajRv7w",
  authDomain: "login-3db13.firebaseapp.com",
  databaseURL: "https://login-3db13-default-rtdb.firebaseio.com",
  projectId: "login-3db13",
  storageBucket: "login-3db13.firebasestorage.app",
  messagingSenderId: "383108890199",
  appId: "1:383108890199:web:2b3b2095cbcf565cf12d12"
    // measurementId: "G-JYTEGFNH69"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
