import { db } from "@/lib/db";
import { hashPassword } from "@/lib/utils";
import { successResponse } from "@/lib/responses";
import { errorHandler } from "@/lib/error-handler";
import * as z from "zod";
import {
  addressSchema,
  ngPhoneNumberSchema,
  officeStaffSchema,
  staffFormSchema,
  stateSchema,
  supportPeopleSchema,
  tripStaffSchema,
} from "@/lib/zodSchemas";
import { Coverage, Prisma, Roles, TripStaffRoles } from "@prisma/client";
const roleEnum = Object.keys(Roles);

const staffSchema = z.object({
  user: z.object({
    userName: z
      .string()
      .min(3, {
        message: "minimum of 3 characters (must start a letter)",
      })
      .regex(/^[a-zA-Z][a-zA-Z0-9]+$/, {
        message:
          "Can only contain alphanumeric characters starting with letters",
      })
      .trim()
      .refine((s) => !s.includes(" "), "Ensure No Spaces!"),
    email: z
      .string()
      .email({ message: "Please provide a valid Email or leave empty" }),

    password: z.string().min(6, { message: "atleast 6 characters" }),
    role: z.enum([
      "Customer",
      "Trip_Staff",
      "Staff",
      "Admin",
      "Super_Admin",
      "Developer",
    ]),
  }),
  staff: z.object({
    firstName: z
      .string()
      .min(2, { message: "Please provide a valid first name" }),
    lastName: z
      .string()
      .min(2, { message: "Please provide a valid last name" }),
    middleName: z.string().min(0, { message: "Middle name must be a string" }),
    gender: z.enum(["male", "female"]),
    phoneNumbers: z
      .array(ngPhoneNumberSchema)
      .min(1, { message: "there must be atleast 1 phone number" }),
    state: stateSchema,
    address: addressSchema,
    nextofKin: supportPeopleSchema,
    guarantor: supportPeopleSchema,
  }),
  officeStaffInfo: z.union([z.null(), officeStaffSchema]),
  tripStaffInfo: z.union([z.null(), tripStaffSchema]),
});
export async function POST(req: Request) {
  try {
    const data: z.infer<typeof staffSchema> = await req.json();
    staffSchema.parse(data);
    console.log(data);

    data.user.password = hashPassword(data.user.password);
    const { user, staff, tripStaffInfo, officeStaffInfo } = data;
    const createdStaff = await db.user.create({
      data: {
        ...user,
        staffDetails: {
          create: tripStaffInfo
            ? {
                firstName: staff.firstName,
                lastName: staff.lastName,
                middleName: staff.middleName || null,
                gender: staff.gender,
                phoneNumbers: staff.phoneNumbers,
                address: {
                  state: staff.state,
                  streetAddress: staff.address,
                },
                guarantor: staff.guarantor,
                nextOfKin: staff.nextofKin,
                tripStaffInfo: {
                  create:
                    (tripStaffInfo.coverage as Coverage) === "Local"
                      ? {
                          role: tripStaffInfo.role as TripStaffRoles,
                          coverage: tripStaffInfo.coverage as Coverage,
                          station: {
                            connect: {
                              name: tripStaffInfo.station,
                            },
                          },
                        }
                      : {
                          role: tripStaffInfo.role as TripStaffRoles,
                          coverage: tripStaffInfo.coverage as Coverage,
                        },
                },
              }
            : {
                firstName: staff.firstName,
                lastName: staff.lastName,
                middleName: staff.middleName || null,
                gender: staff.gender,
                phoneNumbers: staff.phoneNumbers,
                address: {
                  state: staff.state,
                  streetAddress: staff.address,
                },
                guarantor: staff.guarantor,
                nextOfKin: staff.nextofKin,
                officeStaffInfo: {
                  create: {
                    station: {
                      connect: {
                        name: officeStaffInfo?.station,
                      },
                    },
                  },
                },
              },
        },
      },
    });

    return successResponse("staff", createdStaff);
  } catch (error) {
    return errorHandler(error);
  }
}
