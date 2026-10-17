import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "ISI_API_KEY",
  authDomain: "portal-rt-18a87.firebaseapp.com",
  projectId: "portal-rt-18a87",
  storageBucket: "portal-rt-18a87.firebasestorage.app",
  messagingSenderId: "320121997694",
  appId: "ISI_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);