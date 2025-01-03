// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA1mOsQOVOBjXdyBqYETRqAdXbtT_eLK3M",
    authDomain: "tacticapp-77c93.firebaseapp.com",
    projectId: "tacticapp-77c93",
    storageBucket: "tacticapp-77c93.firebasestorage.app",
    messagingSenderId: "266051650100",
    appId: "1:266051650100:web:349f2f3f019c1140f18061"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);