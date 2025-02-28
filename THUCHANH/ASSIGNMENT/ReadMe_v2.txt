# Task Management System

## Prerequisites
- Docker installed
- Docker Compose installed

## Running the project

1. Open Docker Desktop, then build and start the Docker containers: docker-compose up --build
This will build the backend and frontend Docker images and start the MongoDB container.

2. Access the application:
- Frontend: http://localhost:8080
- Backend: http://localhost:3000
- MongoDB: Running on port 27017.

3. To stop the containers: docker-compose down

## Testing
- Create a new task using the frontend interface or by sending a POST request to the backend `/api/tasks` endpoint.
- View, edit, or delete tasks using the provided frontend controls or through backend API calls.