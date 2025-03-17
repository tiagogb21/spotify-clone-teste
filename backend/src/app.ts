import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "@/config/database";
import { usersRoutes } from "./http/routes/users";

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use('/users', usersRoutes);

export { app };
