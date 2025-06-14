# Management App Backend 🚀

[![NestJS](https://img.shields.io/badge/NestJS-10.3.8-E0234E?style=for-the-badge&logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.14.0-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Docker](https://img.shields.io/badge/Docker-3.8-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)

Backend API for business management and employee oversight, built with NestJS for scalable and maintainable server-side applications.

> **⚠️ Project Status**: This project was developed between 2023-2024 but remains incomplete. Development work has been temporarily suspended.

## 🌟 Features

- **RESTful API**: Complete REST API with proper HTTP methods and status codes
- **Modern Architecture**: Built with NestJS 10.3.8 and TypeScript
- **Authentication**: JWT-based authentication with Passport.js
- **Database**: PostgreSQL with Prisma ORM for type-safe database operations
- **Task Management**: Complete task tracking and management system
- **Work Schedule**: Employee work schedule management
- **Salary Tracking**: Salary, bonus, and penalty management features
- **Company Management**: Multi-company support with user roles
- **API Documentation**: Swagger/OpenAPI documentation
- **Validation**: Request validation with class-validator

## 🛠️ Tech Stack

- **Framework**: NestJS 10.3.8
- **Language**: TypeScript 5.4.5
- **Database**: PostgreSQL 13 with Prisma 5.14.0
- **Authentication**: Passport.js, JWT, Argon2 for password hashing
- **Validation**: class-validator 0.14.1, class-transformer 0.5.1
- **Documentation**: Swagger/OpenAPI 7.3.1
- **Testing**: Jest 29.7.0, Supertest 7.0.0
- **Linting**: ESLint 8.56.0 with NestJS config
- **Formatting**: Prettier 3.2.5
- **Containerization**: Docker & Docker Compose
- **Firebase**: Firebase Admin SDK for additional services

## 📁 Project Structure

```
├── src/                    # Source code
│   ├── auth/              # Authentication module
│   │   ├── dto/           # Data transfer objects
│   │   ├── guard/         # Authentication guards
│   │   ├── strategy/      # Passport strategies
│   │   ├── auth.controller.ts # Auth endpoints
│   │   ├── auth.module.ts # Auth module configuration
│   │   └── auth.service.ts # Auth business logic
│   ├── common/            # Shared utilities and filters
│   │   └── filters/       # Global exception filters
│   ├── company/           # Company management module
│   ├── config/            # Configuration files
│   ├── pipes/             # Custom validation pipes
│   ├── prisma/            # Database configuration
│   ├── rewards/           # Bonus and penalty management
│   ├── shifts/            # Work shifts management
│   ├── task/              # Task management module
│   │   ├── dto/           # Task DTOs
│   │   ├── task.controller.ts # Task endpoints
│   │   ├── task.module.ts # Task module configuration
│   │   └── task.service.ts # Task business logic
│   ├── user/              # User management module
│   │   ├── dto/           # User DTOs
│   │   ├── types/         # User type definitions
│   │   ├── user.controller.ts # User endpoints
│   │   ├── user.module.ts # User module configuration
│   │   └── user.service.ts # User business logic
│   ├── work-schedule/     # Work schedule management
│   ├── app.controller.ts  # Main application controller
│   ├── app.module.ts      # Root application module
│   ├── app.service.ts     # Application service
│   └── main.ts            # Application entry point
├── prisma/                # Database schema and migrations
│   ├── migrations/        # Database migration files
│   └── schema.prisma      # Prisma schema definition
├── test/                  # End-to-end tests
├── docker-compose.yml     # Docker services configuration
├── nest-cli.json          # NestJS CLI configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- PostgreSQL (or use Docker)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/DanielSledz03/Managment-App-Backend.git
   cd Managment-App-Backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory:

   ```env
   # Database Configuration
   DATABASE_URL="postgresql://postgres:123@localhost:5434/nest"
   
   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=7d
   
   # Application Configuration
   PORT=3000
   NODE_ENV=development
   
   # Firebase Configuration (optional)
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_PRIVATE_KEY=your_firebase_private_key
   FIREBASE_CLIENT_EMAIL=your_firebase_client_email
   ```

4. **Start the database**

   ```bash
   # Start PostgreSQL with Docker
   npm run db:dev:up
   
   # Or restart database and run migrations
   npm run db:dev:restart
   ```

5. **Run database migrations**

   ```bash
   npm run prisma:dev:deploy
   ```

6. **Start the development server**

   ```bash
   npm run start:dev
   ```

7. **Access the API**

   - API Base URL: `http://localhost:3000`
   - Swagger Documentation: `http://localhost:3000/api`

## 📝 Available Scripts

- `npm run start` - Start the application in production mode
- `npm run start:dev` - Start the application in development mode with hot reload
- `npm run start:debug` - Start the application in debug mode
- `npm run start:prod` - Start the application in production mode
- `npm run build` - Build the application and run database migrations
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run ESLint for code quality
- `npm run format` - Format code with Prettier
- `npm run db:dev:up` - Start development database
- `npm run db:dev:rm` - Remove development database
- `npm run db:dev:restart` - Restart development database and run migrations
- `npm run prisma:dev:deploy` - Deploy Prisma migrations

## 🗄️ Database Schema

The application uses PostgreSQL with the following main entities:

- **User**: Employee accounts with authentication and role management
- **Company**: Business entities with administrator relationships
- **Task**: Work assignments with status tracking
- **Shift**: Work time tracking with start/end times
- **WorkSchedule**: Planned work schedules
- **Bonus**: Employee rewards and bonuses
- **Penalty**: Employee penalties and deductions
- **Notification**: System notifications for users

## 🔐 Authentication

The API uses JWT-based authentication with the following features:

- **Registration**: User account creation with password hashing
- **Login**: JWT token generation with refresh capabilities
- **Authorization**: Role-based access control (Admin/User)
- **Password Security**: Argon2 password hashing
- **Token Management**: JWT with configurable expiration

## 📚 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh JWT token

### Users
- `GET /user` - Get current user profile
- `PUT /user` - Update user profile
- `GET /user/:id` - Get user by ID (Admin only)
- `GET /users` - Get all users (Admin only)

### Tasks
- `GET /task` - Get user tasks
- `POST /task` - Create new task
- `PUT /task/:id` - Update task
- `DELETE /task/:id` - Delete task

### Work Schedule
- `GET /work-schedule` - Get work schedules
- `POST /work-schedule` - Create work schedule
- `PUT /work-schedule/:id` - Update work schedule

### Shifts
- `GET /shifts` - Get work shifts
- `POST /shifts` - Create work shift
- `PUT /shifts/:id` - Update work shift

### Rewards
- `GET /rewards` - Get bonuses and penalties
- `POST /rewards/bonus` - Create bonus
- `POST /rewards/penalty` - Create penalty

## 🧪 Testing

The project includes comprehensive testing setup:

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run end-to-end tests
npm run test:e2e
```

## 🔧 Development

### Code Quality

The project uses ESLint and Prettier for code quality and formatting:

```bash
# Check for linting errors
npm run lint

# Format code
npm run format
```

### Database Management

```bash
# Start development database
npm run db:dev:up

# Reset database and run migrations
npm run db:dev:restart

# Generate Prisma client
npx prisma generate
```

## 🐳 Docker

The project includes Docker configuration for easy deployment:

```bash
# Start all services
docker-compose up -d

# Start only database
docker-compose up dev-db -d

# Stop all services
docker-compose down
```

## 📄 License

This project is private and proprietary. All rights reserved.

## 📞 Contact

**Management App Backend**

- Author: Daniel Śledź
- Repository: [Management App Backend](https://github.com/DanielSledz03/Managment-App-Backend)

---

<div align="center">
  <p>Built with ❤️ for efficient business management</p>
  <p>Robust backend solutions for modern businesses</p>
</div>
