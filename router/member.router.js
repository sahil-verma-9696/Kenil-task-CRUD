import { Router } from "express";
import {
  createMember,
  deleteMemberById,
  getAllMembers,
  getMemberById,
  updateMemberByName,
} from "../controller/member.controller.js";
import { protectedRoute } from "../middleware/member.middleware.js";

const router = Router();

router.get("/", getAllMembers);
router.get("/:id", getMemberById);

router.post("/create-member", protectedRoute, createMember);

router.patch("/update-name/:id", protectedRoute, updateMemberByName);

router.delete("/delete/:id", protectedRoute, deleteMemberById);

export { router };
