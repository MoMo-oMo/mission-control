<template>
  <div class="glass-card p-4 cursor-grab active:cursor-grabbing hover:border-[#a855f7]/50 transition-all group">
    <div v-if="!editing" @click="startEdit" class="space-y-1">
      <p class="text-sm font-semibold text-white font-poppins break-words">{{ card.title }}</p>
      <p v-if="card.description" class="text-xs text-gray-400 font-poppins break-words">{{ card.description }}</p>
    </div>

    <form v-else @submit.prevent="saveEdit" class="space-y-2">
      <input
        v-model="draftTitle"
        ref="titleInput"
        class="w-full px-2 py-1.5 bg-[#0b0014]/80 border border-[#a855f7]/40 rounded-lg text-sm text-white outline-none font-poppins"
        placeholder="Title"
      />
      <textarea
        v-model="draftDescription"
        rows="2"
        class="w-full px-2 py-1.5 bg-[#0b0014]/80 border border-[#a855f7]/40 rounded-lg text-xs text-white outline-none font-poppins resize-none"
        placeholder="Description (optional)"
      />
      <div class="flex justify-end gap-2 text-xs font-poppins font-semibold">
        <button type="button" @click="cancelEdit" class="px-3 py-1 text-gray-400 hover:text-gray-200">Cancel</button>
        <button type="submit" class="px-3 py-1 bg-[#a855f7]/20 text-[#a855f7] rounded-lg hover:bg-[#a855f7]/30">Save</button>
      </div>
    </form>

    <button
      v-if="!editing"
      type="button"
      @click.stop="$emit('delete')"
      class="mt-2 text-[10px] text-gray-600 hover:text-[#ec4899] opacity-0 group-hover:opacity-100 transition-opacity font-poppins"
    >
      Delete
    </button>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
  card: { type: Object, required: true },
})
const emit = defineEmits(['update', 'delete'])

const editing = ref(false)
const draftTitle = ref('')
const draftDescription = ref('')
const titleInput = ref(null)

async function startEdit() {
  draftTitle.value = props.card.title
  draftDescription.value = props.card.description || ''
  editing.value = true
  await nextTick()
  titleInput.value?.focus()
}

function cancelEdit() {
  editing.value = false
}

function saveEdit() {
  const title = draftTitle.value.trim()
  if (!title) return
  emit('update', { title, description: draftDescription.value.trim() })
  editing.value = false
}
</script>
