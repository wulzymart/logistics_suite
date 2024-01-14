import { db } from "@/lib/db";
import { errorHandler } from "@/lib/error-handler";
import { successResponse } from "@/lib/responses";

export async function GET() {
  try {
    const states = await db.state.findMany();
    return successResponse("states", states);
  } catch (error) {
    return errorHandler(error);
  }
}
