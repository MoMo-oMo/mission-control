<template>
  <div class="min-h-screen flex flex-col px-4 sm:px-8 py-6">
    <header class="flex items-center justify-between mb-6 flex-wrap gap-3">
      <h1 class="text-2xl font-bold font-orbitron text-white">
        Mission <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ec4899]">Control</span>
      </h1>
      <div class="flex items-center gap-3">
        <span class="text-xs text-gray-400 font-poppins">
          {{ user.isAnonymous ? 'Guest session' : user.email }}
        </span>
        <button
          @click="logOut"
          class="px-3 py-1.5 text-xs font-semibold text-[#a855f7] border border-[#a855f7]/30 rounded-lg hover:bg-[#a855f7]/10 transition-all font-poppins"
        >
          Sign Out
        </button>
      </div>
    </header>

    <div class="flex-1 flex gap-4 overflow-x-auto pb-4">
      <BoardColumn
        v-for="column in COLUMNS"
        :key="column.id"
        :column="column"
        :cards="cardsByColumn[column.id]"
        @add-card="handleAddCard"
        @update-card="handleUpdateCard"
        @delete-card="handleDeleteCard"
        @reorder="handleReorder"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { user, logOut } from '@/state/auth'
import { watchCards, addCard, updateCard, deleteCard, reorderColumn } from '@/services/boardService'
import BoardColumn from '@/components/BoardColumn.vue'

const COLUMNS = [
  { id: 'pre-launch', label: 'Pre-Launch' },
  { id: 'in-orbit', label: 'In Orbit' },
  { id: 're-entry', label: 'Re-Entry' },
  { id: 'touchdown', label: 'Touchdown' },
]

const cards = ref([])
let unsubscribe = null

onMounted(() => {
  unsubscribe = watchCards(user.value.uid, (docs) => {
    cards.value = docs
  })
})

onUnmounted(() => {
  unsubscribe?.()
})

const cardsByColumn = computed(() => {
  const grouped = {}
  for (const column of COLUMNS) grouped[column.id] = []
  for (const card of cards.value) {
    if (grouped[card.status]) grouped[card.status].push(card)
  }
  return grouped
})

function handleAddCard(columnId, title) {
  addCard(user.value.uid, {
    title,
    status: columnId,
    order: cardsByColumn.value[columnId].length,
  })
}

function handleUpdateCard(cardId, data) {
  updateCard(user.value.uid, cardId, data)
}

function handleDeleteCard(cardId) {
  deleteCard(user.value.uid, cardId)
}

function handleReorder(columnId, newCards) {
  reorderColumn(user.value.uid, columnId, newCards)
}
</script>
