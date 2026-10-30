/* Firebase Messaging background worker for Teman Sekolah.
   Keep this file at the repository root beside index.html. */
importScripts('https://www.gstatic.com/firebasejs/13.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/13.1.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBVAeKmaXqh4tPwZ-7yjKuikxYO6dfvy20",
  authDomain: "teman-sekolah-9ab7f.firebaseapp.com",
  projectId: "teman-sekolah-9ab7f",
  storageBucket: "teman-sekolah-9ab7f.firebasestorage.app",
  messagingSenderId: "670336660572",
  appId: "1:670336660572:web:94d305a14c7f54922d6299",
  measurementId: "G-DN8K9N5BJ6"
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage(payload => {
  const title = payload.notification?.title || 'Teman Sekolah';
  const options = {
    body: payload.notification?.body || 'Ada pengingat baru untukmu.',
    icon: './icon-192.png',
    badge: './icon-192.png',
    data: payload.data || {}
  };
  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const target = event.notification.data?.url || '../';
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const client of list) if ('focus' in client) return client.focus();
    return clients.openWindow(target);
  }));
});
