# AI Cube Portfolio

A futuristic full-stack portfolio web application featuring a clickable 3D cube UI powered by React, Three.js, Express, and MySQL.

## Project Structure

```text
ai-cube-portfolio/
├── client/
├── server/
└── database/
```

## Tech Stack

- Frontend: React + Vite + Tailwind CSS + Three.js
- Backend: Node.js + Express.js
- Database: MySQL with `mysql2`

## Environment Setup

### Server

Copy `server/.env.example` to `server/.env` and update the values:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=ai_cube_portfolio
```

### Client

Copy `client/.env.example` to `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Database Setup

Run the SQL files in this order:

1. `database/schema.sql`
2. `database/seed.sql`

Example:

```sql
SOURCE E:/My work/ai-cube-portfolio/database/schema.sql;
SOURCE E:/My work/ai-cube-portfolio/database/seed.sql;
```

## Install Dependencies

From the project folders:

```bash
cd client
npm install
```

```bash
cd server
npm install
```

## Run the Application

Start the API server:

```bash
cd server
npm run dev
```

Start the frontend:

```bash
cd client
npm run dev
```

Open `http://localhost:5173`.

## API Routes

- `GET /api/about`
- `GET /api/projects`
- `GET /api/skills`
- `GET /api/experience`
- `GET /api/education`
- `GET /api/contact`

## Features

- Interactive 3D cube with six resume sections
- Click-to-rotate and mobile swipe navigation
- Dark AI-themed UI with neon cyan glow and glassmorphism
- Express REST API backed by MySQL
- Dynamic React rendering using API data
- AI-themed loading animation and particle background
