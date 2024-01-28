import { db } from "@/lib/db";
import { errorHandler } from "@/lib/error-handler";
import {
  invalidCredentialsResponse,
  invalidIdResponse,
  successResponse,
} from "@/lib/responses";
import { hashPassword, validatePassword } from "@/lib/utils";
import { NextResponse } from "next/server";
import * as z from "zod";

const requestObject = z.object({
  password: z.string().min(6),
  oldPin: z.string().length(4),
  newPin: z.string().length(4),
});

interface IncomingData {
  password: string;
  oldPin: string;
  newPin: string;
}

export async function PATCH(
  req: Request,
  { params: { userId: id } }: { params: { userId: string } }
) {
  try {
    const data: IncomingData = await req.json();
    requestObject.safeParse(data);
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) return new NextResponse("User not found", { status: 404 });
    if (!user.pin) return new NextResponse("User pin not set", { status: 402 });
    if (
      !validatePassword(data.password, user.password) ||
      !validatePassword(data.oldPin, user.pin)
    )
      return invalidCredentialsResponse();
    const updatedUser = await db.user.update({
      where: {
        id,
      },
      data: {
        pin: hashPassword(data.newPin),
      },
    });
    delete (updatedUser as any).pin;
    delete (updatedUser as any).password;
    return successResponse("user", updatedUser, "User's Pin was changed");
  } catch (error) {
    return errorHandler(error);
  }
}
