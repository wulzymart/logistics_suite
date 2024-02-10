import React from "react";
import NewOrderForm from "./_components/new-order-form";
import Title from "@/components/app_title";

const NewOrderPage = () => {
  return (
    <div>
      <Title
        title="New Order Form"
        info="Please fill the following details to register a new client order"
      />
      <NewOrderForm />
    </div>
  );
};

export default NewOrderPage;
