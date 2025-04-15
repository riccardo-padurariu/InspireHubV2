import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBiqdp2HMdciJNrUv5DNcznkvexL6LQ9rk",
  authDomain: "inspirehub-3779f.firebaseapp.com",
  projectId: "inspirehub-3779f",
  storageBucket: "inspirehub-3779f.firebasestorage.app",
  messagingSenderId: "88942840628",
  appId: "1:88942840628:web:ecd763ce7097117e9b7361"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();



export { app, auth, db };