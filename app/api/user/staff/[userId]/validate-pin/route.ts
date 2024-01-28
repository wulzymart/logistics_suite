import { db } from "@/lib/db";
import { errorHandler } from "@/lib/error-handler";
import {
  failureResponse,
  invalidCredentialsResponse,
  successResponse,
  userNotFoundResponse,
} from "@/lib/responses";
import { validatePassword } from "@/lib/utils";
import * as z from "zod";

const reqObjectSchema = z.object({
  pin: z
    .string()
    .length(4, { message: "Pin must be 4 digits" })
    .regex(/^\d+$/, { message: "Pin must only be digits" }),
});
export async function POST(
  req: Request,
  { params: { userId: id } }: { params: { userId: string } }
) {
  try {
    const data: z.infer<typeof reqObjectSchema> = await req.json();
    reqObjectSchema.parse(data);
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) return userNotFoundResponse();
    if (!user.pin) return failureResponse("User has no registered pin", 400);
    const isValid = validatePassword(data.pin, user.pin);
    return successResponse(
      "isValid",
      isValid,
      isValid ? "Pin validation success" : "Pin validation failure"
    );
  } catch (error) {
    return errorHandler(error);
  }
}
