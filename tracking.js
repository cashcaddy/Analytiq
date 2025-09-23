// tracker.js

const firebaseConfig = {
  apiKey: "AIzaSyCy3wdI31dGW869qdPg08-KDuVmEyICILE",
  authDomain: "web--analytics.firebaseapp.com",
  projectId: "web--analytics",
  storageBucket: "web--analytics.firebasestorage.app",
  messagingSenderId: "740756570650",
  appId: "1:740756570650:web:d352ca5bcb75a9bcf947a3",
  measurementId: "G-YQMTM0SVZQ",
  databaseURL: "https://web--analytics-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Load Firebase
(function() {
  if (!window.firebase) {
    console.error("Firebase SDK not loaded!");
    return;
  }
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();

  // 🔎 Find the script tag that loaded this file
  const currentScript = document.currentScript;
  const siteId = currentScript.getAttribute("data-site") || "default";

  // 👤 Generate or fetch visitorId
  let visitorId = localStorage.getItem("visitorId");
  if (!visitorId) {
    visitorId = "v-" + Math.random().toString(36).substring(2, 12);
    localStorage.setItem("visitorId", visitorId);
  }

  // 📅 Track pageview
  function trackPageview() {
    const event = {
      type: "pageview",
      url: window.location.href,
      referrer: document.referrer || null,
      timestamp: Date.now(),
      visitorId: visitorId
    };
    db.ref("analytics/" + siteId).push(event);
  }

  // 🚀 Fire on load
  window.addEventListener("load", trackPageview);
})();
