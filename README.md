# Recess

> **Khelo. Milo. Chill karo.**
> A friendly sports community platform — web + mobile — where people join weekend badminton, football, cricket, running and more.

Built as a pnpm monorepo with:

- **Web** — Vite + React 18 + TypeScript + Tailwind + Firebase
- **Mobile** — Expo (React Native) + Expo Router + Firebase
- **Shared** — TypeScript package (`@pp/shared`) with Firebase services (auth, events, RSVPs) reused by both apps
- **Backend** — Firebase (Auth + Firestore + Storage + Hosting)

---

## Table of contents

1. [Project layout](#project-layout)
2. [Quick start — run locally](#quick-start--run-locally)
3. [Firebase setup (one-time)](#firebase-setup-one-time)
4. [Making yourself an admin](#making-yourself-an-admin)
5. [Deploying the web app to production](#deploying-the-web-app-to-production)
6. [Deploying the mobile app](#deploying-the-mobile-app)
7. [GitHub setup & CI/CD](#github-setup--cicd)
8. [Available scripts](#available-scripts)
9. [Architecture notes](#architecture-notes)

---

## Project layout

```
.
├── apps/
│   ├── web/          # Vite + React web app (@pp/web)
│   └── mobile/       # Expo React Native app (@pp/mobile)
├── packages/
│   └── shared/       # Types + Firebase services shared by web & mobile (@pp/shared)
├── firebase.json     # Firebase Hosting + Firestore + Storage config
├── firestore.rules   # Firestore security rules
├── storage.rules     # Storage security rules
└── .github/workflows # CI + auto-deploy pipelines
```

---

## Quick start — run locally

**Prerequisites:** Node.js ≥ 20, [pnpm](https://pnpm.io/installation) ≥ 11 (`corepack enable` + `corepack prepare pnpm@latest --activate`).

```bash
# Clone
git clone <your-repo-url> recess && cd recess

# Install everything
pnpm install

# Run the web app (demo mode — no Firebase needed)
pnpm web
# → open http://localhost:5173
```

You'll see a yellow **Demo mode** banner. The site works end-to-end with sample events; sign-in and RSVP are disabled until you connect Firebase (next step).

---

## Firebase setup (one-time)

Recess uses one Firebase project for Auth, Firestore, Storage, and Hosting.

### 1. Create the Firebase project

1. Go to https://console.firebase.google.com → **Add project**
2. Name it (e.g. `recess-app`) → skip Analytics (or enable, up to you)
3. Wait for it to provision

### 2. Enable services

Inside the project:

- **Build → Authentication** → *Get started* → **Sign-in method** tab → enable **Email/Password**
- **Build → Firestore Database** → *Create database* → **Production mode** → pick region `asia-south1` (Mumbai)
- **Build → Storage** → *Get started* → **Production mode** → same region

### 3. Register the web app

1. Project settings (⚙️ top left) → **General** → scroll to *Your apps*
2. Click the **`</>`** (web) icon → nickname `recess-web` → **Register app**
3. Copy the `firebaseConfig` object shown — you'll paste these into `.env.local` next

### 4. Wire the values into the web app

```bash
cp apps/web/.env.example apps/web/.env.local
```

Edit `apps/web/.env.local`:

```env
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=recess-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=recess-app
VITE_FIREBASE_STORAGE_BUCKET=recess-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:1234:web:abcd
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXX   # optional
```

### 5. Point the CLI at your project

Edit `.firebaserc` and put your project ID:

```json
{ "projects": { "default": "recess-app" } }
```

### 6. Publish rules + indexes

```bash
# Install Firebase CLI once
npm i -g firebase-tools

# Log in
firebase login

# Push security rules + Firestore indexes
firebase deploy --only firestore:rules,firestore:indexes,storage
```

### 7. Reload the app

```bash
pnpm web
```

Banner is gone. Sign-up works. Create an account → check the Firebase console → **Authentication → Users** and **Firestore → users** to confirm.

---

## Making yourself an admin

Firestore rules require your user document to have `role: "admin"` (or `"organizer"`) before you can create/edit/delete events.

1. Sign up in the app with your real email
2. Firebase Console → **Firestore Database** → `users` collection → find your document (matches your UID)
3. Add a field: `role` (string) = `admin`
4. Refresh the app — **Admin** appears in the top navbar
5. Go to `/admin` → *New event* → publish your first game

Do the same to promote co-organizers (set their `role` to `organizer` — they get everything except role changes).

---

## Deploying the web app to production

Recess deploys to **Firebase Hosting** (free tier is generous). Two ways:

### Option A — Manual deploy (fastest first time)

```bash
# Build
pnpm --filter @pp/web build

# Deploy (uses firebase.json + .firebaserc)
firebase deploy --only hosting
```

Your site is live at `https://<project-id>.web.app` and `https://<project-id>.firebaseapp.com` in about 30 seconds.

### Option B — Custom domain

1. Firebase Console → **Hosting** → **Add custom domain** → enter `recess.club` (or whatever you own)
2. Follow the DNS instructions (add the two `A` records)
3. SSL cert provisions automatically in ~30 min

### Option C — Auto-deploy on every push to `main`

Handled by [.github/workflows/deploy-web.yml](.github/workflows/deploy-web.yml). Requires GitHub secrets (see [GitHub setup](#github-setup--cicd)).

---

## Deploying the mobile app

The mobile app uses **Expo** and **EAS Build** to produce native iOS + Android binaries without you needing Xcode/Android Studio locally.

### One-time mobile setup

1. Install Expo tooling: `npm i -g eas-cli expo`
2. Log in: `eas login` (create an account at https://expo.dev if needed)
3. `cd apps/mobile && eas build:configure`
4. Paste your Firebase config into `apps/mobile/app.json` → `expo.extra.firebase.*`
5. Update the EAS project ID: `eas init` (this writes to `expo.extra.eas.projectId`)

### Build for testing (Android APK / iOS internal)

```bash
cd apps/mobile
pnpm build:android   # generates an installable .apk
pnpm build:ios       # requires an Apple Developer account
```

Both builds run on Expo's cloud (~15 min). You get a download URL when done.

### Submit to the stores

```bash
pnpm submit:android   # → Play Store internal testing
pnpm submit:ios       # → App Store TestFlight
```

You'll need:
- **Play Store:** Google Play Console account (~$25 one-time), a service account JSON for automated submits
- **App Store:** Apple Developer account ($99/year), TestFlight testers

Full guide: https://docs.expo.dev/submit/introduction/

---

## GitHub setup & CI/CD

### 1. Push to GitHub

```bash
# In the repo root
git init
git add .
git commit -m "chore: initial commit — Recess v0.1"
git branch -M main

# Create an empty repo on GitHub (do NOT initialise with README)
# Then:
git remote add origin git@github.com:<your-username>/recess.git
git push -u origin main
```

### 2. Configure GitHub Secrets

Go to your repo → **Settings → Secrets and variables → Actions** and add:

| Secret name | Value |
|---|---|
| `FIREBASE_PROJECT_ID` | Your Firebase project ID (e.g. `recess-app`) |
| `FIREBASE_SERVICE_ACCOUNT` | JSON contents of a Firebase service account key — see below |
| `VITE_FIREBASE_API_KEY` | From your web `firebaseConfig` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Same |
| `VITE_FIREBASE_PROJECT_ID` | Same |
| `VITE_FIREBASE_STORAGE_BUCKET` | Same |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Same |
| `VITE_FIREBASE_APP_ID` | Same |
| `VITE_FIREBASE_MEASUREMENT_ID` | Optional |
| `EXPO_TOKEN` | (For mobile CI) — from https://expo.dev → Account settings → Access tokens |

**To generate a `FIREBASE_SERVICE_ACCOUNT`:**

1. Firebase Console → ⚙️ → **Project settings** → **Service accounts** tab
2. Click **Generate new private key** → download the JSON
3. Copy the *entire file contents* into the `FIREBASE_SERVICE_ACCOUNT` secret

### 3. What runs automatically

- **[ci.yml](.github/workflows/ci.yml)** — on every PR and push: typecheck + build
- **[deploy-web.yml](.github/workflows/deploy-web.yml)** — on push to `main`: build + deploy to Firebase Hosting (live channel)
- **[deploy-rules.yml](.github/workflows/deploy-rules.yml)** — on rules/indexes change: publish new Firestore + Storage rules
- **[mobile-eas.yml](.github/workflows/mobile-eas.yml)** — manual trigger: EAS build for Android/iOS

---

## Available scripts

Run from the repo root.

| Command | What it does |
|---|---|
| `pnpm web` | Start the web dev server (`http://localhost:5173`) |
| `pnpm web:build` | Production build to `apps/web/dist` |
| `pnpm mobile` | Start Expo dev server (scan QR with Expo Go app) |
| `pnpm mobile:ios` | Launch on iOS simulator |
| `pnpm mobile:android` | Launch on Android emulator |
| `pnpm --filter @pp/web typecheck` | TS check the web app |
| `firebase deploy --only hosting` | Deploy web to Firebase Hosting |
| `firebase deploy --only firestore:rules,firestore:indexes,storage` | Publish rules & indexes |
| `firebase emulators:start` | Run Auth/Firestore/Storage locally without touching prod |

---

## Architecture notes

### Shared package (`@pp/shared`)

Both apps import the same TypeScript module:

```ts
import { initFirebase, signInWithEmail, listEvents, enrollInEvent } from "@pp/shared";
```

This means:
- Types (`SportEvent`, `RSVP`, `UserProfile`) are consistent between web and mobile
- Firestore queries live in one place; a bug fix ships to both apps at once
- Adding a new feature (e.g. leagues) — add it in `@pp/shared`, both apps get it

### Firestore data model

```
users/{uid}
  ├─ displayName, email, phone, city, role, favouriteSports, ...

events/{eventId}
  ├─ title, sport, description, coverImage, venue, address
  ├─ startsAt, endsAt (epoch ms)
  ├─ capacity, enrolledCount, price
  ├─ skillLevel, tags[], perks[], status
  └─ organizer: { uid, name }

rsvps/{eventId}_{uid}
  ├─ eventId, uid, displayName, photoURL
  ├─ status: "going" | "waitlist" | "cancelled"
  └─ paymentStatus: "unpaid" | "paid" | "refunded"
```

RSVP is done via a **Firestore transaction** so capacity is enforced atomically (no over-booking). See [rsvp.ts](packages/shared/src/services/rsvp.ts).

### Security

- Anyone can **read** events (public listing)
- Only signed-in users can **RSVP** (only for themselves — enforced by rule that `rsvpId == eventId + "_" + uid`)
- Only users with `role: "organizer"` or `"admin"` can create/edit/delete events
- Users cannot elevate their own role (rule blocks writes to the `role` field unless the caller is admin)
- Full ruleset in [firestore.rules](firestore.rules)

### Demo mode

If the Vite env vars are missing/empty, `bootstrapFirebase()` returns `{ configured: false }` and the app runs against a small set of curated mock events — great for local development or previewing without a Firebase account.

---

## License

Private / all rights reserved (for now).

---

Built with love, chai, and too many missed drop shots.
