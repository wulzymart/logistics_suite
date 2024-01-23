import * as z from "zod";

export const ngPhoneNumbersSchema = z
  .string()
  .regex(/^(?:\+234|0)\d{10}(\s+(?:\+234|0)\d{10})*$/, {
    message: "please input valid phone numbers",
  });
export const ngPhoneNumberSchema = z.string().regex(/^(?:\+234|0)\d{10}$/, {
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

export const fullNameSchema = z
  .string()
  .min(5, { message: "Please provide name and surname" });
export const genderSchema = z
  .enum(["male", "female", ""])
  .refine((val) => val !== "", {
    message: "select a gender",
    path: ["gender"],
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
  qualifications: z.string().min(0).nullable(),
  dateOfBirth: z.date().nullable(),
  state: stateSchema,
  lga: lgaSchema,
  address: addressSchema,
});
export const supportPeopleSchema = z.object({
  name: fullNameSchema,
  phoneNumber: ngPhoneNumberSchema,
  address: addressSchema,
});
export const guarantorSchema = z.object({
  name1: z.union([z.string().length(0), fullNameSchema]),
  phoneNumber1: z.union([z.string().length(0), ngPhoneNumberSchema]),
  name2: z.union([z.string().length(0), fullNameSchema]),
  phoneNumber2: z.union([z.string().length(0), ngPhoneNumberSchema]),
});

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
    .regex(/^d{}10$/, { message: "account number can only be 10 digits" }),
  grossSalary: z.number(),
  tax: z.number(),
  pension: z.number(),
  otherDeductions: z.number(),
});
