import {
  getDatabase,
  ref,
  push,
  get,
  child
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import {
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCwEqOjrZwN56MGRsMrA_BUjHWSnkvmecM",
  authDomain: "shinoi-s-shop.firebaseapp.com",
  projectId: "shinoi-s-shop",
  storageBucket: "shinoi-s-shop.firebasestorage.app",
  messagingSenderId: "349772060842",
  appId: "1:349772060842:web:1dbd365d526c0a28e2d8d3",
  measurementId: "G-JRNLQFVEJG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// =================== SIGN UP ===================

window.signup = async function () {

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;

  if (!name || !email || !password || !confirm) {
    alert("Please fill all fields.");
    return;
  }

  if (password !== confirm) {
    alert("Passwords do not match.");
    return;
  }

  try {

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(userCredential.user, {
      displayName: name
    });

    await sendEmailVerification(userCredential.user);

    await signOut(auth);

    alert("Account created successfully!\n\nVerification email sent. Please verify your email.");

    window.location.href = "login.html";

  } catch (error) {

    alert(error.message);

  }

};

// =================== LOGIN ===================

window.login = async function () {

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please fill all fields.");
    return;
  }

  try {

    const userCredential = await signInWithEmailAndPassword(auth, email, password);


    alert("Login Successful");

    window.location.href = "index.html";

  } catch (error) {

    alert(error.message);

  }

};

// =================== LOGOUT ===================

window.logout = async function () {

  await signOut(auth);

  alert("Logged Out");

  window.location.href = "login.html";

};

// =================== FORGOT PASSWORD ===================

window.forgotPassword = async function () {

  const email = document.getElementById("email").value.trim();

  if (!email) {
    alert("Enter your email first.");
    return;
  }

  try {

    await sendPasswordResetEmail(auth, email);

    alert("Password reset email sent.");

  } catch (error) {

    alert(error.message);

  }

};

// =================== RESEND VERIFICATION ===================

window.resendVerification = async function () {

  if (!auth.currentUser) {
    alert("Please login first.");
    return;
  }

  try {

    await sendEmailVerification(auth.currentUser);

    alert("Verification email sent again.");

  } catch (error) {

    alert(error.message);

  }

};

const provider = new GoogleAuthProvider();

window.googleLogin = async function () {
  try {
    await signInWithPopup(auth, provider);

    alert("Google Login Successful!");

    window.location.href = "index.html";

  } catch (error) {
    alert(error.message);
  }
};
