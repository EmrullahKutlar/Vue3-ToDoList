import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBZPc3R5FNiLg7u07_Aq78EbNzYM7b278s",
  authDomain: "vue3todoproject.firebaseapp.com",
  databaseURL: "https://vue3todoproject-default-rtdb.firebaseio.com",
  projectId: "vue3todoproject",
  storageBucket: "vue3todoproject.appspot.com",
  messagingSenderId: "770309809418",
  appId: "1:770309809418:web:48f84960cc29d303cb06f3",
  measurementId: "G-3ZXWWQ35LX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
