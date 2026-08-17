import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Firebase's Auth SDK throws synchronously on first use if the API key is
// missing/malformed — true before .env is filled in (fresh clone) — which
// would otherwise crash the whole app to a blank white screen before Vue
// even mounts. Gate everything behind this instead.
export const firebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId)

export let auth
export let db

if (firebaseConfigured) {
  const app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
}
