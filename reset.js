// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAmhMYeEboUTY3_bK7BuOTzoxuDdptsoGw",
  authDomain: "portfolio-auth-6074a.firebaseapp.com",
  projectId: "portfolio-auth-6074a",
  storageBucket: "portfolio-auth-6074a.firebasestorage.app",
  messagingSenderId: "262394985302",
  appId: "1:262394985302:web:8b57adbf20688fb82b34f7",
  measurementId: "G-E2P3JBGFZG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle Reset Password
const form = document.querySelector(".form-box");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.querySelector('input[type="email"]').value;

  if (!email) {
    alert("⚠️ Please enter your email address.");
    return;
  }

  // Send reset email through Firebase
  sendPasswordResetEmail(auth, email)
    .then(() => {
  
      // Optional: redirect back to login
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1000);
    })
    .catch((error) => {
      console.error("Reset error:", error.code, error.message);

      if (error.code === "auth/user-not-found") {
        alert("❌ No user found with this email.");
      } else if (error.code === "auth/invalid-email") {
        alert("⚠️ Please enter a valid email address.");
      } else {
        alert(`❌ Error: ${error.message}`);
      }
    });
});
