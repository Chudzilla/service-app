import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: "AIzaSyBZD9OG5q39e8e6i2jS1cYTii4isb7UdfE",
  authDomain: "service-apk-2023.firebaseapp.com",
  projectId: "service-apk-2023",
  storageBucket: "service-apk-2023.appspot.com",
  messagingSenderId: "99913172828",
  appId: "1:99913172828:web:d40aee97127f76c24f2399",
  measurementId: "G-0YJ5HRXQ7E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)