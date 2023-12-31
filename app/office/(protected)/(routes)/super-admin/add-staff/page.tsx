import { Separator } from "@/components/ui/separator";
import NewUserForm from "./_components/new-user-form";
import Image from "next/image";
import { statesArray } from "@/lib/states-lgas-stations";
import { db } from "@/lib/db";

const NewStaffPage = async () => {
  return (
    <div>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">
          Staff Registration
        </h2>
        <p className="text-muted-foreground">
          Please provide the following details for your staff
        </p>
      </div>
      <Separator className="my-6" />
      <div className="grid col-1 md: grid-cols-2 gap-6 mt-20">
        <div className="h-[600px] relative">
          <Image
            src="/staff-only.jpg"
            alt="image"
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <NewUserForm />
      </div>
    </div>
  );
};

export default NewStaffPage;
