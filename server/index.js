import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import fileRouter from "./routes/file.route.js";
import { Server } from "socket.io";
import { createServer } from "node:http";

dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 8000;
const database_url = `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(database_url)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/user", userRouter);
app.use("/file", fileRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

// const app = express();
// const server = createServer(app);
// const io = new Server(server);

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("join", ({ fileId, currentUserId }) => {
    console.log("user join with" + currentUserId + " file id");
    socket.join(fileId);
    socket.emit("currentUserId", currentUserId);
  });

  socket.on("updateDocument", ({ debouncedTextContent, fileId }) => {
    socket.broadcast.to(fileId).emit("documentContent", debouncedTextContent);
  });
});
