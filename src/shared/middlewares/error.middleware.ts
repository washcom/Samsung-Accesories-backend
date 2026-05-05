import { ErrorRequestHandler } from "express";
import { MongoServerError } from "mongodb";
import { sendError } from "../utils/apiResponse";

export const notFoundHandler: ErrorRequestHandler = (err, _req, res, next) => {
  next(err);
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof MongoServerError && err.code === 11000) {
    return sendError(res, "Duplicate resource", 409, err.keyValue);
  }

  const statusCode = err.statusCode ?? 500;
  const message = err.message ?? "Internal server error";

  return sendError(res, message, statusCode);
};
