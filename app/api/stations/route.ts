import { db } from "@/lib/db";
import { errorHandler } from "@/lib/error-handler";
import { successResponse } from "@/lib/responses";
import * as z from "zod";

const stationSchema = z.object({
  name: z.string().min(3, { message: "Name is a minimum of 3 characters" }),
  shortCode: z
    .string()
    .min(2, { message: "Station code can only be 2 or 3 characters" })
    .max(3, { message: "Station code can only be 2 or 3 characters" }),
  state: z.string().min(2, { message: "Please select a state" }),
  lgaId: z.string().min(2, { message: "Please select a LGA" }),
  lga: z.string().min(2, { message: "Please select a LGA" }),
  address: z.string().min(10, { message: "Provide a detailed street address" }),
  phoneNumbers: z
    .array(
      z.string().min(10, { message: "Please Provide valid phone numbers" })
    )
    .min(1, { message: "there must be atleast 1 phone number" }),
});
export async function POST(req: Request) {
  try {
    const data = await req.json();
    stationSchema.parse(data);
    const { name, shortCode, phoneNumbers, address, state, lgaId, lga } = data;
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
        LGA: {
          connect: {
            id: lgaId,
          },
        },
      },
    });
    console.log(station);
    return successResponse("station", station, "station added successfully");
  } catch (error) {
    return errorHandler(error);
  }
}
