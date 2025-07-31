self.addEventListener('push', function (event) {
	console.log('[Service Worker] Push received'); // 👈 добавь
  if (event.data) {
    const data = event.data.json()
		console.log('[Service Worker] Push data:', data); // 👈 добавь
    const options = {
      body: data.notification.body,
      icon: data.icon || '/icon.jpg',
      badge: '/badge.jpg',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2',
      },
    }
    event.waitUntil(self.registration.showNotification(data.notification.title, options))
  }
	else {
		console.warn('[Service Worker] Push event has no data');
	}
})
 
self.addEventListener('notificationclick', function (event) {
  console.log('Notification click received.')
  event.notification.close()
  event.waitUntil(clients.openWindow('https://delota-calendar.vercel.app'))
})
