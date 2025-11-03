Perfect bro 🔥
Here’s your **complete and final `README.md`** — fully formatted, professional, and includes everything:
controllers, routes, model, utils, middleware, and setup — all in **one single block** so you can **copy it directly** into your project.

Just copy–paste this into your root folder as `README.md` 👇

---

```markdown
# 🛡️ Authentication System (Node.js + Express + MongoDB)

A secure and scalable authentication system built using **Node.js**, **Express**, and **MongoDB**.  
It implements **JWT-based authentication**, **email verification**, **token refresh**, and **user profile management** with proper **error handling** and **security best practices**.

---

## 📂 Project Structure

```

📦 auth-system
├── controllers/
│   └── authController.js
├── routes/
│   └── authRoutes.js
├── models/
│   └── User.js
├── utils/
│   ├── asyncHandler.js
│   ├── customError.js
│   └── generateToken.js
├── middlewares/
│   └── authMiddleware.js
├── services/
│   └── emailServices.js
├── config/
│   └── config.js
└── server.js

````

---

## ⚙️ Tech Stack

- **Node.js** — JavaScript runtime environment  
- **Express.js** — Web framework  
- **MongoDB + Mongoose** — Database and ORM  
- **JWT (jsonwebtoken)** — Authentication tokens  
- **bcryptjs** — Password hashing  
- **Nodemailer** — Sending verification emails  

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Niteshbakhla/auth_system.git
cd auth-system
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create Environment File

Create a `.env` file in the root directory and add your credentials:

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
NODE_ENV=development
```

### 4️⃣ Run the Server

```bash
npm run dev
```

Server will run on:
👉 **[http://localhost:5000](http://localhost:5000)**

---

## 🧠 API Documentation

### 🔹 1. Register User

**POST** `/api/auth/register`
Registers a new user and sends an email verification link.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "67a123b...",
    "name": "john doe",
    "email": "john@example.com"
  },
  "accessToken": "jwt_token_here"
}
```

---

### 🔹 2. Verify Email

**GET** `/api/auth/verify?token=<verification_token>`
Verifies a user’s email using a token sent in email.

**Response:**

```json
{
  "message": "Email verified successfully!"
}
```

---

### 🔹 3. Login User

**POST** `/api/auth/login`
Logs in an existing user after email verification.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "67a123b...",
    "name": "john doe",
    "email": "john@example.com"
  },
  "accessToken": "jwt_access_token"
}
```

A **refresh token** is also set in cookies for session management.

---

### 🔹 4. Logout User

**GET** `/api/auth/logout`
Logs out the user by clearing the refresh token cookie.
🔒 **Protected route** — Requires access token.

**Response:**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### 🔹 5. Refresh Access Token

**POST** `/api/auth/refresh`
Generates a new access token using the refresh token from cookies.

**Response:**

```json
{
  "success": true,
  "accessToken": "new_access_token"
}
```

---

### 🔹 6. Get User Profile

**GET** `/api/auth/profile`
Returns user details excluding password.
🔒 **Protected route**

**Response:**

```json
{
  "success": true,
  "user": {
    "id": "67a123b...",
    "name": "john doe",
    "email": "john@example.com",
    "isVerified": true
  }
}
```

---

## 🧩 User Model

| Field        | Type    | Description                                     |
| ------------ | ------- | ----------------------------------------------- |
| `name`       | String  | User’s full name (stored in lowercase).         |
| `email`      | String  | Unique email (trimmed, lowercased).             |
| `password`   | String  | Hashed password using bcrypt.                   |
| `isVerified` | Boolean | Email verification status (default: false).     |
| `roles`      | String  | Either `user` or `admin` (default: user).       |
| `timestamps` | Boolean | Automatically adds `createdAt` and `updatedAt`. |

---

## 🔐 Token System

| Token Type             | Purpose                      | Stored In  | Expiry      |
| ---------------------- | ---------------------------- | ---------- | ----------- |
| **Access Token**       | Authenticates user requests  | Header     | Short-lived |
| **Refresh Token**      | Issues new access tokens     | Cookie     | 7 days      |
| **Verification Token** | Verifies new users via email | Email Link | Short-lived |

---

## ⚙️ Middleware

### **verifyAccessToken**

Used to protect private routes.
It validates the **JWT access token** provided in the `Authorization` header.
If invalid or expired, it throws an error and denies access.

**Flow:**

1. Extract token from header
2. Verify with `jwt.verify()` using `JWT_SECRET`
3. Attach user info to `req.user`
4. Allow request to proceed

---

## 🛠️ Utilities

### **1️⃣ asyncHandler.js**

A higher-order function that wraps async route handlers to catch errors automatically.

```js
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
```

✅ Keeps controllers clean and avoids repetitive try/catch blocks.

---

### **2️⃣ customError.js**

Custom error class extending JavaScript’s `Error`, allowing consistent error handling.

```js
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
```

✅ Returns meaningful error messages with HTTP status codes.

---

### **3️⃣ generateToken.js**

Generates JWT tokens for:

* **Access Token**
* **Refresh Token**
* **Email Verification Token**

Each token uses different secrets and expiry times.

**Example:**

```js
export const generateAccessToken = (user) => jwt.sign(
  { id: user._id },
  config.JWT_SECRET,
  { expiresIn: "15m" }
);
```

---

## ✉️ Email Verification Flow

1. User registers → a verification token is generated.
2. Email with a verification link is sent using `sendVerificationEmail()`.
3. User clicks the link → backend verifies and sets `isVerified` to true.
4. User can now log in successfully.

---

## ⚠️ Error Handling

All controllers use:

* **`asyncHandler`** — Wraps async functions and catches errors.
* **`CustomError`** — For consistent and readable error responses.

**Example Error Response:**

```json
{
  "success": false,
  "message": "Email already registered"
}
```

---

## 🧭 Auth Flow Summary

```
[ Register ] → [ Email Verification ] → [ Login ] → [ Access Token ]  
      ↓                                             ↑
   [ Verification Link ]        [ Refresh Token to Renew Access ]
```

---

## 🚧 Future Improvements

* Add **Forgot Password / Reset Password** functionality
* Integrate **Google / GitHub OAuth** login
* Implement **Role-Based Access Control (RBAC)**
* Add **Rate Limiting** to prevent brute-force attacks

---

## 🧑‍💻 Author

**Developed by:** Nitesh Bakhla
**Stack:** MERN | JWT | Clean MVC Architecture
**Goal:** Secure, Scalable, and Maintainable Authentication System 🚀


