import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBfkcYR9knX0iJR6LQEuc3PvxJ1E-0L8gM",
    authDomain: "vue3-todo-database.firebaseapp.com",
    projectId: "vue3-todo-database",
    storageBucket: "vue3-todo-database.appspot.com",
    messagingSenderId: "983538583355",
    appId: "1:983538583355:web:815e83c74b7784bf70d91e",
    measurementId: "G-CSH5DT1VDB",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };