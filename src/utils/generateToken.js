import crypto from "crypto";

const generateToken = () => crypto.randomBytes(32).toString("hex");

export { generateToken };
