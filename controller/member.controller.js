import { Member } from "../models/member.model.js";

import jwt from "jsonwebtoken";

// create
export async function createMember(req, res) {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      console.log("credential not found");
      return res
        .status(401)
        .json({ type: "error", message: "Credential not found" });
    }

    const memberExist = await Member.findOne({ email });

    if (memberExist) {
      return res
        .status(400)
        .json({ type: "error", message: "Member already exist" });
    }

    const member = await Member.create({ name, email });

    const memberToken = jwt.sign(
      { memberId: member._id },
      process.env.JWT_SECRET
    );

    res.cookie("memberToken", memberToken);

    res.status(200).json({
      type: "success",
      message: "Member created successfully",
      member,
    });
  } catch (error) {
    console.log("Error createMember controller", error.message);
    res.status(500).json({ type: "error", message: error.message });
  }
}

// read
export async function getAllMembers(req, res) {
  try {
    const members = await Member.find();
    res.status(200).json({ type: "success", message: "all members", members });
  } catch (error) {
    console.log("Error getAllmember controller", error.message);
    res.status(500).json({ type: "error", message: error.message });
  }
}

export async function getMemberById(req, res) {
  try {
    const { id } = req.params;
    const member = await Member.findById(id);
    res.status(200).json({ type: "success", member });
  } catch (error) {
    console.log("Error getMemberById controller", error.message);
    res.status(500).json({ type: "error", message: error.message });
  }
}

// update
export async function updateMemberByName(req, res) {
  try {
    const { id } = req.params;

    const { updatedName } = req.body;

    const result = await Member.updateOne(
      { _id: id }, // Filter
      { $set: { name: updatedName } } // Update
    );

    if (!result) {
      res.status(400).json({ type: "error", message: "invalid id" });
      return;
    }

    res.status(200).json({
      type: "success",
      message: "member updated successfully",
      result,
    });
  } catch (error) {
    console.log("Error updateMemberName controller", error.message);
    res.status(500).json({ type: "error", message: error.message });
  }
}

// delete

export async function deleteMemberById(req, res) {
  try {
    const { id } = req.params;
    const result = await Member.deleteOne({ _id: id });
    if (!result) {
      res.status(400).json({ type: "error", message: "invalid id" });
      return;
    }
    res.status(200).json({
      type: "success",
      message: "member updated successfully",
      result,
    });
  } catch (error) {
    console.log("Error updateMemberName controller", error.message);
    res.status(500).json({ type: "error", message: error.message });
  }
}
