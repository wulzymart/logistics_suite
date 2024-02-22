import { db } from "@/lib/db";
import { errorHandler } from "@/lib/error-handler";
import { successResponse } from "@/lib/responses";
import { shipmentTypeSchema } from "@/lib/zodSchemas";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    shipmentTypeSchema.parse(data);
    const newShipmentType = await db.shipmentType.create({
      data,
    });
    return successResponse(
      "shipmentType",
      newShipmentType,
      "New shipment type added"
    );
  } catch (error) {
    return errorHandler(error);
  }
}

export async function GET() {
  try {
    const shipmentTypes = await db.shipmentType.findMany();
    return successResponse("shipmentTypes", shipmentTypes);
  } catch (error) {
    return errorHandler(error);
  }
}
