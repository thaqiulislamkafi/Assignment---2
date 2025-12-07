# 🚗 Vehicle Booking API (Neon + Express + TypeScript)

**Live URL:** [https://assignment-2-omega-ten.vercel.app/](https://assignment-2-omega-ten.vercel.app/)

A secure and scalable **Vehicle Booking REST API** built using **TypeScript, Express, and Neon PostgreSQL**, featuring **JWT Bearer Authentication**, **Role-Based Authorization**, and **Smart Booking Management** without using any ORM.

---

## ✨ Key Features

### ✅ Authentication & Security

* JWT Bearer Token Authentication
* Secure password hashing using **bcrypt**
* Role-based access control (`admin`, `customer`)
* Protected routes for sensitive operations

### ✅ User Management

* Create, update, delete users
* Unique email enforcement
* Role-based permissions

### ✅ Vehicle Management

* Add, update, delete vehicles
* Vehicle availability control (`available`, `booked`)
* Unique registration number validation

### ✅ Smart Booking System

* Prevents double booking
* Auto-calculates total rent based on date range
* Automatically updates vehicle status
* Booking status lifecycle (`active`, `cancelled`, `returned`)
* Secure booking using logged-in user from JWT

### ✅ Database Integrity

* Foreign key relationships
* Strong validation using PostgreSQL constraints
* Transaction-based booking creation

---

## 🧰 Technology Stack

| Category           | Technology           |
| ------------------ | -------------------- |
| Backend            | Node.js, Express.js  |
| Language           | TypeScript           |
| Database           | Neon PostgreSQL      |
| Authentication     | JSON Web Token (JWT) |
| Security           | bcrypt               |
| Database Driver    | pg                   |
| Environment Config | dotenv               |
| API Testing        | Postman              |

---


## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/thaqiulislamkafi/Assignment---2.git
cd your-repo-name
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Setup

Create a `.env` file in the root directory:

```env
PORT=5000
DATABASE_URL=your_neon_database_connection_url
JWT_SECRET=your_strong_secret_key
```

---

## 🗄️ Database Setup (PostgreSQL – Neon)

Run the following SQL inside the Neon SQL Editor:

```sql
-- USERS
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL CHECK (email = LOWER(email)),
  password TEXT NOT NULL CHECK (LENGTH(password) >= 6),
  phone VARCHAR(20) NOT NULL,
  role VARCHAR(10) NOT NULL CHECK (role IN ('admin', 'customer'))
);

-- VEHICLES
CREATE TABLE vehicles (
  id SERIAL PRIMARY KEY,
  vehicle_name VARCHAR(100) NOT NULL,
  type VARCHAR(10) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
  registration_number VARCHAR(50) UNIQUE NOT NULL,
  daily_rent_price NUMERIC(10,2) NOT NULL CHECK (daily_rent_price > 0),
  availability_status VARCHAR(15) NOT NULL CHECK (availability_status IN ('available', 'booked'))
);

-- BOOKINGS
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES users(id) ON DELETE CASCADE,
  vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
  rent_start_date DATE NOT NULL,
  rent_end_date DATE NOT NULL,
  total_price NUMERIC(10,2) NOT NULL CHECK (total_price > 0),
  status VARCHAR(15) NOT NULL CHECK (status IN ('active', 'cancelled', 'returned')),
  CHECK (rent_end_date > rent_start_date)
);
```

---

## ▶️ Running the Project

### Development Mode

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

Server will run on:

```
http://localhost:5000
```

---

## 🔐 Authentication Flow (Bearer Token)

1. **Login**

```
POST /api/auth/login
```

2. Receive Token:

```
Authorization: Bearer <your_token>
```

3. Use Token in Protected Routes:

```
POST /api/v1/vehicles
POST /api/v1/bookings
```

---

## 📮 API Endpoints Overview

### Auth

* `POST /api/v1/auth/login `
* `POST /api/v1/auth/signup `

### Users

* `POST /api/users`
* `GET /api/v1/users`
* `GET /api/v1/users/:userId`
* `PUT /api/v1/users/:userId`
* `DELETE /api/v1/users/:userId`

### Vehicles

* `POST /api/v1/vehicles` *(Admin)*
* `GET /api/v1/vehicles`
* `PUT /api/v1/vehicles/:vehicleId`
* `DELETE /api/v1/vehicles/:vehicleId`

### Bookings

* `POST /api/v1/bookings` *(Customer only)*
* `GET /api/v1/bookings`
* `PUT /api/v1/bookings/bookingId`

---

## 🧪 API Testing

You can test all endpoints using:

* ✅ **Postman**

---


## 👨‍💻 Author

**Developed by:** *Thaqi Ul Islam Kafi*

---


