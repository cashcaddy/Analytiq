
(function() {
  // === CONFIG ===
  const SITE_ID = "mysite1"; // change per website

  // Firebase init
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

  if (!window.firebaseApps) {
    window.firebaseApps = true;
    const s = document.createElement("script");
    s.src = "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js";
    s.onload = () => {
      const dbs = document.createElement("script");
      dbs.src = "https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js";
      dbs.onload = initFirebase;
      document.head.appendChild(dbs);
    };
    document.head.appendChild(s);
  } else {
    initFirebase();
  }

  function initFirebase() {
    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();

    function saveEvent(event) {
      firebase.database().ref("analytics/" + SITE_ID).push(event);
    }

    // Track pageview
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(loc => {
        saveEvent({
          type: "pageview",
          url: location.pathname,
          ref: document.referrer || "Direct",
          ts: Date.now(),
          location: `${loc.city || '-'}, ${loc.region || '-'}, ${loc.country_name || '-'}`
        });
      })
      .catch(() => {
        saveEvent({
          type: "pageview",
          url: location.pathname,
          ref: document.referrer || "Direct",
          ts: Date.now(),
          location: "Unknown"
        });
      });

    // Expose custom events
    window.myAnalytics = {
      track: function(name) {
        saveEvent({
          type: "event",
          name,
          url: location.pathname,
          ts: Date.now()
        });
      }
    };
  }
})();
