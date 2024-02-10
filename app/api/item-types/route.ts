import { db } from "@/lib/db";
import { errorHandler } from "@/lib/error-handler";
import { successResponse } from "@/lib/responses";
import { itemTypeSchema } from "@/lib/zodSchemas";

export async function POST(req: Request) {
  try {
    console.log("in item-types");

    const data = await req.json();
    console.log(data);

    itemTypeSchema.parse(data);
    const newItemType = await db.itemType.create({
      data,
    });
    return successResponse("itemType", newItemType, "New item type added");
  } catch (error) {
    return errorHandler(error);
  }
}

export async function GET() {
  try {
    const itemTypes = await db.itemType.findMany();
    return successResponse("itemTypes", itemTypes);
  } catch (error) {
    return errorHandler(error);
  }
}
