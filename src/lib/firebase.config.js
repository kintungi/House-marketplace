// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use

import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiLYy9pDHE6BtBUtTDZwUWV0GKU9Ow0mE",
  authDomain: "house-marketplace-app-9eb59.firebaseapp.com",
  projectId: "house-marketplace-app-9eb59",
  storageBucket: "house-marketplace-app-9eb59.appspot.com",
  messagingSenderId: "155902667746",
  appId: "1:155902667746:web:f942e88743474f6f5ba7bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()