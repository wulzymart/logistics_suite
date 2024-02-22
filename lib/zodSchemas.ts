import { DeliveryTypeOptions } from "@prisma/client";
import * as z from "zod";

export const ngPhoneNumbersSchema = z
  .string()
  .regex(/^(?:\+234)\d{10}(\s+(?:\+234)\d{10})*$/, {
    message: "please input valid phone numbers",
  });
export const ngPhoneNumberSchema = z.string().regex(/^(?:\+234)\d{10}$/, {
  message: "please input a valid phone number",
});
export const firstNameSchema = z
  .string()
  .min(2, { message: "First name is required" });
export const lastNameSchema = z
  .string()
  .min(2, { message: "Last name is required" });
export const middleNameSchema = z.string().nullable();
export const stateSchema = z
  .string()
  .min(2, { message: "Please select a state" });
export const lgaSchema = z.string().min(2, { message: "Please select LGA" });
export const addressSchema = z
  .string()
  .min(10, { message: "Provide a detailed address" });
export const stationSchema = z
  .string()
  .min(2, { message: "Please select a station" });

export const roleSchema = z
  .string()
  .min(2, { message: "Please select a role" });
export const coverageSchema = z
  .string()
  .min(2, { message: "Please select a coverage area" });
export const fullNameSchema = z
  .string()
  .min(5, { message: "Please provide name and surname" });
export const genderSchema = z
  .enum(["male", "female", ""])
  .refine((val) => val !== "", {
    message: "select a gender",
  });

export const userNameSchema = z
  .string()
  .min(3, {
    message: "minimum of 3 characters (must start a letter)",
  })
  .regex(/^[a-zA-Z][a-zA-Z0-9]+$/, {
    message: "Can only contain alphanumeric characters starting with letters",
  })
  .trim()
  .refine((s) => !s.includes(" "), "Ensure No Spaces!");
export const emailSchema = z
  .string()
  .email({ message: "Please provide a valid Email" });
export const passwordSchema = z
  .string()
  .min(6, { message: "at least 6 characters" });
export const userRoleSchema = z
  .string()
  .min(2, { message: "Please select a role" });

export const userFormSchema = z
  .object({
    userName: userNameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
    role: userRoleSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords dont match",
    path: ["confirmPassword"],
  });
export const staffFormSchema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  middleName: middleNameSchema,
  gender: genderSchema,
  phoneNumbers: ngPhoneNumbersSchema,
  state: stateSchema,
  address: addressSchema,
});
export const supportPeopleSchema = z.object({
  name: fullNameSchema,
  phoneNumber: ngPhoneNumberSchema,
  address: addressSchema,
});
export const guarantorSchema = z
  .object({
    name1: z.union([fullNameSchema, z.string().length(0)]),
    phoneNumber1: z.union([ngPhoneNumberSchema, z.string().length(0)]),
    name2: z.union([fullNameSchema, z.string().length(0)]),
    phoneNumber2: z.union([ngPhoneNumberSchema, z.string().length(0)]),
  })
  .refine((data) => (data.name1 ? data.name1 && data.phoneNumber1 : true), {
    message: "Please provide phone number",
    path: ["phoneNumber1"],
  })
  .refine(
    (data) => (data.phoneNumber1 ? data.phoneNumber1 && data.name1 : true),
    {
      message: "Please provide name",
      path: ["name1"],
    }
  )
  .refine((data) => (data.name2 ? data.name2 && data.phoneNumber2 : true), {
    message: "Please provide phone number",
    path: ["phoneNumber2"],
  })
  .refine(
    (data) => (data.phoneNumber2 ? data.phoneNumber2 && data.name2 : true),
    {
      message: "Please provide name",
      path: ["name2"],
    }
  )
  .refine((data) => (data.name2 ? data.name2 && data.phoneNumber2 : true), {
    message: "Please provide phone number",
    path: ["phoneNumber2"],
  })
  .refine((data) => (data.name2 ? data.name2 && data.name1 : true), {
    message: "Please provide gurantor1 details first",
    path: ["name1"],
  })
  .refine((data) => (data.name2 ? data.name2 !== data.name1 : true), {
    message: "Guarantors must be different",
    path: ["name2"],
  })
  .refine(
    (data) =>
      data.phoneNumber2 ? data.phoneNumber2 !== data.phoneNumber1 : true,
    {
      message: "Guarantors must be different",
      path: ["phoneNumber2"],
    }
  );

export const stationFormSchema = z.object({
  name: z.string().min(3, { message: "Name is a minimum of 3 characters" }),
  shortCode: z
    .string()
    .min(3, { message: "Station code can only be 3 or 6 characters" })
    .max(6, { message: "Station code can only be 3 or 6 characters" }),
  state: stateSchema,
  lga: lgaSchema,
  address: addressSchema,
  phoneNumbers: ngPhoneNumbersSchema,
});

export const salaryInfoSchema = z.object({
  bankName: z.string().min(3, { message: "Please input staff's bank name" }),
  bankAccount: z
    .string()
    .regex(/^\d{10}$/, { message: "account number can only be 10 digits" }),
  grossSalary: z.number(),
  tax: z.number(),
  pension: z.number(),
  otherDeductions: z.number(),
});

export const officeStaffSchema = z.object({
  state: stateSchema,
  station: stationSchema,
});

export const tripStaffSchema = z.object({
  role: roleSchema,
  coverage: coverageSchema,
  state: z.union([stateSchema, z.string().length(0)]),
  station: z.union([stationSchema, z.string().length(0)]),
});

export const newCustomerShema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  email: emailSchema,
  phoneNumber: ngPhoneNumberSchema,
  address: z.object({
    state: stateSchema,
    streetAddress: addressSchema,
  }),
});

export const orderSchema = z
  .object({
    deliveryArea: z
      .enum(["local", "intrastate", "interstate", ""])
      .refine((data) => data != "", {
        message: "Please select a delevery area",
      }),
    serviceType: z
      .enum(["Regular", "Express", ""])
      .refine((data) => data != "", {
        message: "Please select a service type",
      }),
    deliveryType: z
      .enum([
        "station_to_door",
        "station_to_station",
        "pickup_to_station",
        "pickup_to_door",
        "",
      ])
      .refine((data) => data != "", {
        message: "Please select a delivery type",
      }),
    originStation: stationSchema,
    destinationStation: z.union([stateSchema, z.string().min(0)]),
    receiver: z.object({
      firstName: firstNameSchema,
      lastName: lastNameSchema,
      phoneNumber: ngPhoneNumberSchema,
      address: z.object({
        state: stateSchema,
        address: addressSchema,
      }),
    }),
    item: z.object({
      category: z.string().min(2, { message: "Select a category" }),
      type: z.string(),
      condition: z.string().min(2, { message: "Select approprate condition" }),
      description: z
        .string()
        .min(10, { message: "Provide a detailed descriptions" }),
      quantity: z.number(),
      value: z.number(),
      weight: z.number(),
    }),
    charges: z.object({
      freightPrice: z.number(),
      additionalService: z
        .array(z.object({ name: z.string(), price: z.number() }))
        .min(0),
      totalAdditionalService: z.number(),
      VAT: z.number(),
      insurance: z.number(),
      subTotal: z.number(),
      Total: z.number(),
    }),
  })
  .refine(
    (data) => {
      data.deliveryArea !== "local" && data.destinationStation !== "";
    },
    { message: "Please provide a station" }
  );

export const itemTypeSchema = z.object({
  name: z.string().min(2, { message: "Please provide a name" }),
  priceFactor: z.number(),
});
export const remTypeSchema = z.object({
  name: z.string().min(2, { message: "Please provide a name" }),
});
export const shipmentTypeSchema = z.object({
  name: z.string().min(2, { message: "Please provide a name" }),
  price: z.number(),
  ppw: z.number(),
  minWeight: z.number(),
  maxWeight: z.number(),
});

export const additionalChargeSchema = z.object({
  name: z.string().min(2, { message: "Please provide a name" }),
});
