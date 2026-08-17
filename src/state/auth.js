import { ref } from 'vue'
import {
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth, firebaseConfigured } from '@/firebase'

export const user = ref(null)
export const authReady = ref(false)

if (firebaseConfigured) {
  onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser
    authReady.value = true
  })
}

export async function signIn(email, password) {
  await signInWithEmailAndPassword(auth, email, password)
}

export async function signUp(email, password) {
  await createUserWithEmailAndPassword(auth, email, password)
}

export async function continueAsGuest() {
  await signInAnonymously(auth)
}

export async function logOut() {
  await signOut(auth)
}
