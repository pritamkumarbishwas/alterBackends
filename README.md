# AlterBackends

AlterBackends is a backend project built using **Node.js**, **Express.js**, and **MongoDB** to provide a robust and efficient RESTful API for managing various operations. This repository aims to deliver clean, reusable, and scalable code for backend development.


# API Collection Already there . import in postman then test all endpoints
# Note : Run Redis in Docker and locally 


## Features

- RESTful API architecture
- MongoDB integration for database management
- Authentication and Authorization (JWT-based)
- Environment-based configurations
- Error handling and validation using **Joi**
- Scalable project structure

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Joi** for validation
- **JWT** for authentication
- **Redis** for Cache
- **Docker** for Containerization
- **Passport** for Google Auth

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pritamkumarbishwas/alterBackends.git
   ```

2. Navigate to the project directory:
   ```bash
   cd alterBackends
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and configure the following environment variables:
   ```env
    PORT=8000
    MONGODB_URI=mongodb+srv://pritamkumarbishwas85:pritamkumarbishwas85@ac-fuiy2cn.ms5zqss.mongodb.net
    CORS_ORIGIN=*
    
    ACCESS_TOKEN_SECRET=ABCKEFGHIJKLMNOPQRSTUVWXYZ@@~!@~!@~!
    ACCESS_TOKEN_EXPIRY=2d
    
    REFRESH_TOKEN_SECRET=ABCKEFGHIJKLMNOPQRSTUVWXYZ@@~!@~!@~!
    REFRESH_TOKEN_EXPIRY=10d
    
      
    GOOGLE_CLIENT_ID=56398178631-m6kdg7v8js5haj1o32b16grc2h40509i.apps.googleusercontent.com
    GOOGLE_CLIENT_SECRET=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
    
    SESSION_SECRET=ABCKEFGHIJKLMNOPQRSTUVWXYZ@@~!@~!@~!
    
    BASE_URL=http://localhost:8000/api/v1
    
    REDIS_HOST=127.0.0.1
    REDIS_PORT=6379
    REDIS_PASSWORD=

   ```

5. Start the server:
   ```bash
   npm start
   ```

6. The API server will run at `http://localhost:8000/api/v1/`.

## Endpoints

### User Authentication
- `http://localhost:8000/api/v1/auth/login`
  
- `GET  /auth/login` - Authentication user using google login
- `auth/login` - Authentication user using google login Ui Design
- `auth/google` - Authentication user using google login Request
- `auth/google/callback` - Authentication user using google Call Back
- `auth/login/failure` - Failure  google login

### Short URL Creation
-`http://localhost:8000/api/v1/url/shorten`
-`http://localhost:8000/api/v1/url/shorten/google`

- `POST /url/shorten` - Create Short Url
- `GET /url/shorten/:{alias}` - Get Url using alias


  

### Analytics
-`http://localhost:8000/api/v1/analytics/google`
-`http://localhost:8000/api/v1/analytics/overall`
-`http://localhost:8000/api/v1/analytics/topic/login`

- `POST /analytics/:{alias}` - Get analytics using Alias
- `GET /analytics/topic/:{topic}` - Get analytics using Topic wise
- `GET /analytics/overall` - Get Overall analytics 


## Project Structure

```plaintext
alterBackends/src/
├── controllers/       # API controllers
├── db/                # DB Setup
├── middlewares/       # Custom middleware
├── models/            # Database models (Mongoose schemas)
├── routes/            # API routes
├── services/          # Services
├── utils/             # Utility functions
├── validations/       # validations
├── views/             # Views
├── .env.example       # Example environment variables
├── app.js             # setp routes and redux and express and etc
├── constant.js        # Database name
├── index.js          # Entry point of the application
└── package.json       # Dependencies and scripts
```

## Development

To run the application in development mode with live-reloading, use:
```bash
npm run dev
```

## Scripts

- `npm start`: Start the application
- `npm run dev`: Start the application in development mode
- `npm test`: Run tests (if configured)
