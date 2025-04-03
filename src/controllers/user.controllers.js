import prisma from "../../prisma/client.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/CustomError.js";
import {
  validateRegisterData,
  validateLoginData,
} from "../validations/user.validations.js";
import ApiResponse from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !password || !name)
    throw new CustomError("Missing required fields", 400);
});

export { registerUser };
