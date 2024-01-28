import { db } from "@/lib/db";
import { hashPassword, validatePassword } from "@/lib/utils";
import {
  invalidCredentialsResponse,
  invalidIdResponse,
  successResponse,
  userNotFoundResponse,
} from "@/lib/responses";
import { NextResponse } from "next/server";
import * as z from "zod";
import { errorHandler } from "@/lib/error-handler";
const requestObject = z.object({
  password: z.string().min(6, "Password must be minimum of 6 characters"),
  pin: z.string().length(4, { message: "Pin must be 4 digits" }),
});

export async function PATCH(
  req: Request,
  { params: {userId: id} }: { params: { userId: string } }
) {
  try {
    const data: z.infer<typeof requestObject> = await req.json();
    requestObject.parse(data);
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) return userNotFoundResponse();
    if (!validatePassword(data.password, user.password))
      return invalidCredentialsResponse();
    const updatedUser = await db.user.update({
      where: {
        id,
      },
      data: {
        pin: hashPassword(data.pin),
      },
    });
    delete (updatedUser as any).pin;
    delete (updatedUser as any).password;
    return successResponse(
      "user",
      updatedUser,
      "User's pin added successfully"
    );
  } catch (error) {
    return errorHandler(error);
  }
}
