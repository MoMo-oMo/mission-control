<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-sm space-y-6">
      <div class="text-center space-y-3">
        <div class="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#a855f7] to-[#ec4899] shadow-lg shadow-purple-500/25">
          <component :is="RocketIcon" class="w-8 h-8 text-white" />
        </div>
        <h1 class="text-3xl font-bold font-orbitron text-[#2a2a3c] glow-text">
          Mission <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ec4899]">Control</span>
        </h1>
        <p class="text-sm text-[#6b7085] font-poppins">A realtime task board — sign in to launch your mission.</p>
      </div>

      <div class="glass-card p-6 space-y-4">
        <div class="flex gap-2 text-sm font-poppins font-semibold">
          <button
            type="button"
            @click="mode = 'signin'"
            class="flex-1 py-2 rounded-lg transition-all"
            :class="mode === 'signin' ? 'bg-[#a855f7]/15 text-[#a855f7]' : 'text-[#8b90a3] hover:text-[#2a2a3c]'"
          >
            Sign In
          </button>
          <button
            type="button"
            @click="mode = 'signup'"
            class="flex-1 py-2 rounded-lg transition-all"
            :class="mode === 'signup' ? 'bg-[#a855f7]/15 text-[#a855f7]' : 'text-[#8b90a3] hover:text-[#2a2a3c]'"
          >
            Sign Up
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-3">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
            class="w-full px-4 py-3 bg-white/50 border border-[#a855f7]/20 focus:border-[#a855f7]/60 focus:ring-2 focus:ring-[#a855f7]/20 rounded-xl text-[#2a2a3c] placeholder-[#9297a8] outline-none transition-all font-poppins text-sm"
          />
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
            minlength="6"
            class="w-full px-4 py-3 bg-white/50 border border-[#a855f7]/20 focus:border-[#a855f7]/60 focus:ring-2 focus:ring-[#a855f7]/20 rounded-xl text-[#2a2a3c] placeholder-[#9297a8] outline-none transition-all font-poppins text-sm"
          />

          <p v-if="errorMessage" class="text-sm text-[#ec4899] font-poppins">{{ errorMessage }}</p>

          <button
            type="submit"
            :disabled="submitting"
            class="w-full py-3 bg-gradient-to-r from-[#a855f7] to-[#ec4899] rounded-xl font-semibold text-sm text-white hover:scale-[1.02] transition-transform glow-button disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {{ mode === 'signin' ? 'Sign In' : 'Create Account' }}
          </button>
        </form>

        <div class="flex items-center gap-3 text-xs text-[#8b90a3] font-poppins">
          <div class="flex-1 h-px bg-[#a855f7]/20" />
          or
          <div class="flex-1 h-px bg-[#a855f7]/20" />
        </div>

        <button
          type="button"
          @click="handleGuest"
          :disabled="submitting"
          class="w-full py-3 bg-white/40 border border-[#a855f7]/25 rounded-xl font-semibold text-sm text-[#a855f7] hover:bg-[#a855f7]/10 transition-all disabled:opacity-60"
        >
          Continue as Guest
        </button>
        <p class="text-xs text-[#8b90a3] font-poppins text-center">
          Guest boards live in this browser only — sign up to keep yours across devices.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { signIn, signUp, continueAsGuest } from '@/state/auth'
import { RocketIcon } from '@/icons'

const mode = ref('signin')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const submitting = ref(false)

const FRIENDLY_ERRORS = {
  'auth/invalid-credential': 'Incorrect email or password.',
  'auth/email-already-in-use': 'An account with that email already exists.',
  'auth/weak-password': 'Password must be at least 6 characters.',
  'auth/invalid-email': 'That email address looks invalid.',
}

async function handleSubmit() {
  errorMessage.value = ''
  submitting.value = true
  try {
    if (mode.value === 'signin') {
      await signIn(email.value, password.value)
    } else {
      await signUp(email.value, password.value)
    }
  } catch (err) {
    errorMessage.value = FRIENDLY_ERRORS[err.code] || 'Something went wrong. Please try again.'
  } finally {
    submitting.value = false
  }
}

async function handleGuest() {
  errorMessage.value = ''
  submitting.value = true
  try {
    await continueAsGuest()
  } catch {
    errorMessage.value = 'Could not start a guest session. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.glow-text {
  text-shadow: 0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(168, 85, 247, 0.3);
}
</style>
