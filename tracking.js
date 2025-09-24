(function () {
  function init() {
    // 🔑 Replace with your Firebase config
     const firebaseConfig = {
  apiKey: "AIzaSyCy3wdI31dGW869qdPg08-KDuVmEyICILE",
  authDomain: "web--analytics.firebaseapp.com",
  projectId: "web--analytics",
  storageBucket: "web--analytics.firebasestorage.app",
  messagingSenderId: "740756570650",
  appId: "1:740756570650:web:d352ca5bcb75a9bcf947a3",
  databaseURL: "https://web--analytics-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      console.log("✅ Firebase initialized");
    }

    const db = firebase.database();

    // Get siteId from <script data-site="mysite123">
    const scriptTag = document.currentScript;
    const siteId = scriptTag.getAttribute("data-site") || "default-site";

    // Visit data
    const visit = {
      url: window.location.href,
      referrer: document.referrer || "direct",
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
    };

    console.log("📡 Sending visit:", visit);

    // Save visit
    db.ref("analytics/" + siteId)
      .push(visit)
      .then(() => console.log("✅ Visit sent to Firebase under site:", siteId))
      .catch((err) => console.error("❌ Error sending visit:", err));
  }

  // Load Firebase SDKs
  const firebaseApp = document.createElement("script");
  firebaseApp.src = "https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js";
  firebaseApp.onload = () => {
    const firebaseDB = document.createElement("script");
    firebaseDB.src = "https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js";
    firebaseDB.onload = init;
    document.head.appendChild(firebaseDB);
  };
  document.head.appendChild(firebaseApp);
})();
