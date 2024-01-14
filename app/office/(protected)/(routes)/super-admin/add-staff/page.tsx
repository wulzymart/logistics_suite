import { Separator } from "@/components/ui/separator";
import NewUserForm from "./_components/new-user-form";
import Image from "next/image";
import Title from "@/components/app_title";

const NewStaffPage = async () => {
  return (
    <div>
      <Title
        title="Staff Registration"
        info="Please provide the following details for your staff"
      />
      <div className="grid col-1 md:grid-cols-2 gap-6 mt-20">
        <div className="hidden md:block h-[600px] relative">
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
