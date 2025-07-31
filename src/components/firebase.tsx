"use client";

import { subscribeToPush } from "@/firebase";

export default function Firebase() {
  // if ("serviceWorker" in navigator) {
  //   navigator.serviceWorker
  //     .register("/firebase-messaging-sw.js")
  //     .then((registration) => {
  //       console.log("Service Worker зарегистрирован:", registration);
  //     })
  //     .catch((err) => {
  //       console.error("Ошибка регистрации SW:", err);
  //     });
  // }

  return (
    <button
      onClick={async () => {
        const token = await subscribeToPush();
      }}
    >
      Firebase
    </button>
  );
}
