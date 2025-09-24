// tracker.js


// tracker.js

// ✅ Load Firebase SDK dynamically if not already loaded
(function () {
  function loadScript(src, callback) {
    const s = document.createElement("script");
    s.src = src;
    s.onload = callback;
    document.head.appendChild(s);
  }

  function init() {
    // ✅ Your Firebase config
   // 🔑 Replace with your Firebase config
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

    if (!firebase.apps?.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const db = firebase.database();

    // Get site ID from <script data-site="">
    const scriptTag = document.currentScript;
    const siteId = scriptTag.getAttribute("data-site") || "default-site";

    // Save visit
    const visit = {
      url: window.location.href,
      referrer: document.referrer || "direct",
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
    };

    db.ref("analytics/" + siteId).push(visit);
  }

  // Load Firebase scripts first
  loadScript("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js", () => {
    loadScript("https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js", init);
  });
})();
