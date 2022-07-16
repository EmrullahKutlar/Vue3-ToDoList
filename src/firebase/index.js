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


import { collection, addDoc, doc, updateDoc,deleteDoc  } from "firebase/firestore";


export const addTask = (task) => {
    return addDoc(collection(db, "tasks"), {
            ...task,
        });
    }
export const makeDone = (task) => {
    var selectedTask = doc(db, "tasks", task.id);
    updateDoc(selectedTask, {
        isDone: !task.isDone,
    });
}
export const deleteTask = (task) => {
    var selectedTask = doc(db, "tasks", task.id);
    return  deleteDoc(selectedTask)
}


export const editTask = (task) => {
    var editTask = doc(db, "tasks", task.id);
    return  updateDoc(editTask, {
        title: task.title,
        description: task.description,
        isDone: task.isDone,
        tags: task.tags,
    })
}
export { db };