# AI Chatbot Backend

A Node.js/Express backend for an AI Chatbot application with user authentication and chat management.

## Features

- User registration and login with password authentication
- JWT-based authentication
- MongoDB database integration
- CORS enabled for frontend communication
- Health check endpoint for deployment monitoring
- Error handling and validation
- Production-ready configuration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd Backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file by copying the example:
   ```bash
   cp .env.example .env
   ```

5. Update the `.env` file with your configuration:
   ```bash
   # MongoDB Connection
   MONGO_URI=your_mongodb_connection_string
   
   # JWT Secret (generate a strong random string)
   Jwt_sec=your_super_secret_jwt_key
   
   # Frontend URL
   FRONTEND_URL=http://localhost:5173
   
   # Server Port
   PORT=5000
   
   # Environment
   NODE_ENV=development
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 5000).

## API Endpoints

### User Authentication

#### Register User
- **POST** `/api/user/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "jwt_token"
  }
  ```

#### Login User
- **POST** `/api/user/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "jwt_token"
  }
  ```

#### Get User Profile
- **GET** `/api/user/me`
- **Headers:** `token: jwt_token`
- **Response:**
  ```json
  {
    "message": "Profile fetched successfully",
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
  ```

### Health Check

#### Server Health
- **GET** `/health`
- **Response:**
  ```json
  {
    "status": "OK",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "environment": "development"
  }
  ```

#### Root Endpoint
- **GET** `/`
- **Response:**
  ```json
  {
    "message": "AI Chatbot API is running",
    "version": "1.0.0",
    "environment": "development"
  }
  ```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/ai-chatbot` |
| `Jwt_sec` | JWT secret key for token generation | `dev-jwt-secret` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment (development/production) | `development` |

## Deployment

### Local Development
1. Ensure MongoDB is running locally
2. Set `MONGO_URI=mongodb://localhost:27017/ai-chatbot` in `.env`
3. Run `npm run dev`

### Production Deployment (Render, Heroku, etc.)
1. Set environment variables in your hosting platform
2. Use a cloud MongoDB service (MongoDB Atlas, etc.)
3. Set `NODE_ENV=production`
4. Use the health check endpoint (`/health`) for monitoring

### Docker Deployment
Create a `Dockerfile`:
```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- CORS protection
- Input validation
- Error handling without exposing sensitive information

## Error Handling

The application includes comprehensive error handling:
- Validation errors (400 status)
- Authentication errors (401 status)
- Not found errors (404 status)
- Server errors (500 status)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.