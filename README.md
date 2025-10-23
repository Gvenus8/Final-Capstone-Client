# Final Capstone Client

React single-page client for the Final Capstone wellness app ("Eir").  
Provides user auth, journaling, meditation tools (Meditation, Box Breathing, Focus), a Spotify embed, charts for emotion insights, and a release/ceremony animation.

---

## Features
- User authentication (works with the project backend)
- Profile editing and account deletion
- Journal entries and entry count
- Emotion insights visualized with Recharts (pie chart)
- Embedded Spotify player (iframe) with frontend refresh support
- Box Breathing and Focus exercises with optimized animations
- Release ceremony animation (particle / burning effects)

---

## Tech stack
- React (hooks + context)
- react-router
- @radix-ui/themes (UI primitives)
- Recharts (charts)
- Spotify embed (iframe)
- Backend: ASP.NET Core (cookie auth expected) — client expects backend endpoints for auth/profile/entries

---

## Requirements
- Node 16+ (or the version configured by project)
- npm or yarn
- Mac: Terminal (instructions use npm)

---

## Quick start (local)
1. Clone repo
2. Install
   - npm:
     - Open Terminal at project root:
       npm install
3. Add environment variables (create `.env.local`):
   - Example:
     REACT_APP_API_BASE_URL=http://localhost:5000
     REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id (if used by backend)
4. Start dev server
   - npm run dev
   - or npm start (depending on project scripts)
5. Ensure backend is running and accessible at REACT_APP_API_BASE_URL

---

## Build
- npm run build
- Serve the `build` (or `dist`) folder with your preferred static server.

---

## Configuration / Important notes
- The client relies on backend cookie authentication (ASP.NET Core). Cookie expiration, sliding expiration and refresh behavior are controlled server-side.
- Spotify embed uses an iframe. Tokens can expire — the app contains a frontend iframe refresh mechanism (in Layout.jsx) to avoid the player becoming stale for very long sessions.
- If you change backend cookie duration, follow security best practices.

Example `.env.local`:
```env
REACT_APP_API_BASE_URL=http://localhost:5000
# optional, if backend needs it
REACT_APP_SPOTIFY_CLIENT_ID=...

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
