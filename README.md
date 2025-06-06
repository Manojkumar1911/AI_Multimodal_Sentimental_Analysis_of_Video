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