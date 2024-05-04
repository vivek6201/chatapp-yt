import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDB from "./db/connectToDB.js";
import path from "path";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
import { app, server } from "./socket/socket.js";


dotenv.config();
const PORT = process.env.PORT || 4002;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

// ---------------- code for deployment------------
if(process.env.NODE_ENV === "production"){
  const dirPath = path.resolve();

  app.use(express.static("./FrontEnd/dist"));
  app.get("*",(req,res) =>{
    res.sendFile(path.resolve(dirPath, "./Frontend/dist","index.html"));
  })
}

//server
server.listen(PORT, () => {
  connectToDB();
  console.log(`server listening on port ${PORT}`);
});
