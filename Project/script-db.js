// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC0yF0tsZjtoo1NsYzOKjxgM6V9ZNJNjbY",
    authDomain: "easter-game-f9df2.firebaseapp.com",
    projectId: "easter-game-f9df2",
    storageBucket: "easter-game-f9df2.appspot.com",
    messagingSenderId: "655469277018",
    appId: "1:655469277018:web:0fb4dabffd7f6ec1fbcd63",
    measurementId: "G-8X4MQ99W9R"
};

// Initialize Firebase
const analytics = getAnalytics(app);
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // User created successfully
            const user = userCredential.user;
            // Save the name and avatar in Firestore
            db.collection('users').doc(user.uid).set({
                name: name,
                avatar: 'default_avatar_url', // Replace with the actual URL of the default avatar
            }).then(() => {
                console.log('User data saved');
                // Close the modal
                const modalElement = document.getElementById('exampleModal');
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                modalInstance.hide();
            }).catch((error) => {
                console.error('Error saving user data:', error);
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error creating user:', errorCode, errorMessage);
        });
}

document.querySelector('.btn-warning').addEventListener('click', signUp);

function signInUser() {
    const email = document.getElementById("floatingInput").value;
    const password = document.getElementById("floatingPassword").value;

    if (email === "" || password === "") {
        alert("Please enter your email and password");
        return;
    }

    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // User signed in successfully
            const user = userCredential.user;
            console.log("User signed in:", user);

            // Close the modal
            const modal = bootstrap.Modal.getInstance(document.getElementById("secondModal"));
            modal.hide();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error signing in user:", errorCode, errorMessage);
            alert("Error signing in: " + errorMessage);
        });
}
document.getElementById("signInButton").addEventListener("click", signInUser);