"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { startTransition, useCallback, useState } from "react";
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
  officeStaffSchema,
  salaryInfoSchema,
  staffFormSchema,
  supportPeopleSchema,
  tripStaffSchema,
  userFormSchema,
} from "@/lib/zodSchemas";
import NextOfKinForm from "./next-of-kin-form";
import GuarantorForm from "./guarantor-form";
import TripStaffForm from "./trip-staff-form";
import OfficeStaffForm from "./office-staff-form";

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
  const [isValid, setIsValid] = useState(false);
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
    mode: "onTouched",
  });
  const staffForm = useForm<z.infer<typeof staffFormSchema>>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      gender: "",
      phoneNumbers: "",
      state: "",
      address: "",
    },
    mode: "onTouched",
  });
  const nokForm = useForm<z.infer<typeof supportPeopleSchema>>({
    resolver: zodResolver(supportPeopleSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      address: "",
    },
    mode: "onTouched",
  });
  const guarantorsForm = useForm<z.infer<typeof supportPeopleSchema>>({
    resolver: zodResolver(supportPeopleSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      address: "",
    },
    mode: "onTouched",
  });

  const officeStatffForm = useForm<z.infer<typeof officeStaffSchema>>({
    resolver: zodResolver(officeStaffSchema),
    defaultValues: {
      state: "",
      station: "",
    },
    mode: "onTouched",
  });
  const tripStatffForm = useForm<z.infer<typeof tripStaffSchema>>({
    resolver: zodResolver(officeStaffSchema),
    defaultValues: {
      role: "",
      coverage: "",
      state: "",
      station: "",
    },
    mode: "onTouched",
  });
  const validatePin = () => {
    document.getElementById("user-reg")?.click();
  };
  const doNothing = () => {};

  const userRole = userForm.watch("role");

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
      <div className="grid col-1 mt-20">
        {userRole === "Trip_Staff" ? (
          <TripStaffForm form={tripStatffForm} />
        ) : (
          <OfficeStaffForm form={officeStatffForm} />
        )}
      </div>
      <ConfirmPin id="user-reg" name="Submit" action={() => ""} />
      <Button
        type="button"
        onClick={async () => {
          const staffTypeForm =
            userRole === "Trip_Staff" ? tripStatffForm : officeStatffForm;

          let userValid = false;
          const setUserValid = () => {
            console.log("called");

            userValid = true;
          };
          let staffValid = false;
          const setStaffValid = () => {
            staffValid = true;
          };
          let nokValid = false;
          const setNokValid = () => {
            nokValid = true;
          };
          let guaValid = false;
          const setGuaValid = () => {
            guaValid = true;
          };
          let sttyValid = false;
          const setSttyValid = () => {
            sttyValid = true;
          };

          await userForm.handleSubmit(setUserValid)();
          await staffForm.handleSubmit(setStaffValid)();
          await nokForm.handleSubmit(setNokValid)();
          await guarantorsForm.handleSubmit(setGuaValid)();
          await staffTypeForm.handleSubmit(setSttyValid)();
          if (userValid && staffValid && nokValid && guaValid && sttyValid) {
            const userInfo = userForm.getValues();
            let staffInfo = staffForm.getValues();
            (staffInfo.phoneNumbers as any) = staffInfo.phoneNumbers.split(" ");
            const nokInfo = nokForm.getValues();
            const guarantorInfo = guarantorsForm.getValues();
            const staffTypeInfo = staffTypeForm.getValues();

            const values = {
              user: userInfo,
              staff: {
                ...staffInfo,
                nextofKin: nokInfo,
                guarantors: guarantorInfo,
              },
              officeStaffInfo: userRole === "Trip_Staff" ? null : staffTypeInfo,
              tripStaffInfo: userRole === "Trip_Staff" ? staffTypeInfo : null,
            };
            console.log(values);
          } else
            console.log(userValid, staffValid, nokValid, guaValid, sttyValid);
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default NewStaffForm;
