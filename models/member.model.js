import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  name: {
    type: String,
    require: [true, "member name is required"],
  },
  email: {
    type: String,
    require: [true, "email is required"],
  },
  role: {
    type: String,
    enum: ["member", "admin"],
    default: "member",
  },
});

const Member = mongoose.model("Member", MemberSchema);

export { Member };
