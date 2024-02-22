import { db } from "@/lib/db";
import { errorHandler } from "@/lib/error-handler";
import { successResponse } from "@/lib/responses";
import { additionalChargeSchema } from "@/lib/zodSchemas";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log(data);

    additionalChargeSchema.parse(data);
    const newAdditionalCharge = await db.additonalCharge.create({
      data,
    });
    return successResponse(
      "additonalCharge",
      newAdditionalCharge,
      "New additional charge added"
    );
  } catch (error) {
    return errorHandler(error);
  }
}

export async function GET() {
  try {
    const additionalCharges = await db.additonalCharge.findMany();
    return successResponse("additionalCharges", additionalCharges);
  } catch (error) {
    return errorHandler(error);
  }
}
