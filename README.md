# Anish Patel - Portfolio Website

A modern portfolio website built with React, TypeScript, Material UI, GSAP, and Django REST Framework.

## Features

- **Frontend**: React 18 with TypeScript, Material UI (custom dark theme), GSAP for animations, Vite for build, Axios for API calls
- **Backend**: Django 4.2, Django REST Framework, PostgreSQL, Python 3.9+
- **Analytics**: Real-time page view and session analytics, PostHog integration
- **Responsive Design**: Mobile-first, works on all devices
- **Parallax and Scroll Animations**: GSAP-powered effects
- **Skills, Projects, Resume, and Contact Sections**: Modular, easily extensible
- **Docker Support**: For both frontend and backend
- **CI/CD**: CircleCI for continuous integration
- **Linting & Formatting**: ESLint, Prettier, Black, isort, flake8, mypy

## Quick Setup

### Prerequisites

- Node.js (v16 or higher)
- Python 3.9+
- npm (comes with Node.js)
- PostgreSQL (local or cloud, e.g. Neon)

### 1. Clone the Repository

```bash
git clone https://github.com/anishdpatel28/anishdpatel28.github.io.git
cd anishdpatel28.github.io
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory and set the required environment variables. (Contact the maintainer for the correct values.)

### 3. Install Dependencies and Set Up

```bash
npm run setup
```

This will:

- Install frontend and backend dependencies
- Set up the Python virtual environment
- Prepare the database

### 4. Start the Application

```bash
npm start
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8000](http://localhost:8000)

## Database Schema

The application uses PostgreSQL with the following schema for analytics:

```sql
CREATE TABLE pageviews_pageanalytics (
    id SERIAL PRIMARY KEY,
    page_views INTEGER NOT NULL DEFAULT 0,
    time_spent_home INTEGER NOT NULL DEFAULT 0,
    time_spent_about INTEGER NOT NULL DEFAULT 0,
    time_spent_skills INTEGER NOT NULL DEFAULT 0,
    time_spent_projects INTEGER NOT NULL DEFAULT 0,
    time_spent_resume INTEGER NOT NULL DEFAULT 0,
    time_spent_contact INTEGER NOT NULL DEFAULT 0,
    most_viewed_section VARCHAR(20) NOT NULL DEFAULT 'home',
    average_session_duration INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL
);
```

## Project Structure

```text
anishdpatel28.github.io/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   ├── themes/           # Material UI themes
│   └── dist/                 # Build output
├── backend/                  # Django backend
│   ├── portfolio_backend/    # Django project settings
│   ├── pageviews/            # Analytics app
│   └── venv/                 # Python virtual environment
├── docker-compose.yml        # Docker configuration
├── setup.sh                  # One-command setup script
├── package.json              # Root scripts and dependencies
└── README.md                 # Project documentation
```
