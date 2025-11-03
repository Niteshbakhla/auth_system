
```markdown
# 🛡️ Authentication System (Node.js + Express + MongoDB)

A secure and scalable authentication system built using **Node.js**, **Express**, and **MongoDB**.  
It implements **JWT-based authentication**, **email verification**, **token refresh**, and **user profile management** with proper **error handling** and **security best practices**.

---

## 🧩 Overview
This backend project provides a full authentication flow designed for modern web apps.  
It includes registration, login, logout, verification, and token management while following clean **MVC architecture** and reusable **utility-based design**.

---

## ✨ Features
- 🔐 JWT-based Authentication (Access + Refresh Tokens)
- 📧 Email Verification System using **Resend API**
- 🔄 Token Refresh and Expiry Handling
- 👤 Secure User Profile Fetching
- ⚙️ Custom Error & Async Middleware
- 🧱 Scalable MVC Structure

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
- **Resend API** — Email sending service for verification links  
- **Nodemailer (optional)** — For local or fallback email sending  

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/auth-system.git
cd auth-system
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 🧪 Test Credentials (For Demo)
Use the following credentials to test login and protected routes:
```bash
**Email:** `nitesh@gmail.com`  
**Password:** `123456`
```

### 3️⃣ Create Environment File

Create a `.env` file in the root directory and add your credentials:

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
NODE_ENV=development
RESEND_API_KEY=your_resend_api_key
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
Registers a new user and sends an email verification link via **Resend API**.

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
Verifies a user’s email using the token sent in email.

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

## ✉️ Email Verification (Using Resend API)

The system uses the **Resend API** to send verification emails.

**Flow:**

1. When a new user registers, a verification token is generated.
2. The backend calls the Resend API via `sendVerificationEmail()` in **test mode**.
3. A verification link is sent to the user’s **authorized test email** (or your verified domain).
4. The user clicks the link, and their email is verified (`isVerified: true`).

⚠️ **Important Notes about Resend:**

* The **free (test) mode** only allows sending emails to your **own verified domain or email address**.
* You **cannot send to random recipients** until you add a verified domain or upgrade your Resend plan.
* Ideal for testing verification flow in development mode.

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
[ Register ] → [ Email Verification (Resend API) ] → [ Login ] → [ Access Token ]  
      ↓                                             ↑
   [ Verification Link ]        [ Refresh Token to Renew Access ]
```

---

## 🚧 Future Improvements

* Add **Forgot Password / Reset Password** functionality
* Integrate **Google / GitHub OAuth** login
* Implement **Role-Based Access Control (RBAC)**
* Add **Rate Limiting** to prevent brute-force attacks


## 🧑‍💻 Author

**Developed by:** Nitesh Bakhla
**Stack:** MERN | JWT | Clean MVC Architecture | Resend API Integration
**Goal:** Secure, Scalable, and Maintainable Authentication System 🚀


