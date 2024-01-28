import { db } from "@/lib/db";
import { errorHandler } from "@/lib/error-handler";
import { successResponse } from "@/lib/responses";

export async function GET(
  req: Request,
  { params: { state } }: { params: { state: string } }
) {
  try {
    const stations = await db.station.findMany({ where: { state } });
    return successResponse("stations", stations);
  } catch (error) {
    return errorHandler(error);
  }
}
