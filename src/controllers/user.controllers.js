import prisma from "../../prisma/client.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/CustomError.js";
import {
  validateRegisterData,
  validateLoginData,
} from "../validations/user.validations.js";
import ApiResponse from "../utils/ApiResponse.js";
import { generateToken } from "../utils/generateToken.js";
import { sendVerificationMail } from "../utils/sendMail.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    throw new CustomError("Missing required fields", 400);

  const { data, success, error } = validateRegisterData({
    name,
    email,
    password,
  });

  if (!success) {
    throw new CustomError(error.errors[0].message, 400);
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) throw new CustomError("Email already registered", 400);

  const passwordHash = await bcrypt.hash(data.password, 10);

  const emailVerificationToken = generateToken();
  const emailVerificationExpiry = new Date(Date.now() + 10 * 60 * 1000);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: passwordHash,
      emailVerificationToken,
      emailVerificationExpiry,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  await sendVerificationMail(email, emailVerificationToken);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user,
        "User registered successfully. Please verify your email"
      )
    );
});

export { registerUser };
