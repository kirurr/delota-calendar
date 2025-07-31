// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXCC_DP8SD2Drzf1j6XFHW_T75zouKiEM",
  authDomain: "delota-calendar.firebaseapp.com",
  projectId: "delota-calendar",
  storageBucket: "delota-calendar.firebasestorage.app",
  messagingSenderId: "19434361659",
  appId: "1:19434361659:web:7ac2747db41e1959d91d1e",
  measurementId: "G-4RB6TWJLF6"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export { firebaseApp, analytics };

const messaging = getMessaging(firebaseApp);

// Подписка на пуши
export async function subscribeToPush() {
  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      serviceWorkerRegistration: await navigator.serviceWorker.ready,
    });
    console.log('Push token:', token);
    return token;
  } catch (err) {
    console.error('Не удалось получить токен', err);
  }
}
