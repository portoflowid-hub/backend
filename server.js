import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectedDB } from "./config/db.js"; // sesuaikan path
import userRouter from "./router/userRoutes.js";
import adminRouter from "./router/adminRoutes.js";
import courseRouter from "./router/courseRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// CORS (pakai env untuk production)
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  credentials: true,
}));

// Middleware lain
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello from Portoflow Backend 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// Router
app.use(userRouter);
app.use(adminRouter);
app.use(courseRouter);

// Jalankan server setelah DB connect
const start = async () => {
  try {
    await connectedDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("DB connection failed", err);
    process.exit(1);
  }
};

start();
