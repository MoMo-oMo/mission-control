<template>
  <div class="flex flex-col w-72 flex-shrink-0 glass-card p-3 max-h-full relative overflow-hidden">
    <div
      class="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
      :style="{ background: column.accent }"
    />

    <div class="flex items-center justify-between px-1 py-1 mb-2 mt-1">
      <div class="flex items-center gap-2 min-w-0">
        <div
          class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          :style="{ background: column.accent + '1f', color: column.accent }"
        >
          <component :is="column.icon" class="w-4 h-4" />
        </div>
        <h2 class="text-sm font-bold font-orbitron text-[#2a2a3c] tracking-wide truncate">{{ column.label }}</h2>
      </div>
      <span
        class="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
        :style="{ background: column.accent + '1f', color: column.accent }"
      >
        {{ cards.length }}
      </span>
    </div>

    <div class="relative flex-1 min-h-[4rem]">
      <draggable
        :model-value="cards"
        @update:model-value="onListChange"
        item-key="id"
        group="board-cards"
        class="h-full space-y-2 overflow-y-auto pb-1"
        ghost-class="opacity-40"
      >
        <template #item="{ element }">
          <TaskCard
            :card="element"
            :accent="column.accent"
            @update="(data) => $emit('update-card', element.id, data)"
            @delete="$emit('delete-card', element.id)"
          />
        </template>
      </draggable>

      <div
        v-if="cards.length === 0"
        class="absolute inset-0 flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg pointer-events-none"
        :style="{ borderColor: column.accent + '30' }"
      >
        <component :is="column.icon" class="w-6 h-6" :style="{ color: column.accent, opacity: 0.35 }" />
        <p class="text-xs text-[#a3a8b8] font-poppins px-4 text-center">No missions here yet</p>
      </div>
    </div>

    <form @submit.prevent="submitNewCard" class="mt-2 flex gap-1">
      <input
        v-model="newTitle"
        type="text"
        placeholder="+ Add task"
        class="flex-1 px-3 py-2 bg-white/50 border border-[#a855f7]/15 focus:border-[#a855f7]/50 rounded-lg text-xs text-[#2a2a3c] placeholder-[#9297a8] outline-none transition-all font-poppins"
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
