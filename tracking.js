(function () {
  function init() {
    // ✅ Your Firebase config
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
    }

    const db = firebase.database();

    // Get siteId from <script data-site="mysite123">
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

  // ✅ Load Firebase SDK first
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
