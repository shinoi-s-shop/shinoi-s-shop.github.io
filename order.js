import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCwEqOjrZwN56MGRsMrA_BUjHWSnkvmecM",
  authDomain: "shinoi-s-shop.firebaseapp.com",
  databaseURL: "https://shinoi-s-shop-default-rtdb.firebaseio.com",
  projectId: "shinoi-s-shop",
  storageBucket: "shinoi-s-shop.firebasestorage.app",
  messagingSenderId: "349772060842",
  appId: "1:349772060842:web:1dbd365d526c0a28e2d8d3"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.placeOrder = async function () {

  const customer = JSON.parse(localStorage.getItem("customer")) || {};
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  const order = {
    userUid: localStorage.getItem("userUid"),
    userEmail: localStorage.getItem("userEmail"),
    userName: localStorage.getItem("userName"),

    customer: customer,
    products: cart,
    date: new Date().toLocaleString(),
    status: "Pending"
  };

  try {

    // Save order to Firebase
    const newOrderRef = await push(ref(db, "orders"), order);

    // Save order info for success page
    localStorage.setItem("lastOrder", JSON.stringify({
      id: newOrderRef.key,
      total: customer.grandTotal,
      ...order
    }));

    // Clear cart
    localStorage.removeItem("cart");
    localStorage.removeItem("customer");

    // Go to success page
    window.location.href = "success.html";

  } catch (err) {
    alert(err.message);
  }

};
