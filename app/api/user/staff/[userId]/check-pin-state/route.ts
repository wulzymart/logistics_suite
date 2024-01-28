import { db } from "@/lib/db";
import { errorHandler } from "@/lib/error-handler";
import { successResponse, userNotFoundResponse } from "@/lib/responses";

export async function GET(
  req: Request,
  { params: { userId: id } }: { params: { userId: string } }
) {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) return userNotFoundResponse();
    if (user.pin) return successResponse("hasPin", true);
    return successResponse("hasPin", false);
  } catch (error) {
    return errorHandler(error);
  }
}
