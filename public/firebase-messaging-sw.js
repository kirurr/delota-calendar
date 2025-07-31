importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDXCC_DP8SD2Drzf1j6XFHW_T75zouKiEM",
  authDomain: "delota-calendar.firebaseapp.com",
  projectId: "delota-calendar",
  messagingSenderId: "19434361659",
  appId: "1:19434361659:web:7ac2747db41e1959d91d1e",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  console.log('[firebase-messaging-sw.js] Получено сообщение:', payload);
  const { title, body } = payload.notification;
	console.log(payload)
  self.registration.showNotification(title, {
    body,
    icon: '/icon.jpg', // твой иконка
  });
});

