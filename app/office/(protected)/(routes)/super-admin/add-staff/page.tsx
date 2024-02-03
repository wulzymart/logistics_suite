import Image from "next/image";
import Title from "@/components/app_title";
import NewStaffForm from "./_components/new-staff-form";
import AddCustomerForm from "../../new-waybill/add-customer/_components/add-customer-form";

const NewStaffPage = async () => {
  return (
    <div>
      <Title
        title="Staff Registration"
        info="Please provide the following details for your staff"
      />
      <div className="">
        <NewStaffForm />
      </div>
    </div>
  );
};

export default NewStaffPage;
