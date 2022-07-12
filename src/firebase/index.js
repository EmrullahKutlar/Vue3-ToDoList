import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { ref } from "vue";


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

import { collection, addDoc, onSnapshot, doc, updateDoc,deleteDoc  } from "firebase/firestore";


export const addTask = (task) => {
        addDoc(collection(db, "tasks"), {
            ...task,
        });
    }
    // export const getTasks = () => {
    //     const tasks = [];
    //     onSnapshot(collection(db, "tasks"), (querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //             const todo = {
    //                 id: doc.id,
    //                 ...doc.data(),
    //             };
    //             tasks.push(todo);
    //         });

//     });
//     console.log(tasks);
//     return tasks;
// }
export const makeDone = (task) => {
    var selectedTask = doc(db, "tasks", task.id);
    updateDoc(selectedTask, {
        isDone: !task.isDone,
    });
}
export const deleteTask = (task) => {
    var selectedTask = doc(db, "tasks", task.id);
    deleteDoc(selectedTask).then(() => {
        console.log("Document successfully deleted!");
    })
    .catch((err) => {
        console.log(err);
    });;
}
export const editTask = (task) => {
    var editTask = doc(db, "tasks", task.id);
    updateDoc(editTask, {
        title: task.title,
        description: task.description,
        isDone: task.isDone,
        tags: task.tags,
    }).then(() => {
        console.log("Document successfully updated!");
    })
    .catch((err) => {
        console.log(err);
    });;
}

export { db };