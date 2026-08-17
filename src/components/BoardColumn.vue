<template>
  <div class="flex flex-col w-72 flex-shrink-0 glass-card p-3 max-h-full">
    <div class="flex items-center justify-between px-2 py-1 mb-2">
      <h2 class="text-sm font-bold font-orbitron text-white tracking-wide">{{ column.label }}</h2>
      <span class="text-xs text-gray-500 font-poppins">{{ cards.length }}</span>
    </div>

    <draggable
      :model-value="cards"
      @update:model-value="onListChange"
      item-key="id"
      group="board-cards"
      class="flex-1 space-y-2 overflow-y-auto min-h-[3rem] pb-1"
      ghost-class="opacity-40"
    >
      <template #item="{ element }">
        <TaskCard
          :card="element"
          @update="(data) => $emit('update-card', element.id, data)"
          @delete="$emit('delete-card', element.id)"
        />
      </template>
    </draggable>

    <form @submit.prevent="submitNewCard" class="mt-2 flex gap-1">
      <input
        v-model="newTitle"
        type="text"
        placeholder="+ Add task"
        class="flex-1 px-3 py-2 bg-[#0b0014]/60 border border-[#a855f7]/20 focus:border-[#a855f7]/60 rounded-lg text-xs text-white placeholder-gray-500 outline-none transition-all font-poppins"
      />
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'
import TaskCard from './TaskCard.vue'

const props = defineProps({
  column: { type: Object, required: true },
  cards: { type: Array, required: true },
})
const emit = defineEmits(['update-card', 'delete-card', 'add-card', 'reorder'])

const newTitle = ref('')

// vuedraggable fires update:modelValue on every affected list — for a
// cross-column drag that's both the source (item removed) and destination
// (item added) columns, each with its own already-correct new array.
function onListChange(newCards) {
  emit('reorder', props.column.id, newCards)
}

function submitNewCard() {
  const title = newTitle.value.trim()
  if (!title) return
  emit('add-card', props.column.id, title)
  newTitle.value = ''
}
</script>
