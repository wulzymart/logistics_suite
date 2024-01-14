import { APIResponseObject } from "@/types";
import { NextResponse } from "next/server";

export function successResponse<T>(
  key: string,
  data: T,
  message: string = "Success"
): NextResponse<APIResponseObject> {
  return NextResponse.json({ [key]: data, success: true, message });
}

export function failureResponse<T>(
  message: string,
  status: 400 | 401 | 402 | 404 | 500
): NextResponse<APIResponseObject> {
  return NextResponse.json({ message, success: false }, { status });
}

export function internalServerError() {
  return failureResponse("Internal server error", 500);
}
export function invalidCredentialsResponse() {
  return failureResponse("Please provide valid user credentials", 401);
}
export function invalidIdResponse() {
  return failureResponse("Invalid Id syntax", 400);
}
export function notFoundResponse(item: string) {
  return failureResponse(`${item} not found`, 404);
}

export function userNotFoundResponse() {
  return failureResponse(`user not found`, 404);
}
