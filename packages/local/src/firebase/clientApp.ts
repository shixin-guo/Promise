import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import {
  setLogLevel,
  enableIndexedDbPersistence,
  initializeFirestore,
} from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
const clientCredentials = {
  // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,

  apiKey: 'AIzaSyAPqmYOsdYLiR68900RnuSHKazXu-NPfiM',
  authDomain: 'test-d9e75.firebaseapp.com',
  projectId: 'test-d9e75',
  storageBucket: 'test-d9e75.appspot.com',
  messagingSenderId: '545008354865',
  appId: '1:545008354865:web:8fcd2eabea585e72947710',
  measurementId: 'G-J9D9PN5L73',
}
console.log(clientCredentials)
export const firebaseApp: FirebaseApp = initializeApp(clientCredentials)

export const firebaseDb = initializeFirestore(firebaseApp, {
  experimentalForceLongPolling: true,
})
