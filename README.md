# 🧠 Task Manager API

![Tests](https://img.shields.io/badge/tests-passing-brightgreen)
![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-18.x-brightgreen)
![MongoDB](https://img.shields.io/badge/mongodb-%20green)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue)

A simple and complete task management REST API built with **Node.js**, **Express**, and **MongoDB**. This project includes **user authentication (JWT)**, **CRUD operations for tasks**, **Swagger documentation**, and **automated tests** with **Jest** and **Supertest**.

---

## 📌 Features

- ✅ Register and login with hashed passwords (bcrypt) and JWT tokens  
- ✅ Create, read, update and delete personal tasks  
- ✅ Tasks linked to authenticated users  
- ✅ Protected routes (middleware with token check)  
- ✅ MongoDB + Mongoose for data modeling  
- ✅ Swagger/OpenAPI documentation  
- ✅ Fully tested (auth + tasks)  
- ✅ Clean, modular codebase  
- ✅ Ready for deployment  

---

## 📂 Project Structure

```
.
├── controllers/
├── middleware/
├── models/
├── routes/
├── tests/
├── swagger.yaml
├── app.js
└── server.js
```

---

## 🧪 Tests

Run all tests:

```bash
npm test
```

Test coverage includes:

- ✅ Register  
- ✅ Login  
- ✅ Task creation, fetching, updating, deleting  
- ✅ Error cases (unauthorized, invalid data, etc.)  

---

## 🔐 Authentication

Authentication is handled via **JWT tokens**. After registering or logging in, include your token in the `x-auth-token` header of protected routes:

```http
x-auth-token: Bearer <your_token>
```

---

## 📄 API Documentation (Swagger)

Available at:  
**`/api-docs`**

Includes:

- Auth routes (`/register`, `/login`)  
- Task routes (`/tasks`, `/tasks/:id`)  

---

## 🛠️ Tech Stack

- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT for auth  
- bcryptjs  
- dotenv  
- Swagger (swagger-jsdoc + swagger-ui-express)  
- Jest + Supertest  

---

## 🚀 Getting Started

```bash
git clone https://github.com/Gusta11M/task-api.git
cd task-api
npm install
cp .env.example .env
# configure your environment variables (Mongo URI, JWT secret, PORT)

npm run dev  # start with nodemon
```

---

## 📌 .env Example

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-api
JWT_SECRET=your_jwt_secret_here
```

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙋‍♂️ Author

Gustavo Marques  
[GitHub](https://github.com/Gusta11M)

