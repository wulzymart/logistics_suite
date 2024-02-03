import AddCustomerForm from "./_components/add-customer-form";
import Title from "@/components/app_title";

const NewCustomerPage = () => {
  return (
    <div className="space-y-10">
      <Title
        title="Customer Registration"
        info="Please enter the following information"
      />
      <AddCustomerForm />
    </div>
  );
};
export default NewCustomerPage;
