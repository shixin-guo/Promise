import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import {
  getFirestore,
  setLogLevel,
  enableIndexedDbPersistence,
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
// Initialize Firebase
export let firebaseApp: FirebaseApp | undefined = undefined
export const createFirebaseApp = () => {
  if (getApps().length <= 0) {
    const app = initializeApp(clientCredentials)
    // Check that `window` is in scope for the analytics module!
    if (typeof window !== 'undefined') {
      // Enable analytics. https://firebase.google.com/docs/analytics/get-started
      if ('measurementId' in clientCredentials) {
        getAnalytics()
      }
    }
    firebaseApp = app
    return app
  }
}

export const getFirebaseDb = () => {
  setLogLevel('debug')
  const DB = getFirestore(firebaseApp)
  enableIndexedDbPersistence(DB).catch((err) => {
    if (err.code == 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code == 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
    console.log(err)
  })
  return getFirestore(firebaseApp)
}
