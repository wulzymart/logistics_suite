import { db } from "@/lib/db";
import { validatePassword } from "@/lib/utils";
import {
  failureResponse,
  invalidCredentialsResponse,
  successResponse,
} from "@/lib/responses";
import * as z from "zod";
import { errorHandler } from "@/lib/error-handler";
const emailPasswordSchema = z.object({
  usernameOrEmail: z.string().email(),
  password: z.string().min(6),
});
const userNamePasswordSchema = z.object({
  usernameOrEmail: z.string().min(3),
  password: z.string().min(6),
});
export async function POST(req: Request) {
  try {
    const loginData:
      | z.infer<typeof userNamePasswordSchema>
      | z.infer<typeof emailPasswordSchema> = await req.json();
    const dataType: "email" | "username" | undefined =
      emailPasswordSchema.safeParse(loginData).success
        ? "email"
        : userNamePasswordSchema.safeParse(loginData).success
        ? "username"
        : undefined;
    if (!dataType)
      return failureResponse("Please provide valid necessary credentials", 400);

    const user =
      dataType === "email"
        ? await db.user.findUnique({
            where: {
              email: loginData.usernameOrEmail,
            },
            include: {
              staffDetails: {
                include: {
                  officeStaffInfo: {
                    include: {
                      station: true,
                    },
                  },
                  tripStaffInfo: {
                    include: { station: true },
                  },
                },
              },
            },
          })
        : await db.user.findUnique({
            where: {
              userName: loginData.usernameOrEmail,
            },
            include: {
              staffDetails: {
                include: {
                  officeStaffInfo: {
                    include: {
                      station: true,
                    },
                  },
                  tripStaffInfo: {
                    include: { station: true },
                  },
                },
              },
            },
          });
    if (!user || !validatePassword(loginData.password, user.password))
      return invalidCredentialsResponse();
    delete (user as any).password;
    delete (user as any).pin;
    return successResponse("user", user);
  } catch (error) {
    return errorHandler(error);
  }
}
