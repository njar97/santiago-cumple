import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCnJB976CzFekDIxmlUWVcdM9cSGPzfvos",
  authDomain: "santiago-cumple-zvx85q.firebaseapp.com",
  databaseURL: "https://santiago-cumple-zvx85q-default-rtdb.firebaseio.com",
  projectId: "santiago-cumple-zvx85q",
  storageBucket: "santiago-cumple-zvx85q.firebasestorage.app",
  messagingSenderId: "763382457376",
  appId: "1:763382457376:web:cba8a4f356ad0e7bbd4845"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
// UID original — solo se usa para auto-migrar al nodo /admins la primera vez.
// Los admins reales se gestionan desde la UI en /admins/{uid}.
export const LEGACY_ADMIN_UID = "fokfln8kLqhEXAZCdibxZ52ELF22";
