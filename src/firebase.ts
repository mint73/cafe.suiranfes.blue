import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // あなたのFirebaseの設定情報（APIキーなど）を入力してください
  // 詳細な情報はFirebaseコンソールのプロジェクト設定から取得できます
  apiKey: "AIzaSyBzPssZ1gFlb6_uG0Uu_I-QVXvyBwst7WM",
  authDomain: "shokkitu-cafeapp.firebaseapp.com",
  projectId: "shokkitu-cafeapp",
  storageBucket: "shokkitu-cafeapp.appspot.com",
  messagingSenderId: "135205687359",
  appId: "1:135205687359:web:488aca8771748ae353288a",
  measurementId: "G-MNMDZ3GZN3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
