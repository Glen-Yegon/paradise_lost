  // Firebase SDK Imports
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

  // Firebase configuration (your existing config)
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

  // Handle Newsletter Submission
  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterEmail = document.getElementById("newsletterEmail");

  newsletterForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = newsletterEmail.value.trim().toLowerCase();

    if (!email) {
      alert("Please enter a valid email.");
      return;
    }

    try {
      await addDoc(collection(db, "newsletter"), {
        email,
        subscribedAt: new Date()
      });

      alert("✅ Thanks for subscribing!");
      newsletterForm.reset();
    } catch (error) {
      console.error("❌ Error saving email:", error);
      alert("Something went wrong. Please try again.");
    }
  });