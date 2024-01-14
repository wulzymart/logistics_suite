import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
} from "@prisma/client/runtime/library";
import {
  failureResponse,
  internalServerError,
  invalidIdResponse,
} from "./responses";
import { ZodError } from "zod";

export function errorHandler(error: any) {
  console.log("errorhandler", error);

  if (error instanceof PrismaClientInitializationError)
    return internalServerError();
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P2010") return internalServerError();
    if (error.code === "P2023") return invalidIdResponse();
    if (error.code === "P2002") {
      const errorKey = error.meta?.target as string;
      const message: string = errorKey
        ? errorKey.includes("userName")
          ? "User with the username already exists"
          : "User with the email already exists"
        : "User Credentials already exist";
      return failureResponse(message, 400);
    }
    return internalServerError();
  }
  if (error instanceof ZodError)
    return failureResponse(error.errors[0].message, 400);
  if (error instanceof SyntaxError) {
    if (error.message.includes("JSON"))
      return failureResponse("Please provide valid necessary credentials", 400);
  }
}
