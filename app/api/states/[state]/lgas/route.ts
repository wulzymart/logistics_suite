import { db } from "@/lib/db";
import { errorHandler } from "@/lib/error-handler";
import {
  notFoundResponse,
  internalServerError,
  successResponse,
} from "@/lib/responses";

export async function GET(
  req: Request,
  { params: { state } }: { params: { state: string } }
) {
  try {
    const stateWithLgas = await db.state.findUnique({
      where: {
        name: state,
      },
      include: {
        lgas: true,
      },
    });
    if (stateWithLgas) {
      return successResponse("lgas", stateWithLgas.lgas);
    }
    return notFoundResponse("state");
  } catch (error) {
    return errorHandler(error);
  }
}
