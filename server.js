import express from "express";
import { config } from "dotenv";
import { connectDB } from "./lib/db.js";
import { router as memberRouter } from "./router/member.router.js";
import cookieParser from "cookie-parser";
config();

console.log(process.env.MONGO_URI);

const app = express();

// update
const PORT = 6000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/members", memberRouter);

app.get("/", (req, res) => {
  res.send("backend is rocking");
});

app.listen(PORT, () => {
  console.log("server is running on localhost:5000");
  connectDB();
});
