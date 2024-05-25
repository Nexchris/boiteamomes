// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore"; // Ajout de l'import pour Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAp8R5k8wn0Iq-8zcruJ1Fw3w-PO2XoC3M",
  authDomain: "fir-bam.firebaseapp.com",
  projectId: "fir-bam",
  storageBucket: "fir-bam.appspot.com",
  messagingSenderId: "886201733207",
  appId: "1:886201733207:web:694009bfdcab0a6ac79312"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();
const firestore = getFirestore(); // Initialisation de Firestore

export { storage, ref, getDownloadURL, firestore }; // Ajout de `firestore` à l'export
