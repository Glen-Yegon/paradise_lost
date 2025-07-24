// Firebase SDK Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBCH5RKBkCR4SXRPrgPpcfOaS_sYGf7NE",
  authDomain: "paradise-lost-861d9.firebaseapp.com",
  projectId: "paradise-lost-861d9",
  storageBucket: "paradise-lost-861d9.firebasestorage.app",
  messagingSenderId: "939828037395",
  appId: "1:939828037395:web:532c345c83165ca478bce6",
  measurementId: "G-BSVKDESYYY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Form Elements
const toggleBtn = document.getElementById('toggleMode');
const signupForm = document.getElementById('signupForm');
const confirmForm = document.getElementById('confirmForm');
const formTitle = document.getElementById('formTitle');

// Toggle between Signup and Confirm forms
toggleBtn.addEventListener('click', () => {
  const isSignupVisible = signupForm.style.display !== 'none';
  if (isSignupVisible) {
    signupForm.style.display = 'none';
    confirmForm.style.display = 'block';
    formTitle.innerText = 'Confirm Your Account';
    toggleBtn.innerText = "Don't have an account? Sign Up";
  } else {
    signupForm.style.display = 'block';
    confirmForm.style.display = 'none';
    formTitle.innerText = 'Join Paradise Lost';
    toggleBtn.innerText = 'Already have an account? Confirm';
  }
});

// Handle Create Account
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim().toLowerCase();
  const password = document.getElementById('password').value.trim();

  if (!name || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    await addDoc(collection(db, "users"), {
      name,
      email,
      password,
      createdAt: new Date()
    });

    alert("✅ Account created successfully!");
    signupForm.reset();
  } catch (error) {
    console.error("❌ Error adding document: ", error);
    alert("Something went wrong while saving your details.");
  }
});

// Handle Confirm Account
confirmForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('confirmEmail').value.trim().toLowerCase();
  const password = document.getElementById('confirmPassword').value.trim();

  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const q = query(
      collection(db, "users"),
      where("email", "==", email),
      where("password", "==", password)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      alert("✅ Account confirmed!");
      confirmForm.reset();
    } else {
      alert("❌ No matching account found.");
    }
  } catch (error) {
    console.error("❌ Error confirming account: ", error);
    alert("Something went wrong during confirmation.");
  }
});
