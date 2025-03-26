# Nexdhara-Task-Round1-
it's me bibash chaudhary from Nepal...


# Nexdhara

Nexdhara is a full-stack MERN (MongoDB, Express, React, Node.js) application designed for managing products. It includes authentication, authorization, and an admin panel for product management.

## Features
- User authentication (login, register, logout)
- Admin access control
- Product management (CRUD operations)
- State management using Redux Toolkit
- Frontend built with React and TailwindCSS
- Secure API with JWT authentication

## Tech Stack
- **Frontend:** React, React Router, Redux Toolkit,  TailwindCSS, React Toastify
- **Backend:** Node.js, Express, MongoDB, Mongoose, JSON Web Token (JWT), bcrypt-js,
- **Middleware:** Authentication & Authorization

## Installation & Setup

### 1. Clone the Repository
```sh
git clone https://github.com/Bibash45/Nexdhara-Task-Round1-
```

### 2. Backend Setup
```sh
cd backend
npm install
```

Create a `.env` file in the backend folder and add:
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

Run the backend server:
```sh
npm start
```

### 3. Frontend Setup
```sh
cd frontend
npm install
```

Run the frontend:
```sh
npm run dev
```

## API Documentation
### **Authentication Routes**
#### **Register a User**
`POST /api/users`
```json
{
  "name": "example",
  "email": "example@example.com",
  "password": "123456"
}
```

#### **Login**
`POST /api/user/login`
```json
{
  "email": "example@example.com",
  "password": "123456"
}
```

#### **Logout**
`POST /api/user/logout`

---
### **Product Routes**
#### **Get All Products**
`GET /api/products`

#### **Get a Product by ID**
`GET /api/products/:id`

#### **Create a Product (Admin Only)**
`POST /api/products`
```json
{
  "name": "Laptop",
  "price": 1000,
  "description": "High-performance laptop",
  "stock" : 24
}
```

#### **Update a Product**
`PUT /api/products/:id`
```json
{
  "name": "Updated Laptop",
    "description": "High-performance laptop",
  "price": 1100,
  "stock": 25
}
```

#### **Delete a Product (Admin Only)**
`DELETE /api/products/:id`

## Frontend Routes
- `/` - Homepage
- `/add` - Add Product (Admin Only)
- `/edit/:id` - Edit Product (Admin Only)
- `/login` - Login Page
- `/register` - Register Page

## Contributing
Thankyou for following me Nexdhara




