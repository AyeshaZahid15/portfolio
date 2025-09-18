// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

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

// ================== AUTH CHECK ================== //
onAuthStateChanged(auth, (user) => {
  const navbar = document.querySelector(".navbar");

  // Remove any existing user-info to avoid duplicates
  let oldUserInfo = document.querySelector(".user-info");
  if (oldUserInfo) oldUserInfo.remove();

  if (user) {
    console.log("✅ Logged in as:", user.email);

    // Create user-info container
    let userInfoDiv = document.createElement("div");
    userInfoDiv.classList.add("user-info");

    // Display name or email
    let displayName = user.displayName ? user.displayName : user.email;
    let userInfo = document.createElement("span");
    userInfo.textContent = `Hi, ${displayName}`;

    // Logout button
    let logoutBtn = document.createElement("button");
    logoutBtn.textContent = "Logout";
    logoutBtn.classList.add("logout-btn");
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      signOut(auth).then(() => {
        alert("Logged out successfully!");
        window.location.href = "index.html";
      }).catch((error) => {
        console.error("Logout Error:", error);
      });
    });

    // Append email + button to user-info div
    userInfoDiv.appendChild(userInfo);
    userInfoDiv.appendChild(logoutBtn);

    // Add to navbar
    navbar.appendChild(userInfoDiv);

  } else {
    console.log("❌ No user logged in, redirecting...");
    window.location.href = "index.html";
  }
});