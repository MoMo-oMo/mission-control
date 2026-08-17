<template>
  <AmbientBackground />

  <div v-if="!firebaseConfigured" class="min-h-screen flex items-center justify-center px-4">
    <div class="max-w-md glass-card p-6 space-y-3 text-center">
      <h1 class="text-xl font-bold font-orbitron text-[#2a2a3c]">Firebase not configured</h1>
      <p class="text-sm text-[#6b7085] font-poppins">
        Copy <code class="text-[#ec4899]">.env.example</code> to <code class="text-[#ec4899]">.env</code>
        and fill in your Firebase project's web app config, then restart the dev server.
        See the README for the full setup steps.
      </p>
    </div>
  </div>
  <div v-else-if="!authReady" class="min-h-screen flex items-center justify-center">
    <div class="w-10 h-10 border-4 border-[#a855f7]/30 border-t-[#a855f7] rounded-full animate-spin"></div>
  </div>
  <BoardView v-else-if="user" />
  <LoginView v-else />
</template>

<script setup>
import { user, authReady } from '@/state/auth'
import { firebaseConfigured } from '@/firebase'
import LoginView from '@/views/LoginView.vue'
import BoardView from '@/views/BoardView.vue'
import AmbientBackground from '@/components/AmbientBackground.vue'
</script>
