import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAbTbzlVRcTg9XaycUlEsngfQ1x8HH_8_8",
  authDomain: "portal-rt-18a87.firebaseapp.com",
  projectId: "portal-rt-18a87",
  storageBucket: "portal-rt-18a87.firebasestorage.app",
  messagingSenderId: "320121997694",
  appId: "1:320121997694:web:1eb8c7fd9815b2b7138b2f",
  measurementId: "G-FS30QYZQZ9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);