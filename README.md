# Tokosedia REST API

Backend REST API for **Tokosedia**, an e-commerce platform built with **Express.js**, **TypeScript**, **Prisma ORM**, and **MySQL**.

## Features

-  JWT Authentication
-  User Management
-  Product Management
-  Shopping Cart
-  Wishlist
-  Shipping Address
-  Payment
-  Transaction Management
-  Product Reviews
-  Activity Logging
-  Request Validation with Zod
-  Centralized Error Handling
-  Logging with Winston

## Tech Stack

- Express.js
- TypeScript
- Prisma ORM
- MySQL
- Zod
- Winston
- Jest
- Supertest

## Architecture

```mermaid
flowchart TD

Client["Client"]
Router["Router"]
Middleware["Middleware<br/>(Authentication & Validation)"]
Controller["Controller"]
Service["Service"]
Prisma["Prisma ORM"]
Database[("MySQL Database")]

Client --> Router
Router --> Middleware
Middleware --> Controller
Controller --> Service
Service --> Prisma
Prisma --> Database
```

## Project Structure

```text
src/
├── application/
├── controller/
├── middleware/
├── model/
├── router/
├── service/
├── validation/
├── error/

prisma/
test/
```

## Installation

### Clone Repository

```bash
git clone https://github.com/randyazharalman/tokosedia-restfull-api.git
cd tokosedia-restfull-api
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file.

```env
DATABASE_URL="mysql://username:password@localhost:3306/tokosedia"
JWT_SECRET="your-secret-key"
PORT=3000
```

### Run Database Migration

```bash
npx prisma migrate dev
```

### Start Development Server

```bash
npm run dev
```

## Running Tests

Run all integration tests.

```bash
npm test
```

The project currently contains **57 integration tests** covering authentication, users, products, shopping cart, wishlist, addresses, payments, transactions, reviews, and activity logging.

## Future Improvements

- Swagger / OpenAPI Documentation
- Docker Support
- GitHub Actions CI/CD Pipeline
