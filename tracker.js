(function () {
  function init(cfg) {
    console.log("🚀 tracker.js init started");

    if (!firebase.apps.length) {
      firebase.initializeApp(cfg);
      console.log("✅ Firebase initialized in tracker.js");
    }

    const db = firebase.database();

    const scriptTag = document.currentScript;
    const siteId = scriptTag.getAttribute("data-site") || "default-site";

    const visit = {
      url: window.location.href,
      referrer: document.referrer || "direct",
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
    };

    console.log("📡 Sending visit:", visit);

    db.ref("analytics/" + siteId)
      .push(visit)
      .then(() => console.log("✅ Visit saved under site:", siteId))
      .catch((err) => console.error("❌ Firebase push error:", err));
  }

  // Load Firebase scripts
  const firebaseApp = document.createElement("script");
  firebaseApp.src = "https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js";
  firebaseApp.onload = () => {
    const firebaseDB = document.createElement("script");
    firebaseDB.src = "https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js";
    firebaseDB.onload = () => {
      // Fetch shared config
      fetch("https://analytiq-omega.vercel.app/firebase-config.json")
        .then(res => res.json())
        .then(init)
        .catch(err => console.error("❌ Failed to load config:", err));
    };
    document.head.appendChild(firebaseDB);
  };
  document.head.appendChild(firebaseApp);
})();
