import { Prisma } from "@prisma/client";

const errorHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Something went wrong";

  // Prisma Error Handling
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    statusCode = 400;
    message = "Database request error";
  } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    statusCode = 500;
    message = "Unknown database error";
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = "Invalid request data";
  } else if (error instanceof Prisma.PrismaClientInitializationError) {
    statusCode = 500;
    message = "Database initialization failed";
  } else if (error instanceof Prisma.PrismaClientRustPanicError) {
    statusCode = 500;
    message = "Unexpected database error";
  }

  const response = {
    success: false,
    message,
  };

  console.error("error occured : ", error);
  return res.status(statusCode).json(response);
};

export default errorHandler;
