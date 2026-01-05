import express from 'express';

// Create app FIRST
const app = express();

// 🔎 Logger middleware (must be AFTER app is created)
app.use((req, res, next) => {
  console.log("METHOD:", req.method, "URL:", JSON.stringify(req.url));
  next();
});

// Parse JSON
app.use(express.json());

// Import routes
import userRouter from './routes/user.routes.js';

// Mount routes
app.use("/api/v1/users", userRouter);

// example route: http://localhost:5000/api/v1/users/register

export default app;
