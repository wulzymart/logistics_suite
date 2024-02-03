import { db } from "@/lib/db";
import { errorHandler } from "@/lib/error-handler";
import { successResponse } from "@/lib/responses";
import {
  addressSchema,
  firstNameSchema,
  lastNameSchema,
  ngPhoneNumberSchema,
  stateSchema,
} from "@/lib/zodSchemas";
import * as z from "zod";

const dataSchema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  phoneNumber: ngPhoneNumberSchema,
  address: z.object({
    state: stateSchema,
    streetAddress: addressSchema,
  }),
  history: z.array(
    z.object({
      info: z.string().min(5, { message: "Please Provide an info" }),
    })
  ),
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    dataSchema.parse(data);
    const newCustomer = await db.customer.create({
      data,
    });
    return successResponse("customer", newCustomer, "New Customer added")
  } catch (error) {
    return errorHandler(error)
  }
}
