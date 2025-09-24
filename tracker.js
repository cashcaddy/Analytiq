(function () {
  function init() {
    console.log("🚀 tracker.js init started");

    const firebaseConfig = {
  apiKey: "AIzaSyCy3wdI31dGW869qdPg08-KDuVmEyICILE",
  authDomain: "web--analytics.firebaseapp.com",
  databaseURL: "https://web--analytics-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "web--analytics",
  storageBucket: "web--analytics.firebasestorage.app",
  messagingSenderId: "740756570650",
  appId: "1:740756570650:web:d352ca5bcb75a9bcf947a3",
  measurementId: "G-YQMTM0SVZQ"
};

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      console.log("✅ Firebase initialized in tracker.js");
    }

    const db = firebase.database();

   const scriptTag = document.getElementById("tracker");
const siteId = scriptTag ? scriptTag.getAttribute("data-site") : "default-site";


    const visit = {
      url: window.location.href,
      referrer: document.referrer || "direct",
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
    };

    console.log("📡 Attempting to send visit:", visit);

    db.ref("analytics/" + siteId)
      .push(visit)
      .then(() => console.log("✅ Visit saved successfully under site:", siteId))
      .catch((err) => console.error("❌ Firebase push error:", err));
  }

  // Load Firebase scripts
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
