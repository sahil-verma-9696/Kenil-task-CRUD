import jwt from "jsonwebtoken";
import { Member } from "../models/member.model.js";
export async function protectedRoute(req, res, next) {
  try {
    const memberToken = req.cookies.memberToken;

    if (!memberToken) {
      res.status(404).json({ type: "error", message: "Token not found" });
      return;
    }

    const decoded = jwt.verify(memberToken, process.env.JWT_SECRET);
    const member = await Member.findById(decoded.memberId);
    if (member.role !== "admin") {
      res
        .status(402)
        .json({ type: "error", message: "Only admin allow to create member" });
      return;
    }

    next();
  } catch (error) {
    console.log("Error protectedRoute Middleware", error.message);
    res.status(402).json({ type: "error", message: error.message });
  }
}
