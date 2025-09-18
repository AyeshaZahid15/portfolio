// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
 
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

// Fade-in when page loads
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");
});

// Smooth transition when navigating
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    let target = e.target.href;
    document.body.classList.remove("fade-in");
    setTimeout(() => {
      window.location.href = target;
    }, 400);
  });
});

// Show / Hide password toggle
const passwordInput = document.querySelector('input[type="password"]');
if (passwordInput) {
  const toggleBtn = document.createElement("span");
  toggleBtn.innerText = "👁";
  toggleBtn.style.position = "absolute";
  toggleBtn.style.right = "12px";
  toggleBtn.style.top = "50%";
  toggleBtn.style.transform = "translateY(-50%)";
  toggleBtn.style.cursor = "pointer";
  toggleBtn.style.color = "#0ef";
  passwordInput.parentElement.appendChild(toggleBtn);

  toggleBtn.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleBtn.innerText = "🙈";
    } else {
      passwordInput.type = "password";
      toggleBtn.innerText = "👁";
    }
  });
}


// Handle Register
const form = document.querySelector(".form-box");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const fullName = document.querySelector('input[type="text"]').value;
  const email = document.querySelector('input[type="email"]').value;
  const password = document.querySelector('input[type="password"]').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Save display name
      return updateProfile(user, { displayName: fullName });
    })
    .then(() => {
      alert("✅ Account created successfully! Please log in.");
      document.body.classList.remove("fade-in");
      setTimeout(() => {
        window.location.href = "index.html"; 
      }, 400);
    })
    .catch((error) => {
      console.error("Register error:", error.message);
      alert("❌ " + error.message);
    });
});