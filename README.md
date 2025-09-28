# CycleCore API

A modern lifecycle management API built with NestJS for tracking objects through their complete lifecycle phases.

## 🚀 Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd CycleCore-api

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start the development server
npm run start:dev
```

## 🏗️ What It Does

CycleCore manages object lifecycles through a simple hierarchy:

```
ObjectType → Object → Lifeline → Episodes
```

- **Object Types**: Categories like "Vehicle" or "Equipment"
- **Objects**: Individual items like "Car ABC-123"
- **Lifelines**: Lifecycle management for each object
- **Episodes**: Events like "Manufacturing", "In Service", "Maintenance"

## 📡 API Overview

```bash
# Create an object type
POST /object-types {"name": "Vehicle"}

# Create an object
POST /objects {"name": "Car-001", "objectTypeId": 1}

# Create a lifeline
POST /lifelines {"name": "Car-001 Lifecycle"}

# Add lifecycle episodes
POST /episodes {"name": "Manufacturing", "lifelineId": 1}
```

## 🛠️ Tech Stack

- **NestJS** - Progressive Node.js framework
- **TypeORM** - Database ORM
- **PostgreSQL** - Primary database
- **Jest** - Testing framework
- **Class Validator** - Input validation

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:cov
```

## 📚 Documentation

- API Endpoints
- Core Module Guide
- Database Schema

## 🔧 Environment Variables

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=cycle_core
```

## 📄 License

MIT License - see LICENSE file for details.

---

**Built with ❤️ using NestJS**
