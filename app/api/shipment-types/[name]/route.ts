import { db } from "@/lib/db";
import { errorHandler } from "@/lib/error-handler";
import { notFoundResponse, successResponse } from "@/lib/responses";

export async function DELETE(
  req: Request,
  {
    params: { name },
  }: {
    params: { name: string };
  }
) {
  try {
    const shipmentType = await db.shipmentType.delete({
      where: {
        name,
      },
    });

    if (!shipmentType) return notFoundResponse("item type");
    return successResponse("deleted", true);
  } catch (error) {
    return errorHandler(error);
  }
}
