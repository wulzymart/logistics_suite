import { db } from "@/lib/db";
import { errorHandler } from "@/lib/error-handler";
import {
  invalidCredentialsResponse,
  successResponse,
  userNotFoundResponse,
  invalidIdResponse,
} from "@/lib/responses";
import { hashPassword, validatePassword } from "@/lib/utils";
import * as z from "zod";

const requestObject = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
});

export async function PATCH(
  req: Request,
  { params: { userId: id } }: { params: { userId: string } }
) {
  try {
    let data: z.infer<typeof requestObject> = await req.json();
    requestObject.parse(data);
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) return userNotFoundResponse();
    if (!validatePassword(data.oldPassword, user.password))
      return invalidCredentialsResponse();
    const updatedUser = await db.user.update({
      where: {
        id,
      },
      data: {
        password: hashPassword(data.newPassword),
      },
    });
    delete (updatedUser as any).pin;
    delete (updatedUser as any).password;
    return successResponse("user", updatedUser);
  } catch (error) {
    return errorHandler(error);
  }
}
