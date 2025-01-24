// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCvIowpY5DSFlR2Gxbw8qOXuoYut0r1Eqo",
    authDomain: "logins-fdf26.firebaseapp.com",
    projectId: "logins-fdf26",
    storageBucket: "logins-fdf26.firebasestorage.app",
    messagingSenderId: "702701307825",
    appId: "1:702701307825:web:9f10bc1f378862df559f90"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Signup logic
const signupBtn = document.querySelector("#signup-container button");
signupBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const email = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Optionally save user info to Firestore
    await setDoc(doc(db, "users", user.uid), {
      email,
      createdAt: new Date().toISOString(),
    });

    alert("Signup successful! Please login.");
    showLogin();
  } catch (error) {
    console.error("Signup Error:", error.code);
    alert(`Error: ${error.message}`);
  }
});

// Login logic
const loginBtn = document.querySelector("#login-container button");
loginBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const email = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    // Sign in user in Firebase Auth
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
    window.location.href = "dashboard.html"; // Redirect to dashboard
  } catch (error) {
    console.error("Login Error:", error.code);
    alert(`Error: ${error.message}`);
  }
});