import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGnpwYIWd1QwXKlHZi-tgdT_jlTs-xV8M",
  authDomain: "double-trouble-training-app.firebaseapp.com",
  projectId: "double-trouble-training-app",
  storageBucket: "double-trouble-training-app.appspot.com",
  messagingSenderId: "769217412259",
  appId: "1:769217412259:web:f4d9a7b52a9be23e661316",
  measurementId: "G-3QRH3PNW8H",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
  initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
} else {
  app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();
export { firebase, db, auth };
