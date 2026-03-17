# NASA Dashboard 🚀

NASA Dashboard is a full-stack application that simulates planning and scheduling interstellar missions to **Kepler exoplanets**. The platform allows users to schedule launches, monitor missions, and view historical launch data.

Along with the mission planning system, the project integrates the **SpaceX public API** to import real launch data, which is normalized and mapped into the application's internal schema.

The application is divided into two main components:

* **Server** – handles API logic, mission scheduling, and data ingestion
* **Client** – provides a dashboard interface for interacting with launch and mission data

---

## Features

* Schedule missions to habitable **Kepler planets**
* Track upcoming and historical launches
* Integration with the **SpaceX API** to fetch real launch data
* Schema mapping and normalization of external launch data
* Launch abort functionality
* Concurrent execution of client and server
* Automated testing for both frontend and backend

---

## Project Structure

```
project-root
│
├── client/        # React frontend dashboard
├── server/        # Node.js backend and API
└── package.json   # Root scripts for running both services
```

---

## Tech Stack

### Frontend

* React
* JavaScript
* REST API

### Backend

* Node.js
* Express
* Axios

### Tools

* Concurrently
* Jest (testing)

---

## Installation

Clone the repository:

```bash
git clone <repo-url>
cd nasa-dashboard
```

Install dependencies:

```bash
npm run install-server
npm run install-client
```

---

## Running the Application

Start both frontend and backend together:

```bash
npm run watch
```

This runs:

* Backend API server
* Frontend client application

---

## Running Individual Services

Run backend only:

```bash
npm run server
```

Run frontend only:

```bash
npm run client
```

---

## Running Tests

Run tests for both client and server:

```bash
npm run test
```

---

## Data Sources

The system uses two primary data sources:

1. **Kepler exoplanet dataset** for identifying potentially habitable planets.
2. Launch data from the **SpaceX public API**, which is ingested and mapped to the internal launch schema.

---

## Mission Workflow

1. The system loads habitable **Kepler planets**.
2. Users schedule a mission to a selected planet.
3. The backend validates and stores the launch.
4. The dashboard displays mission status and launch history.

---

## License

MIT License
