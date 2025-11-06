import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADyB_1jQf2ao9zQL6wn2RVf7E9QrRrRY",
  authDomain: "delphin-contact-form.firebaseapp.com",
  projectId: "delphin-contact-form",
  storageBucket: "delphin-contact-form.appspot.com",
  messagingSenderId: "741946752241",
  appId: "1:741946752241:web:c1ff577a115db67833d5b0"
};

// Initialize Firebase only on client side
let app: FirebaseApp | undefined;
let db: Firestore | undefined;

function getFirebaseApp(): FirebaseApp {
  if (typeof window === "undefined") {
    throw new Error("Firebase can only be initialized on the client side");
  }

  if (!app) {
    // Check if Firebase is already initialized
    const existingApps = getApps();
    if (existingApps.length === 0) {
      app = initializeApp(firebaseConfig);
    } else {
      app = existingApps[0];
    }
  }
  
  return app;
}

function getFirestoreDb(): Firestore {
  if (typeof window === "undefined") {
    throw new Error("Firestore can only be used on the client side");
  }

  if (!db) {
    const firebaseApp = getFirebaseApp();
    db = getFirestore(firebaseApp);
  }
  
  return db;
}

// Export db getter function for client-side use
export { getFirestoreDb as getDb };

// Export db directly for convenience (will be undefined on server)
if (typeof window !== "undefined") {
  db = getFirestoreDb();
}
export { db };

