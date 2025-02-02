import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAb1k18Z57HtXChTGkS_LY7V66WpZh4SIk",
  authDomain: "react-project-31495.firebaseapp.com",
  projectId: "react-project-31495",
  storageBucket: "react-project-31495.firebasestorage.app",
  messagingSenderId: "525386895227",
  appId: "1:525386895227:web:2cde7454a75a902fab77de",
  measurementId: "G-VPNXG38WP6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);