"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { newUserRegistration } from "@/lib/actions";
import { APIResponseObject } from "@/types";
import ConfirmPin from "@/components/confirm-pin";
import {
  Lga,
  State,
  Station,
  Staff,
  TripStaff,
  OfficeStaff,
} from "@prisma/client";
import NewUserForm from "./user-form";
import StaffInfoForm from "./staff-form";
import {
  guarantorSchema,
  salaryInfoSchema,
  staffFormSchema,
  supportPeopleSchema,
  userFormSchema,
} from "@/lib/zodSchemas";
import NextOfKinForm from "./next-of-kin-form";
import GuarantorForm from "./guarantor-form";
import SalaryInfoForm from "./payment-info-form";

// type Staff = {
//   userId: string | null;
//   firstName: string;
//   lastName: string;
//   phoneNumbers: string[];
//   gender: $Enums.Gender;
//   imgUrl: string | null;
//   qualification: string | null;
//   employmentType: $Enums.EmploymentType;
//   tripStaffId: string | null;
//   dateOfBirth: Date | null;
// };

const roles = ["Trip_Staff", "Staff", "Admin", "Super_Admin", "Developer"];

const NewStaffForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const userForm = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
  });
  const staffForm = useForm<z.infer<typeof staffFormSchema>>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      gender: "",
      phoneNumbers: "",
      qualifications: "",
      dateOfBirth: new Date(),
      state: "",
      lga: "",
      address: "",
    },
  });
  const nokForm = useForm<z.infer<typeof supportPeopleSchema>>({
    resolver: zodResolver(supportPeopleSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      address: "",
    },
  });
  const guarantorsForm = useForm<z.infer<typeof guarantorSchema>>({
    resolver: zodResolver(guarantorSchema),
    defaultValues: {
      name1: "",
      name2: "",
      phoneNumber1: "",
      phoneNumber2: "",
    },
  });
  const salaryForm = useForm<z.infer<typeof salaryInfoSchema>>({
    resolver: zodResolver(salaryInfoSchema),
    defaultValues: {
      bankAccount: "",
      bankName: "",
      grossSalary: 0.0,
      tax: 0.0,
      pension: 0.0,
      otherDeductions: 0.0,
    },
  });
  const validatePin = () => {
    document.getElementById("user-reg")?.click();
  };
  // const onSubmit = async (values: z.infer<typeof formSchema>) => {
  //   startTransition(() => {
  //     newUserRegistration(values).then((data: APIResponseObject) => {
  //       if (data.success) {
  //         toast({
  //           description: "User created Please Continue with staff details",
  //         });
  //         router.push(`/office/super-admin/staff/${data.user.id}`);
  //       } else
  //         toast({
  //           variant: "destructive",
  //           description: data.message,
  //         });
  //     });
  //   });
  // };
  return (
    <div>
      <div className="grid col-1 md:grid-cols-2 gap-6 mt-20">
        <NewUserForm form={userForm} />
        <StaffInfoForm form={staffForm} />
      </div>
      <div className="grid col-1 md:grid-cols-2 gap-6 mt-20">
        <NextOfKinForm form={nokForm} />
        <GuarantorForm form={guarantorsForm} />
      </div>
      <div className="grid col-1 md:grid-cols-2 gap-6 mt-20">
        <SalaryInfoForm form={salaryForm} />
      </div>
      <ConfirmPin id="user-reg" name="Submit" action={() => ""} />
      <Button type="button" onClick={() => userForm.trigger()}>
        Submit
      </Button>
    </div>
  );
};

export default NewStaffForm;
