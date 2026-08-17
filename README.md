# Mission Control

A realtime collaborative task board — Vue 3 + Firebase (Auth + Firestore).
Sign in, drag cards across mission phases, and watch changes sync live
across every open tab/device for that account.

**[Live demo →](https://momo-omo.github.io/mission-control/)**

## Features

- **Auth** — email/password, or "Continue as Guest" via Firebase Anonymous
  Auth for zero-friction demoing.
- **Realtime board** — cards live in Firestore under `boards/{uid}/cards`;
  a `onSnapshot` listener means every open tab reflects changes instantly,
  no refresh needed.
- **Drag and drop** — [vuedraggable](https://github.com/SortableJS/vue.draggable.next)
  across four mission phases: Pre-Launch → In Orbit → Re-Entry → Touchdown.
  Order and column are persisted on drop.
- **Owner-scoped security** — Firestore rules (`firestore.rules`) restrict
  each board to its own signed-in user, guest sessions included.

## Tech stack

- Vue 3 (`<script setup>`, no router — a single auth-gated view)
- Firebase JS SDK v11 (Auth + Firestore)
- Tailwind CSS
- Vite

## Local setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com).
2. Authentication → Sign-in method → enable **Email/Password** and
   **Anonymous**.
3. Firestore Database → create a database (production mode is fine — the
   rules in `firestore.rules` handle access control).
4. Project settings → Your apps → add a **Web app** → copy its config.
5. Copy `.env.example` to `.env` and fill in the values from step 4.
6. Firestore Database → Rules → paste in the contents of `firestore.rules` → Publish.

```bash
npm install
npm run dev
```

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds
the site (reading the `VITE_FIREBASE_*` values from repo secrets — Settings
→ Secrets and variables → Actions) and publishes `dist/` to GitHub Pages.
In the repo's **Settings → Pages**, set **Source** to **GitHub Actions**
once, and it deploys automatically after that.

One more Firebase-side step for the deployed site to work: **Authentication
→ Settings → Authorized domains** → add `<your-username>.github.io`, or
sign-in will fail with `auth/unauthorized-domain`.

## Possible next steps

The schema (`boards/{uid}/cards/{cardId}`) is intentionally simple — a
natural extension would be a `members` array on a board doc to support
true multi-user shared boards, rather than one board per account.
