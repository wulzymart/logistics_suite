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
      const { modelName, target } = error.meta as {
        modelName: string;
        target: string;
      };
      const key = target.split("_")[1];
      const message: string = `${modelName} with same ${key} already exists`;
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
