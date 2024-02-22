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
    const itemType = await db.additonalCharge.delete({
      where: {
        name,
      },
    });

    if (!itemType) return notFoundResponse("additional charge");
    return successResponse("deleted", true);
  } catch (error) {
    return errorHandler(error);
  }
}
