import { db } from "@/lib/db";
import { errorHandler } from "@/lib/error-handler";
import { notFoundResponse, successResponse } from "@/lib/responses";
import { ngPhoneNumberSchema } from "@/lib/zodSchemas";

export async function GET(
  req: Request,
  {
    params: { phoneOrId },
  }: {
    params: { phoneOrId: string };
  }
) {
  try {
    if (ngPhoneNumberSchema.safeParse(phoneOrId).success) {
      const customer = await db.customer.findUnique({
        where: {
          phoneNumber: phoneOrId,
        },
      });
      if (!customer) return notFoundResponse("customer");
      return successResponse("customer", customer);
    }
    const customer = await db.customer.findUnique({
      where: {
        id: phoneOrId,
      },
    });
    if (!customer) return notFoundResponse("customer");
    return successResponse("customer", customer);
  } catch (error) {
    return errorHandler(error);
  }
}
