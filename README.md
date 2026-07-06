# Tokosedia REST API

Backend REST API for Tokosedia, an e-commerce platform built with Express.js, TypeScript, Prisma ORM, and MySQL.

## Features

✅ JWT Authentication

✅ User Management

✅ Product Management

✅ Shopping Cart

✅ Wishlist

✅ Shipping Address

✅ Payment

✅ Transaction

✅ Product Review

✅ Activity Log

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

Router
↓

Controller
↓

Service
↓

Validation
↓

Prisma ORM
↓

MySQL

## Installation

git clone ...

npm install

cp .env.example .env

npx prisma migrate dev

npm run dev

## Running Tests

npm test

57 integration tests using Jest and Supertest.

## Folder Structure

src/
application/
controller/
service/
validation/
router/
middleware/
model/
error/

prisma/

test/

## Future Improvements

- Swagger Documentation
- Docker
- GitHub Actions CI/CD