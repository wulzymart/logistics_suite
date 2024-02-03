import { db } from "@/lib/db";
import { errorHandler } from "@/lib/error-handler";
import { successResponse } from "@/lib/responses";
import { ngPhoneNumberSchema } from "@/lib/zodSchemas";
import * as z from "zod";

const stationSchema = z.object({
  name: z.string().min(3, { message: "Name is a minimum of 3 characters" }),
  shortCode: z
    .string()
    .min(3, { message: "Station code can only be 3 or 6 characters" })
    .max(6, { message: "Station code can only be 3 or 6 characters" }),
  state: z.string().min(2, { message: "Please select a state" }),
  lga: z.string().min(2, { message: "Please select a LGA" }),
  address: z.string().min(10, { message: "Provide a detailed street address" }),
  phoneNumbers: z
    .array(ngPhoneNumberSchema)
    .min(1, { message: "there must be atleast 1 phone number" }),
});
export async function POST(req: Request) {
  try {
    const data = await req.json();
    stationSchema.parse(data);
    const { name, shortCode, phoneNumbers, address, state, lga } = data;
    const station = await db.station.create({
      data: {
        name,
        shortCode,
        phoneNumbers,
        address,
        lga,
        State: {
          connect: {
            name: state,
          },
        },
      },
    });
    return successResponse("station", station, "station added successfully");
  } catch (error) {
    return errorHandler(error);
  }
}

export async function GET() {
  try {
    const stations = await db.station.findMany();
    return successResponse("stations", stations);
  } catch (error) {
    return errorHandler(error);
  }
}
