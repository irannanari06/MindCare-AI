# MindCare AI

MindCare AI is a simple full-stack Next.js project for the AI Essentials topic **"Provide Mental Health Support and Resources"**.

It uses:

- Next.js App Router + React
- Tailwind CSS
- Next.js API route backend
- Google Gemini API
- Framer Motion
- LocalStorage for mood and chat history
- No database

## Features

- AI wellness chat with Gemini integration
- Crisis phrase alert for messages like "I want to die" or "I want to hurt myself"
- Chat export button
- Mood tracker with history, weekly progress, and streak
- 60 second breathing timer
- Affirmations, journaling prompts, stress tips, and focus tips
- Resources and about page
- Dark mode and relaxing sound toggles saved in LocalStorage

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the project root:

```bash
GEMINI_API_KEY=your_google_gemini_api_key_here
```

You can also run the app without an API key. The chat will use a safe fallback response.

3. Start the development server:

```bash
npm run dev
```

4. Open the app:

```text
http://localhost:3000
```

## Pages

- `/` Home page
- `/chat` AI chat page
- `/toolkit` Mood tracker and self-help toolkit
- `/resources` Resources and about page

## Safety Note

MindCare AI gives emotional support only. It does not diagnose illness, prescribe medicine, or replace a therapist, doctor, counselor, trusted adult, emergency service, or professional help.
