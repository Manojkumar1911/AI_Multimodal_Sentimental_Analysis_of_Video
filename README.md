# Sentimental Analysis Multimodal AI

This project consists of a frontend and backend application for analyzing sentiment and emotions in videos.

## Project Structure

- `sentimental-analysis-frontend/`: Next.js frontend application
- `video-sentimental-model/`: Python backend application

## Frontend

The frontend is built with Next.js and provides a user interface for uploading videos and viewing sentiment analysis results.

### Setup

```bash
cd sentimental-analysis-frontend/video-sentiment-saas
npm install
npm run dev
```

## Backend

The backend is a Python application that processes videos and performs sentiment analysis.

### Setup

```bash
cd video-sentimental-model
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## Features

- Video upload and processing
- Sentiment analysis
- Emotion detection
- Real-time analysis results
- Modern and responsive UI

## Technologies Used

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: Python, FastAPI
- AI/ML: Various sentiment analysis models

---

# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

```
video-sentiment-saas
├─ .eslintrc.cjs
├─ next.config.js
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ prettier.config.js
├─ prisma
│  ├─ migrations
│  │  ├─ 20250423183548_name_add_password_field
│  │  │  └─ migration.sql
│  │  ├─ 20250424035604_add_unique_api_quota_id
│  │  │  └─ migration.sql
│  │  └─ migration_lock.toml
│  └─ schema.prisma
├─ public
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ app
│  │  ├─ actions
│  │  │  └─ auth.ts
│  │  ├─ api
│  │  │  └─ auth
│  │  │     └─ [...nextauth]
│  │  │        └─ route.ts
│  │  ├─ layout.tsx
│  │  ├─ login
│  │  │  └─ page.tsx
│  │  ├─ page.tsx
│  │  └─ signup
│  │     └─ page.tsx
│  ├─ env.js
│  ├─ middleware.ts
│  ├─ schemas
│  │  └─ auth.ts
│  ├─ server
│  │  ├─ auth
│  │  │  ├─ config.ts
│  │  │  └─ index.ts
│  │  └─ db.ts
│  └─ styles
│     └─ globals.css
├─ tailwind.config.ts
└─ tsconfig.json

```
