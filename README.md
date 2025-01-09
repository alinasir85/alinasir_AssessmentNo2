# Real Estate Financial Calculator

A modern, efficient real estate investment analysis tool built with React and NestJS that provides real-time financial calculations and visualizations.

![](/Users/alinasir/Desktop/fin.png)

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Features

- Real-time financial metrics calculation:
    - Internal Rate of Return (IRR)
    - Capitalization Rate
    - Cash on Cash Return
    - Monthly Mortgage Payments
    - Net Operating Income (NOI)
- Interactive cash flow visualization
- Responsive design optimized for desktop and mobile
- Modular architecture for easy extension
- Comprehensive test coverage


## Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- PostgreSQL (v14 or higher)
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/real-estate-calculator.git
cd real-estate-calculator
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Set up environment variables:
```bash
# Frontend (.env.local)
VITE_API_URL=http://localhost:3000
VITE_API_KEY=your_api_key

# Backend (.env)
DATABASE_URL=postgresql://user:password@localhost:5432/real_estate
JWT_SECRET=your_jwt_secret
```

## Development

1. Start the backend development server:
```bash
cd backend
npm run start:dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Access the application at `http://localhost:5173`

## Libraries and Tools

### Frontend
- **React**: UI framework
- **shadcn/ui**: Component library
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Data visualization
- **Vite**: Build tool and development server
- **TypeScript**: Type safety
- **React Query**: Server state management
- **Zod**: Schema validation
- **Vitest**: Unit testing
- **Cypress**: E2E testing

### Backend
- **NestJS**: Node.js framework
- **TypeORM**: Object-Relational Mapping
- **PostgreSQL**: Database
- **Jest**: Testing framework
- **Swagger**: API documentation
- **class-validator**: DTO validation
- **Winston**: Logging

## API Documentation

The API documentation is available at `http://localhost:3000/api` when running the backend server. It includes:

- Detailed endpoint descriptions
- Request/response schemas
- Authentication requirements
- Example requests

## Testing

### Frontend Testing
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

### Backend Testing
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

## Deployment

### Production Build

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Build the backend:
```bash
cd backend
npm run build
```

### Docker Deployment

1. Build the Docker images:
```bash
docker-compose build
```

2. Start the containers:
```bash
docker-compose up -d
```

## Performance Considerations

- Memoized calculations using React.useMemo
- Efficient data structures for financial calculations
- Debounced input handling
- Lazy loading of heavy components
- Optimized database queries with proper indexing

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please email support@realestatecalculator.com or open an issue in the repository.

