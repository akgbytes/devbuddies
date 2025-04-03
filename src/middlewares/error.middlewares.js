import { Prisma } from "@prisma/client";

const errorHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Something went wrong";

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    statusCode = 400;
    message = `Database error: ${error.message}`;
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = "Invalid request data";
  } else if (error instanceof Prisma.PrismaClientInitializationError) {
    statusCode = 500;
    message = "Database initialization error";
  } else if (error instanceof Prisma.PrismaClientRustPanicError) {
    statusCode = 500;
    message = "Unexpected database error";
  }

  const response = {
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  };

  console.error(error.message);
  return res.status(statusCode).json(response);
};

export default errorHandler;
