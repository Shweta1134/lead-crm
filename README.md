# Lead Management CRM

A full-stack CRM application to manage leads for small businesses.

## Tech Stack

- **Frontend**: React.js + Recharts
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (Mongoose)

## Features

- Add, edit, delete leads
- Change lead status directly from the table
- Search by name, email, or company
- Filter by status
- Sort by any column
- Pagination (10 leads per page)
- Statistics dashboard with bar chart
- Responsive design (works on mobile)

## Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/crm-app.git
cd crm-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file (copy from `.env.example`):

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Get your MongoDB URI from [MongoDB Atlas](https://cloud.mongodb.com) — create a free cluster, then get the connection string.

Start the backend:

```bash
npm run dev
```

Server runs at `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

App runs at `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/leads` | Get all leads (supports search, filter, sort, pagination) |
| GET | `/api/leads/stats` | Get lead count statistics |
| GET | `/api/leads/:id` | Get single lead |
| POST | `/api/leads` | Create new lead |
| PUT | `/api/leads/:id` | Update lead |
| DELETE | `/api/leads/:id` | Delete lead |

### Query Parameters for GET /api/leads

| Param | Description | Example |
|-------|-------------|---------|
| search | Search name, email, company | `?search=john` |
| status | Filter by status | `?status=New` |
| sortBy | Sort field | `?sortBy=name` |
| order | Sort direction | `?order=asc` |
| page | Page number | `?page=2` |
| limit | Results per page | `?limit=10` |

## Lead Fields

| Field | Type | Required |
|-------|------|----------|
| name | String | Yes |
| email | String | Yes |
| phone | String | Yes |
| company | String | Yes |
| status | Enum | No (default: New) |
| notes | String | No |
| createdAt | Date | Auto |

## Deployment

**Backend** — Deploy to [Render](https://render.com):
1. Create new Web Service, connect your GitHub repo
2. Root directory: `backend`
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add environment variable: `MONGO_URI`

**Frontend** — Deploy to [Vercel](https://vercel.com):
1. Import your GitHub repo
2. Root directory: `frontend`
3. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com`

> Update `vite.config.js` proxy target to your deployed backend URL before building.

## Screenshots

_Add screenshots here after running the app_
