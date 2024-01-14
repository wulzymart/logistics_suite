import { db } from "@/lib/db";
import { hashPassword } from "@/lib/utils";
import { successResponse } from "@/lib/responses";
import { errorHandler } from "@/lib/error-handler";
import * as z from "zod";

const reqObject = z.object({
  userName: z
    .string()
    .min(3, {
      message: "minimum of 3 characters (must start a letter)",
    })
    .regex(/^[a-zA-Z][a-zA-Z0-9]+$/, {
      message: "Can only contain alphanumeric characters starting with letters",
    })
    .trim()
    .refine((s) => !s.includes(" "), "Ensure No Spaces!"),
  email: z
    .string()
    .email({ message: "Please provide a valid Email or leave empty" }),

  password: z.string().min(6, { message: "atleast 6 characters" }),
  role: z.string(),
});
export async function POST(req: Request) {
  try {
    const user = await req.json();
    reqObject.parse(user);
    user.password = hashPassword(user.password);
    const createdUser = await db.user.create({ data: user });
    return successResponse("user", createdUser);
  } catch (error) {
    return errorHandler(error);
  }
}
