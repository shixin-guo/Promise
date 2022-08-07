import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import {
  setLogLevel,
  enableIndexedDbPersistence,
  initializeFirestore,
} from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}
console.log(clientCredentials)
export const firebaseApp: FirebaseApp = initializeApp(clientCredentials)

export const firebaseDb = initializeFirestore(firebaseApp, {
  experimentalForceLongPolling: true,
})
