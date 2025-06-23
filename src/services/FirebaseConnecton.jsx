import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Configuração Com o banco de dados Firebase 

const firebaseConfig = {
    apiKey: "AIzaSyDrqjpaEFrOuT_JUQBRLt-VXGlDl2Gyhto",
    authDomain: "tickets-e2610.firebaseapp.com",
    projectId: "tickets-e2610",
    storageBucket: "tickets-e2610.appspot.com",
    messagingSenderId: "869902862085",
    appId: "1:869902862085:web:97c59c56ab185dc18b196c",
    measurementId: "G-2ML15HN5NG"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  
  const auth =getAuth(firebaseApp);
  const db = getFirestore(firebaseApp)
  const storage = getStorage(firebaseApp)

  export { auth, db, storage};