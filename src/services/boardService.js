import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  writeBatch,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from '@/firebase'

function cardsRef(uid) {
  return collection(db, 'boards', uid, 'cards')
}

export function watchCards(uid, callback) {
  const q = query(cardsRef(uid), orderBy('order'))
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
  })
}

export async function addCard(uid, { title, description, status, order }) {
  await addDoc(cardsRef(uid), {
    title,
    description: description || '',
    status,
    order,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function updateCard(uid, cardId, data) {
  await updateDoc(doc(db, 'boards', uid, 'cards', cardId), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteCard(uid, cardId) {
  await deleteDoc(doc(db, 'boards', uid, 'cards', cardId))
}

// Persists a column's cards in their current visual order after a drag —
// rewrites each card's `order` (its new index) and `status` (its column),
// so cross-column moves and in-column reordering both save in one call.
export async function reorderColumn(uid, status, cards) {
  const batch = writeBatch(db)
  cards.forEach((card, index) => {
    batch.update(doc(db, 'boards', uid, 'cards', card.id), {
      status,
      order: index,
    })
  })
  await batch.commit()
}
